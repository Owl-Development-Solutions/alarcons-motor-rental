<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Vehicle::create([
            'name' => 'Honda XRM 125',
            'brand' => 'Honda',
            'model' => 'XRM 125',
            'year' => '2024',
            'type' => 'motorcycle',
            'transmission' => 'manual',
            'fuel_type' => 'gasoline',
            'seats' => '2',
            'color' => 'Black',
            'plate_number' => 'ABC-1234',
            'price_per_day' => 500,
            'description' => 'Reliable motorcycle for daily commuting',
            'availability' => 'available',
            'status' => 'active',
            'image' => null,
        ]);

        Vehicle::create([
            'name' => 'Yamaha NMAX',
            'brand' => 'Yamaha',
            'model' => 'NMAX',
            'year' => '2024',
            'type' => 'motorcycle',
            'transmission' => 'automatic',
            'fuel_type' => 'gasoline',
            'seats' => '2',
            'color' => 'Red',
            'plate_number' => 'DEF-5678',
            'price_per_day' => 700,
            'description' => 'Scooter with comfortable seating',
            'availability' => 'available',
            'status' => 'active',
            'image' => null,
        ]);

        Vehicle::create([
            'name' => 'Toyota Vios',
            'brand' => 'Toyota',
            'model' => 'Vios',
            'year' => '2023',
            'type' => 'car',
            'transmission' => 'automatic',
            'fuel_type' => 'gasoline',
            'seats' => '5',
            'color' => 'White',
            'plate_number' => 'GHI-9012',
            'price_per_day' => 1500,
            'description' => 'Sedan perfect for family trips',
            'availability' => 'available',
            'status' => 'active',
            'image' => null,
        ]);

        Vehicle::create([
            'name' => 'Honda Click 125',
            'brand' => 'Honda',
            'model' => 'Click 125',
            'year' => '2023',
            'type' => 'motorcycle',
            'transmission' => 'automatic',
            'fuel_type' => 'gasoline',
            'seats' => '2',
            'color' => 'Blue',
            'plate_number' => 'JKL-3456',
            'price_per_day' => 450,
            'description' => 'Easy to ride scooter',
            'availability' => 'rented',
            'status' => 'active',
            'image' => null,
        ]);

        Vehicle::create([
            'name' => 'Mitsubishi Montero',
            'brand' => 'Mitsubishi',
            'model' => 'Montero',
            'year' => '2022',
            'type' => 'car',
            'transmission' => 'automatic',
            'fuel_type' => 'diesel',
            'seats' => '7',
            'color' => 'Silver',
            'plate_number' => 'MNO-7890',
            'price_per_day' => 2500,
            'description' => 'SUV for off-road adventures',
            'availability' => 'available',
            'status' => 'active',
            'image' => null,
        ]);
    }
}
