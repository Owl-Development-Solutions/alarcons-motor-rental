<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // Payment is handled in person (meet-up) for now — no payment-proof
    // states involved. Admin confirms manually once payment is received.
    public const STATUS_PENDING = 'pending';
    public const STATUS_CONFIRMED = 'confirmed';
    public const STATUS_ACTIVE = 'active';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_CANCELLED = 'cancelled';

    /**
     * Statuses that should still "hold" a vehicle's dates — used to
     * block overlapping bookings on the same vehicle.
     */
    public const BLOCKING_STATUSES = [
        self::STATUS_PENDING,
        self::STATUS_CONFIRMED,
        self::STATUS_ACTIVE,
    ];

    protected $fillable = [
        'user_id', 'vehicle_id', 'pickup_datetime', 'dropoff_datetime',
        'total_days', 'daily_rate', 'total_amount', 'status',

        // Checkout / billing details
        'first_name', 'last_name', 'company_name', 'country',
        'street_address', 'city', 'postcode', 'phone', 'email', 'order_notes',
    ];

    protected function casts(): array
    {
        return [
            'pickup_datetime' => 'datetime',
            'dropoff_datetime' => 'datetime',
            'daily_rate' => 'decimal:2',
            'total_amount' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * Bookings on a given vehicle whose date range overlaps the given
     * pickup/dropoff window AND whose status still holds the vehicle.
     */
    public function scopeOverlapping($query, int $vehicleId, $pickup, $dropoff)
    {
        return $query->where('vehicle_id', $vehicleId)
            ->whereIn('status', self::BLOCKING_STATUSES)
            ->where('pickup_datetime', '<', $dropoff)
            ->where('dropoff_datetime', '>', $pickup);
    }

    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }
}