<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Vehicle;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use App\Exceptions\BookingException;
use Illuminate\Support\Facades\DB;

class VehicleService
{
    public function __construct(private UploadThingService $uploadThing)
    {
    }

    /**
     * Public browsing/search. Supports:
     *  - category, transmission, fuel_type (exact match)
     *  - min_rate / max_rate
     *  - pickup_datetime + dropoff_datetime -> excludes vehicles that already
     *    have a blocking booking (pending_payment/payment_submitted/
     *    confirmed/active) overlapping that window.
     */
    public function listVehicles(array $filters): LengthAwarePaginator
    {
        $query  = Vehicle::query();

        if(!empty($filters['status'])) {
            $query->where('vehicle_availability', $filters['status']);
        } else {
            $query->whereNotIn('vehicle_availability', [Vehicle::STATUS_MAINTENANCE, Vehicle::STATUS_UNAVAILABLE]);
        }

        foreach (['category', 'transmission', 'fuel_type'] as $exactField) {
            if (!empty($filters[$exactField])) {
                $query->where($exactField, $filters[$exactField]);
            }
        }

        if (!empty($filters['min_rate'])) {
            $query->where('daily_rate', '>=', $filters['min_rate']);
        }

        if (!empty($filters['max_rate'])) {
            $query->where('daily_rate', '<=', $filters['max_rate']);
        }

        if (!empty($filters['pickup_datetime']) && ! empty($filters['dropoff_datetime'])) {
            $pickup = Carbon::parse($filters['pickup_datetime']);
            $dropoff = Carbon::parse($filters['dropoff_datetime']);
 
            $bookedVehicleIds = Booking::whereIn('status', Booking::BLOCKING_STATUSES)
                ->where('pickup_datetime', '<', $dropoff)
                ->where('dropoff_datetime', '>', $pickup)
                ->pluck('vehicle_id');
 
            $query->whereNotIn('id', $bookedVehicleIds);
        }

        return $query->latest()->paginate($filters['per_page'] ?? 15);
    }

    public function getVehicle(int $vehicleId): Vehicle
    {
        $vehicle = Vehicle::find($vehicleId);

        if(!$vehicle) {
            throw new BookingException('Vehicle not found.', 404);
        }

        return $vehicle;
    }

    /**
     * @param  string[]  $imageUrls  Already-uploaded UploadThing URLs.
     */
    public function createVehicle(array $data, array $imageUrls = []): Vehicle
    {
        $data['images'] = array_values(array_unique($imageUrls));
        $data['vehicle_status'] = $data['vehicle_status'] ?? Vehicle::VEHICLE_STATUS_ACTIVE;
        $data['vehicle_availability'] = $data['vehicle_availability'] ?? Vehicle::STATUS_AVAILABLE;

        return Vehicle::create($data);
    }
    
    /**
     * Update vehicle fields only. Images are managed separately via
     * addImage()/removeImage() so the frontend can keep them in sync
     * as each upload/removal happens, instead of batching on save.
     */
    public function updateVehicle(int $vehicleId, array $data): Vehicle
    {
        $vehicle = $this->getVehicle($vehicleId);
        $vehicle->update($data);
 
        return $vehicle->fresh();
    }

    /**
     * Append a single image URL right after a successful UploadThing
     * upload on the frontend. Idempotent — adding the same URL twice
     * is a no-op.
     */
    public function addImage(int $vehicleId, string $url): Vehicle
    {
        $vehicle = $this->getVehicle($vehicleId);
 
        $images = $vehicle->images ?? [];
 
        if (!in_array($url, $images, true)) {
            $images[] = $url;
            $vehicle->update(['images' => $images]);
        }
 
        return $vehicle->fresh();
    }

    /**
     * Remove a single image URL. Called immediately when the user
     * clicks "remove" on the frontend, so the backend list stays in
     * sync with what's shown in the UI without a separate save step.
     * Best-effort deletes the underlying file from UploadThing too.
     */
    public function removeImage(int $vehicleId, string $url): Vehicle
    {
        $vehicle = $this->getVehicle($vehicleId);
 
        $images = array_values(array_filter(
            $vehicle->images ?? [],
            fn (string $existing) => $existing !== $url
        ));
 
        $vehicle->update(['images' => $images]);

        $this->uploadThing->deleteByUrl($url);
 
        return $vehicle->fresh();
    }

    /**
     * Prevent deleting a vehicle that still has an active/pending booking —
     * the migration cascades bookings on delete, which would silently
     * wipe out payment history for a live rental.
     */
    public function deleteVehicle(int $vehicleId): void
    {
        DB::transaction(function () use ($vehicleId) {
            $vehicle = Vehicle::where('id', $vehicleId)->lockForUpdate()->first();
 
            if (! $vehicle) {
                throw new BookingException('Vehicle not found.', 404);
            }
 
            $hasActiveBookings = Booking::where('vehicle_id', $vehicleId)
                ->whereIn('status', Booking::BLOCKING_STATUSES)
                ->exists();
 
            if ($hasActiveBookings) {
                throw new BookingException(
                    'This vehicle has active or pending bookings and cannot be deleted. Set it to maintenance/unavailable instead.',
                    409
                );
            }
 
            foreach ($vehicle->images ?? [] as $url) {
                $this->uploadThing->deleteByUrl($url);
            }
 
            $vehicle->delete();
        });
    }
 

}