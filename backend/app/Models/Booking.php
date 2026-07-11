<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    public const STATUS_PENDING_PAYMENT = 'pending_payment';
    public const STATUS_PAYMENT_SUBMITTED = 'payment_submitted';
    public const STATUS_CONFIRMED = 'confirmed';
    public const STATUS_PAYMENT_REJECTED = 'payment_rejected';
    public const STATUS_ACTIVE = 'active';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_CANCELLED = 'cancelled';

    /**
     * Statuses that should still "hold" a car's dates.
     * This is the key to the double-booking fix: a car with a
     * pending_payment or payment_submitted booking blocks the same
     * dates, not just confirmed ones.
     */
    public const BLOCKING_STATUSES = [
        self::STATUS_PENDING_PAYMENT,
        self::STATUS_PAYMENT_SUBMITTED,
        self::STATUS_CONFIRMED,
        self::STATUS_ACTIVE,
    ];
 
    protected $fillable = [
        'user_id', 
        'car_id', 
        'pickup_datetime', 
        'dropoff_datetime',
        'total_days', 
        'daily_rate', 
        'total_amount', 
        'status',
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
 
    public function car()
    {
        return $this->belongsTo(Vehicle::class);
    }
 
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
 
    public function latestPayment()
    {
        return $this->hasOne(Payment::class)->latestOfMany();
    }

    /**
     * Bookings on a given car whose date range overlaps the given
     * pickup/dropoff window AND whose status still holds the car.
     * Used both when creating a new booking and anywhere else you
     * need to check real availability.
     */
    public function scopeOverlapping($query, int $carId, $pickup, $dropoff)
    {
        return $query->where('car_id', $carId)
            ->whereIn('status', self::BLOCKING_STATUSES)
            ->where('pickup_datetime', '<', $dropoff)
            ->where('dropoff_datetime', '>', $pickup);
    }

}
