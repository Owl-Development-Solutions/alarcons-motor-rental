<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;

class RemoveVehicleImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // route is behind the 'admin' middleware
    }

    public function rules(): array
    {
        return [
            'url' => ['required', 'url', 'max:2048'],
        ];
    }
}