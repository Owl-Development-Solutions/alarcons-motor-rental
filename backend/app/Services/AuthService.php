<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function register(array $data): array
    {
        $user  = User::create([
            'first_name'            => $data['first_name'],
            'middle_name'           => $data['middle_name'] ?? null,
            'last_name'             => $data['last_name'],
            'birth_date'            => $data['birth_date'] ?? null,
            'gender'                => $data['gender'] ?? null,

            'username'              => $data['username'],
            'email'                 => $data['email'],
            'phone_number'          => $data['phone_number'],
            'address'               => $data['address'],

            'drivers_license_number' => $data['drivers_license_number'] ?? null,
            'license_expiry'         => $data['license_expiry'] ?? null,
            'license_image'          => $data['license_image'] ?? null,

            'password'              => Hash::make($data['password']),
            'role'                  => User::ROLE_CUSTOMER,
            'is_verified'           => false,
            'is_active'             => true,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user'  => $user,
            'token' => $token
        ];
    }


    public function login(array $credentials): array
    {
        $user = User::where('username', $credentials['username'])->first();

        if(!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect']
            ]);
        }

        if(!$user->is_active) {
            throw ValidationException::withMessages([
                'username' => ['This account has been deactivated']
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user'  =>  $user,
            'token' => $token
        ];

    }

    
    public function logout(User $user): void
    {   
        /** @var \Laravel\Sanctum\PersonalAccessToken $token */
        $token = $user->currentAccessToken();

        if($token) {
            $token->delete();
        }
    }

}
