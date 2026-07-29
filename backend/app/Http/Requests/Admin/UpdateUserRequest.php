<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $user = $this->route('user');

        return [
            'first_name' => ['sometimes', 'required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string', 'max:100'],
            'last_name' => ['sometimes', 'required', 'string', 'max:100'],
            'username' => ['sometimes', 'required', 'string', 'max:100', Rule::unique('users', 'username')->ignore($user)],
            'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user)],
            'phone_number' => ['sometimes', 'required', 'string', 'max:30'],
            'address' => ['sometimes', 'required', 'string', 'max:1000'],
            'role' => ['sometimes', 'required', 'in:'.implode(',', [User::ROLE_ADMIN, User::ROLE_CUSTOMER, User::ROLE_SALES])],
            'password' => ['nullable', 'confirmed', Password::min(8)],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
