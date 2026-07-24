<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    public const STATUS_AVAILABLE = 'available';
    public const STATUS_RESERVED = 'reserved';
    public const STATUS_MAINTENANCE = 'maintenance';
    public const STATUS_UNAVAILABLE = 'unavailable';
    public const STATUS_RENTED = 'rented';

    public const VEHICLE_STATUS_ACTIVE = 'active';
    public const VEHICLE_STATUS_INACTIVE = 'inactive';
 

    protected $fillable = [
        'make',
        'model',
        'year',
        'plate_number',
        'vin',
        'category',
        'transmission',
        'vehicle_type',
        'fuel_type',
        'seats',
        'doors',
        'color',
        'engine_displacement_cc',
        'mileage',
        'daily_rate',
        'currency',
        'vehicle_status',
        'vehicle_availability',
        'features',
        'images',
        'insurance',
        'description'
    ];



    public function casts(): array
    {
        return [
            'daily_rate'    => 'decimal:2',
            'features'      => 'array',
            'images'        => 'array',
            'insurance'     => 'array'
        ];
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('vehicle_availability', self::STATUS_AVAILABLE);
    }

    public function markReserved(): void
    {
        $this->update(['vehicle_availability' => self::STATUS_RESERVED]);
    }
 
    public function markAvailable(): void
    {
        $this->update(['vehicle_availability' => self::STATUS_AVAILABLE]);
    }

    public function markAsRented(): void
    {
        $this->update(['vehicle_availability' => self::STATUS_RENTED]);
    }
}
