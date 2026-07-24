<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    protected array $makesModels = [
        'Toyota'     => ['Vios', 'Fortuner', 'Innova', 'Hilux', 'Corolla Altis', 'Rush'],
        'Honda'      => ['Civic', 'City', 'CR-V', 'BR-V', 'Accord'],
        'Mitsubishi' => ['Mirage', 'Montero Sport', 'Xpander', 'L300'],
        'Ford'       => ['Ranger', 'Everest', 'EcoSport'],
        'Nissan'     => ['Almera', 'Navara', 'Terra', 'X-Trail'],
        'Hyundai'    => ['Accent', 'Tucson', 'Starex', 'Kona'],
        'Kia'        => ['Soluto', 'Sportage', 'Carnival'],
        'Suzuki'     => ['Ertiga', 'Swift', 'Jimny'],
    ];

    protected array $colors = [
        'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Beige', 'Dark Green',
    ];

    protected array $features = [
        'Air Conditioning', 'Bluetooth', 'Backup Camera', 'GPS Navigation',
        'Cruise Control', 'Sunroof', 'Leather Seats', 'USB Charging',
        'Keyless Entry', 'Parking Sensors', 'Dashcam', 'ABS',
        'Child Seat Available', 'Power Windows', 'Alloy Wheels',
    ];

    public function definition(): array
    {
        $make  = $this->faker->randomKey($this->makesModels);
        $model = $this->faker->randomElement($this->makesModels[$make]);

        $vehicleType  = $this->faker->randomElement(['sedan', 'suv', 'hatchback', 'pickup', 'van', 'coupe', 'minivan']);
        $transmission = $this->faker->randomElement(['automatic', 'manual']);
        $fuelType     = $this->faker->randomElement(['gasoline', 'diesel', 'hybrid', 'electric']);
        $status       = $this->faker->randomElement(['active', 'maintenance', 'retired']);
        $availability = $this->faker->randomElement(['available', 'rented', 'reserved', 'unavailable']);

        return [
            'make'                   => $make,
            'model'                  => $model,
            'year'                   => $this->faker->numberBetween(2014, 2026),
            'plate_number'           => strtoupper($this->faker->bothify('???-####')),
            'vin'                    => strtoupper($this->faker->bothify('#?#?#?#?#?#?#?#?#?')), // 17-char pseudo-VIN
            'category'               => $this->faker->randomElement(['economy', 'standard', 'premium', 'luxury']),
            'transmission'           => $transmission,
            'vehicle_type'           => $vehicleType,
            'fuel_type'              => $fuelType,
            'seats'                  => $vehicleType === 'van' || $vehicleType === 'minivan'
                ? $this->faker->numberBetween(8, 15)
                : $this->faker->numberBetween(2, 7),
            'doors'                  => $this->faker->randomElement([2, 3, 4, 5]),
            'color'                  => $this->faker->randomElement($this->colors),
            'engine_displacement_cc' => $fuelType === 'electric'
                ? null
                : $this->faker->randomElement([1000, 1200, 1500, 1600, 1800, 2000, 2200, 2400, 2800, 3000]),
            'mileage'                => $this->faker->numberBetween(1000, 150000),
            'daily_rate'             => $this->faker->randomFloat(2, 1200, 8500),
            'currency'               => 'PHP',
            'vehicle_status'         => $status,
            'vehicle_availability'   => $status === 'active' ? $availability : 'unavailable',
            'features'               => json_encode(
                $this->faker->randomElements($this->features, $this->faker->numberBetween(4, 8))
            ),
            'images'                 => json_encode([
                'https://picsum.photos/seed/'.$this->faker->uuid().'/800/600',
                'https://picsum.photos/seed/'.$this->faker->uuid().'/800/600',
                'https://picsum.photos/seed/'.$this->faker->uuid().'/800/600',
            ]),
            'insurance'              => json_encode([
                'provider'      => $this->faker->company(),
                'policy_number' => strtoupper($this->faker->bothify('POL-#####')),
                'expiry_date'   => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            ]),
            'description'            => $this->faker->paragraph(3),
        ];
    }

    /**
     * State: force the vehicle to be available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'vehicle_status'       => 'active',
            'vehicle_availability' => 'available',
        ]);
    }

    /**
     * State: force the vehicle into maintenance.
     */
    public function maintenance(): static
    {
        return $this->state(fn (array $attributes) => [
            'vehicle_status'       => 'maintenance',
            'vehicle_availability' => 'unavailable',
        ]);
    }
}