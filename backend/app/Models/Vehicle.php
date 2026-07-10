<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'brand',
        'model',
        'year',
        'type',
        'transmission',
        'fuel_type',
        'seats',
        'color',
        'plate_number',
        'price_per_day',
        'description',
        'availability',
        'status',
        'image',
    ];

    protected $casts = [
        'price_per_day' => 'decimal:2',
    ];
}
