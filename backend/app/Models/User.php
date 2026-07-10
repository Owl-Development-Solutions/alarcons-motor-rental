<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    public const ROLE_CUSTOMER = 'customer';
    public const ROLE_ADMIN = 'admin';
    public const ROLE_SALES = 'sales';

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'birth_date',
        'gender',
        'email',
        'username',
        'phone_number',
        'address',
        'drivers_license_number',
        'license_expiry',
        'license_image',
        'password',
        'role',
        'is_verified',
        'is_active'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'license_expiry' => 'date',
            'password' => 'hashed',
            'is_verified' => 'boolean',
            'is_active' => 'boolean',
            'email_verified_at' => 'datetime',
        ];
    }


}
