<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // A handful of guaranteed "available" vehicles for easy testing
        Vehicle::factory()
            ->count(10)
            ->available()
            ->create();

        // A few in maintenance
        Vehicle::factory()
            ->count(3)
            ->maintenance()
            ->create();

        // The rest with fully random status/availability
        Vehicle::factory()
            ->count(37)
            ->create();
    }
}