<?php

namespace App\Services;

use App\Exceptions\BookingException;
use App\Models\Booking;
use App\Models\User;
use App\Models\Vehicle;
use App\Notifications\NewBookingPlaced;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class BookingService
{
    /**
     * Create a booking. $user is null for guest checkout.
     *
     * `vehicle_id` in $data is treated as "the listing the customer saw" —
     * we resolve it to its model group (make/model/year/transmission/
     * fuel_type/category) and auto-assign whichever matching physical
     * unit is actually free for the requested dates, rather than
     * requiring the customer to pick one exact unit.
     *
     * The assigned unit is marked `reserved` immediately (not just on
     * admin confirm) so it stops showing as available to other
     * customers the moment it's booked, even before payment is
     * confirmed in person. Payment is handled in person (meet-up) —
     * the booking itself starts as 'pending' until an admin confirms it.
     */
    public function createBooking(?User $user, array $data): Booking
    {
        $booking = DB::transaction(function () use ($user, $data) {
            $referenceVehicle = Vehicle::find($data['vehicle_id']);

            if (! $referenceVehicle) {
                throw new BookingException('Vehicle not found.', 404);
            }

            $pickup = Carbon::parse($data['pickup_datetime']);
            $dropoff = Carbon::parse($data['dropoff_datetime']);

            // Lock every unit of this model up front so two concurrent
            // requests for the same model can't both grab the same unit —
            // the second request waits for this transaction to finish
            // before it can even look for a free unit.
            $units = $this->lockUnitsOfSameModel($referenceVehicle);

            if ($units->isEmpty()) {
                throw new BookingException('This vehicle is not available for booking.');
            }

            $this->guardAgainstDuplicateEmail($units->pluck('id')->all(), $data['email']);

            $vehicle = $units->first(
                fn (Vehicle $unit) => ! $this->hasOverlappingBooking($unit->id, $pickup, $dropoff)
            );

            if (! $vehicle) {
                throw new BookingException('All units of this vehicle are booked for the selected dates.', 409);
            }

            $totalDays = max(1, $pickup->diffInDays($dropoff));
            $totalAmount = $totalDays * (float) $vehicle->daily_rate;

            $booking = Booking::create([
                'user_id' => $user?->id,
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
            ]);

            // Flip the assigned unit to reserved right away — we already
            // hold its lock from lockUnitsOfSameModel() above.
            $vehicle->markReserved();

            return $booking->load('vehicle');
        });

        // Outside the transaction: no point holding row locks open while
        // a mail/queue dispatch happens. Every booking notifies every admin.
        Notification::send(User::admins(), new NewBookingPlaced($booking));

        return $booking;
    }

    /**
     * All physical units considered "the same model" as $referenceVehicle,
     * excluding maintenance/unavailable units, locked FOR UPDATE and
     * ordered by id (consistent lock order avoids deadlocks between
     * concurrent booking attempts).
     */
    private function lockUnitsOfSameModel(Vehicle $referenceVehicle): Collection
    {
        return Vehicle::where('make', $referenceVehicle->make)
            ->where('model', $referenceVehicle->model)
            ->where('year', $referenceVehicle->year)
            ->where('transmission', $referenceVehicle->transmission)
            ->where('fuel_type', $referenceVehicle->fuel_type)
            ->where('category', $referenceVehicle->category)
            ->whereNotIn('status', [Vehicle::STATUS_MAINTENANCE, Vehicle::STATUS_UNAVAILABLE])
            ->orderBy('id')
            ->lockForUpdate()
            ->get();
    }

    /**
     * Blocks the same email from placing another active/pending booking
     * on any unit of the same model — guards against accidental double
     * submits and repeat guest bookings without needing an account.
     *
     * NOTE: this checks "already has a booking on this model" regardless
     * of date overlap. If you'd rather only block it when the dates
     * actually overlap, add pickup/dropoff params and an overlap check
     * here instead.
     */
    private function guardAgainstDuplicateEmail(array $vehicleIdsInModel, string $email): void
    {
        $exists = Booking::whereIn('vehicle_id', $vehicleIdsInModel)
            ->where('email', $email)
            ->whereIn('status', Booking::BLOCKING_STATUSES)
            ->exists();

        if ($exists) {
            throw new BookingException(
                'This email has already been used for a booking on this vehicle. If this is a mistake, please contact us.',
                409
            );
        }
    }

    /**
     * Core race-condition guard: checks for any booking on this specific
     * unit, in a "blocking" status (pending/confirmed/active), whose
     * date range overlaps the requested window.
     */
    public function hasOverlappingBooking(int $vehicleId, Carbon $pickup, Carbon $dropoff): bool
    {
        return Booking::overlapping($vehicleId, $pickup, $dropoff)->exists();
    }

    public function getUserBookings(User $user, int $perPage = 10, int $page = 1)
    {
        $this->claimGuestBookings($user);

        return $user->bookings()
            ->with('vehicle')
            ->latest()
            ->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Links any past guest bookings (user_id null) that used this user's
     * email to their account, so registering/logging in with the same
     * email as a previous guest booking surfaces that history under
     * their account from now on — and so show()/cancel() (which scope
     * strictly by user_id) work on those bookings too, with no extra
     * OR-condition needed anywhere else.
     */
    private function claimGuestBookings(User $user): void
    {
        DB::transaction(function () use ($user) {
            Booking::where('user_id', null)
                ->where('email', $user->email)
                ->lockForUpdate()
                ->update(['user_id' => $user->id]);
        });
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

    /**
     * Permanently removes a booking from the user's history. Only
     * allowed once it's already resolved (cancelled/completed) — a
     * pending/confirmed booking must be cancelled first, so there's
     * always a record an admin can still see while it's active.
     */
    public function deleteBookingForUser(User $user, int $bookingId): void
    {
        $booking = Booking::where('id', $bookingId)
            ->where('user_id', $user->id)
            ->first();

        if (! $booking) {
            throw new BookingException('Booking not found.', 404);
        }

        if (! in_array($booking->status, [Booking::STATUS_CANCELLED, Booking::STATUS_COMPLETED])) {
            throw new BookingException('Cancel this booking before deleting it.');
        }

        $booking->delete();
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
     * person (meet-up). The vehicle was already marked reserved at
     * booking time, so this just flips the booking's own status.
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

            return $booking->fresh();
        });
    }

    /**
     * Admin-side cancel — not scoped to a particular user/email, for
     * when an admin needs to cancel on the customer's behalf (e.g. a
     * no-show at the meet-up).
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
     * blocking booking still needs it. Since the vehicle is marked
     * reserved at creation time (not just on confirm), this needs to
     * run on cancel too, not only on complete.
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