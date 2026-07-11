<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Route is behind the 'admin' middleware.
        return true;
    }

    public function rules(): array
    {
        $vehicleId = $this->route('vehicle');

        return [
            'make' => ['sometimes', 'string', 'max:255'],
            'model' => ['sometimes', 'string', 'max:255'],
            'year' => ['sometimes', 'integer', 'digits:4'],
            'vehicle_type' => ['required', 'string', 'max:255'],
            'plate_number' => ['sometimes', 'nullable', 'string', Rule::unique('vehicles', 'plate_number')->ignore($vehicleId)],
            'vin' => ['sometimes', 'nullable', 'string', Rule::unique('vehicles', 'vin')->ignore($vehicleId)],
            'category' => ['sometimes', 'string', 'max:255'],
            'transmission' => ['sometimes', 'string', 'in:automatic,manual'],
            'fuel_type' => ['sometimes', 'string', 'max:255'],
            'seats' => ['sometimes', 'integer', 'min:1', 'max:20'],
            'doors' => ['sometimes', 'integer', 'min:1', 'max:6'],
            'engine_displacement_cc' => ['nullable', 'integer', 'min:1', 'max:10000'],
            'color' => ['sometimes', 'string', 'max:255'],
            'mileage' => ['sometimes', 'integer', 'min:0'],
            'daily_rate' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['sometimes', 'string', 'size:3'],
            'status' => ['sometimes', 'string', 'in:available,reserved,maintenance,unavailable'],

            'features' => ['sometimes', 'array'],
            'features.*' => ['string'],

            'insurance' => ['sometimes', 'array'],
        ];
    }
}