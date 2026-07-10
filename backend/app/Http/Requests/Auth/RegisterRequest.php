<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name'                => ['required', 'string', 'max:255'],
            'middle_name'               => ['nullable', 'string', 'max:255'],
            'last_name'                 => ['required', 'string', 'max:255'],
            'birth_date'                => ['nullable', 'date'],
            'gender'                    => ['nullable', 'string'],

            'username'                  => ['required', 'string', 'unique:users,username'],
            'email'                     => ['required', 'email', 'unique:users,email'],
            'phone_number'              => ['required', 'string', 'max:20'],
            'address'                   => ['required', 'string'],

            'drivers_license_number'    => ['nullable', 'string', 'unique:users,drivers_license_number'],
            'license_expiry'            => ['nullable', 'date', 'after:today'],
            'license_image'             => ['nullable', 'image', 'max:4096'],

            'password'                  => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}