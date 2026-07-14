<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'gender' => ['nullable', 'string'],
            'username' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users', 'username')->ignore($userId),
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'phone_number' => ['required', 'string', 'max:20'],
            'address' => ['required', 'string'],
            'drivers_license_number' => [
                'nullable',
                'string',
                Rule::unique('users', 'drivers_license_number')->ignore($userId),
            ],
            'license_expiry' => ['nullable', 'date', 'after:today'],
            'license_image' => ['nullable', 'image', 'max:4096'],
        ];
    }
}
