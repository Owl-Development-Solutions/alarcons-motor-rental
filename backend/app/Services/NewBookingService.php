<?php

namespace App\Services;

use App\Exceptions\BookingException;
use App\Models\Booking;
use App\Models\User;
use App\Models\Vehicle;
use App\Notifications\NewBookingPlaced;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class BookingService
{
    /**
     * Create a booking for a vehicle, guarding against overlapping bookings.
     * Wrapped in a DB transaction with a row lock on the vehicle so two
     * concurrent requests for the same vehicle/dates can't both succeed.
     * Payment is handled in person (meet-up) — the booking starts as
     * 'pending' until an admin confirms it.
     */
    public function createBooking(User $user, array $data): Booking
    {
        $booking = DB::transaction(function () use ($user, $data) {
            $vehicle = Vehicle::where('id', $data['vehicle_id'])->lockForUpdate()->first();

            if (! $vehicle) {
                throw new BookingException('Vehicle not found.', 404);
            }

            if (in_array($vehicle->status, [Vehicle::STATUS_MAINTENANCE, Vehicle::STATUS_UNAVAILABLE])) {
                throw new BookingException('This vehicle is not available for booking.');
            }

            $pickup = Carbon::parse($data['pickup_datetime']);
            $dropoff = Carbon::parse($data['dropoff_datetime']);

            if ($this->hasOverlappingBooking($vehicle->id, $pickup, $dropoff)) {
                throw new BookingException('This vehicle is already booked for the selected dates.', 409);
            }

            $totalDays = max(1, $pickup->diffInDays($dropoff));
            $totalAmount = $totalDays * (float) $vehicle->daily_rate;

            return Booking::create([
                'user_id' => $user->id,
                'vehicle_id' => $vehicle->id,
                'pickup_datetime' => $pickup,
                'dropoff_datetime' => $dropoff,
                'total_days' => $totalDays,
                'daily_rate' => $vehicle->daily_rate,
                'total_amount' => $totalAmount,
                'status' => Booking::STATUS_PENDING,

                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'company_name' => $data['company_name'] ?? null,
                'country' => $data['country'],
                'street_address' => $data['street_address'],
                'city' => $data['city'],
                'postcode' => $data['postcode'],
                'phone' => $data['phone'],
                'email' => $data['email'],
                'order_notes' => $data['order_notes'] ?? null,
            ])->load('vehicle');
        });

        // Outside the transaction: no point holding the row lock open
        // while a mail/queue dispatch happens. Every booking notifies
        // every admin.
        Notification::send(User::admins(), new NewBookingPlaced($booking));

        return $booking;
    }

    /**
     * Core race-condition guard: checks for any booking on this vehicle,
     * in a "blocking" status (pending/confirmed/active), whose date
     * range overlaps the requested window. Must be called from *inside*
     * the same transaction/lock as the insert.
     */
    public function hasOverlappingBooking(int $vehicleId, Carbon $pickup, Carbon $dropoff): bool
    {
        return Booking::overlapping($vehicleId, $pickup, $dropoff)->exists();
    }

    public function getUserBookings(User $user)
    {
        return $user->bookings()
            ->with('vehicle')
            ->latest()
            ->get();
    }

    public function getBookingForUser(User $user, int $bookingId): Booking
    {
        $booking = Booking::with('vehicle')
            ->where('id', $bookingId)
            ->where('user_id', $user->id)
            ->first();

        if (! $booking) {
            throw new BookingException('Booking not found.', 404);
        }

        return $booking;
    }

    public function cancelBooking(User $user, int $bookingId): Booking
    {
        return DB::transaction(function () use ($user, $bookingId) {
            $booking = Booking::where('id', $bookingId)
                ->where('user_id', $user->id)
                ->lockForUpdate()
                ->first();

            if (! $booking) {
                throw new BookingException('Booking not found.', 404);
            }

            if (in_array($booking->status, [Booking::STATUS_COMPLETED, Booking::STATUS_CANCELLED])) {
                throw new BookingException('This booking can no longer be cancelled.');
            }

            $booking->update(['status' => Booking::STATUS_CANCELLED]);
            $this->releaseVehicleIfUnheld($booking);

            return $booking;
        });
    }

    /**
     * Admin confirms a pending booking once payment is received in
     * person (meet-up). Marks the vehicle as reserved.
     */
    public function confirmBooking(int $bookingId): Booking
    {
        return DB::transaction(function () use ($bookingId) {
            $booking = Booking::with('vehicle')->lockForUpdate()->find($bookingId);

            if (! $booking) {
                throw new BookingException('Booking not found.', 404);
            }

            if ($booking->status !== Booking::STATUS_PENDING) {
                throw new BookingException('Only pending bookings can be confirmed.');
            }

            $booking->update(['status' => Booking::STATUS_CONFIRMED]);

            $vehicle = $booking->vehicle()->lockForUpdate()->first();
            $vehicle?->markReserved();

            return $booking->fresh();
        });
    }

    /**
     * Admin-side cancel — same as cancelBooking() but not scoped to a
     * particular user, for when an admin needs to cancel on the
     * customer's behalf (e.g. a no-show at the meet-up).
     */
    public function adminCancelBooking(int $bookingId): Booking
    {
        return DB::transaction(function () use ($bookingId) {
            $booking = Booking::lockForUpdate()->find($bookingId);

            if (! $booking) {
                throw new BookingException('Booking not found.', 404);
            }

            if (in_array($booking->status, [Booking::STATUS_COMPLETED, Booking::STATUS_CANCELLED])) {
                throw new BookingException('This booking can no longer be cancelled.');
            }

            $booking->update(['status' => Booking::STATUS_CANCELLED]);
            $this->releaseVehicleIfUnheld($booking);

            return $booking;
        });
    }

    /**
     * Mark a confirmed/active booking as completed and release the vehicle.
     */
    public function completeBooking(int $bookingId): Booking
    {
        return DB::transaction(function () use ($bookingId) {
            $booking = Booking::with('vehicle')->lockForUpdate()->findOrFail($bookingId);

            $booking->update(['status' => Booking::STATUS_COMPLETED]);
            $this->releaseVehicleIfUnheld($booking);

            return $booking;
        });
    }

    public function getAllBookings(?string $status = null)
    {
        return Booking::with(['vehicle', 'user'])
            ->when($status, fn ($query) => $query->where('status', $status))
            ->latest()
            ->get();
    }

    /**
     * Flip the vehicle back to available — but only if no other
     * blocking booking still needs it.
     */
    private function releaseVehicleIfUnheld(Booking $booking): void
    {
        $vehicle = $booking->vehicle()->lockForUpdate()->first();

        if ($vehicle && $vehicle->status === Vehicle::STATUS_RESERVED) {
            $stillHeld = Booking::where('vehicle_id', $vehicle->id)
                ->where('id', '!=', $booking->id)
                ->whereIn('status', Booking::BLOCKING_STATUSES)
                ->exists();

            if (! $stillHeld) {
                $vehicle->markAvailable();
            }
        }
    }
}