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
    public const STATUS_ACTIVE = 'ongoing';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_CANCELLED = 'cancelled';

    public const PAYMENT_UNPAID = 'unpaid';
    public const PAYMENT_PAID = 'paid';


    public const RENTAL_MODE_PICKUP = 'pickup';
    public const RENTAL_MODE_DELIVERY = 'delivery';


    /**
     * Delivery fees per location. Source of truth lives here — the
     * frontend's `deliveryLocationOptions` should mirror these values
     * for display only; the actual amount charged always comes from
     * this map, never from client input.
     */
    public const DELIVERY_LOCATIONS = [
        'cebu-city'      => ['label' => 'Cebu City',      'price' => 800],
        'lapu-lapu-city' => ['label' => 'Lapu-Lapu City', 'price' => 700],
        'mandaue-city'   => ['label' => 'Mandaue City',   'price' => 700],
        'talisay-city'   => ['label' => 'Talisay City',   'price' => 800],
        'naga-city'      => ['label' => 'Naga City',      'price' => 1000],
        'carcar-city'    => ['label' => 'Carcar City',    'price' => 1000],
        'danao-city'     => ['label' => 'Danao City',     'price' => 1000],
        'bogo-city'      => ['label' => 'Bogo City',      'price' => 1500],
        'toledo-city'    => ['label' => 'Toledo City',    'price' => 1500],
        'airport'        => ['label' => 'Airport',        'price' => 600],
        'pier-port'      => ['label' => 'Pier or Port',   'price' => 700],
    ];
 
    /**
     * Statuses that should still "hold" a vehicle's dates — used to
     * block overlapping bookings on the same vehicle.
     */
    public const BLOCKING_STATUSES = [
        self::STATUS_PENDING,
        self::STATUS_CONFIRMED,
        self::STATUS_ACTIVE,
    ];

    /**
     * Resolve the delivery fee for a given location key. Returns 0 for
     * pickup / unknown / null locations so callers can add it to the
     * total unconditionally without an extra null check.
     */
    public static function deliveryFeeFor(?string $location): float
    {
        return (float) (self::DELIVERY_LOCATIONS[$location]['price'] ?? 0);
    }

    protected $fillable = [
        'user_id', 'vehicle_id', 'pickup_datetime', 'dropoff_datetime',
        'total_days', 'daily_rate', 'total_amount', 'booking_status', 
        'payment_status', 'rental_mode', 'delivery_location',

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
            ->whereIn('booking_status', self::BLOCKING_STATUSES)
            ->where('pickup_datetime', '<', $dropoff)
            ->where('dropoff_datetime', '>', $pickup);
    }

    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }
}