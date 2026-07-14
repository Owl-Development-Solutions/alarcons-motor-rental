<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@jercebutours.com'],
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'username' => 'admin',
                'phone_number' => '0000000000',
                'address' => 'System Admin',
                'email' => 'admin@jercebutours.com',
                'password' => Hash::make('admin123'),
                'role' => User::ROLE_ADMIN,
                'is_verified' => true,
                'is_active' => true,
            ]
        );
    }
}
