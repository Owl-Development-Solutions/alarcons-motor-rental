<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Route is behind the 'admin' middleware.
        return true;
    }

    public function rules(): array
    {
        return [
            'make' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'digits:4'],
            'vehicle_type' => ['required', 'string', 'max:255'],
            'plate_number' => ['nullable', 'string', 'unique:vehicles,plate_number'],
            'vin' => ['nullable', 'string', 'unique:vehicles,vin'],
            'category' => ['required', 'string', 'max:255'],
            'transmission' => ['required', 'string', 'in:automatic,manual'],
            'fuel_type' => ['required', 'string', 'max:255'],
            'seats' => ['nullable', 'integer', 'min:1', 'max:20'],
            'doors' => ['nullable', 'integer', 'min:0', 'max:6'],
            'engine_displacement_cc' => ['nullable', 'integer', 'min:1', 'max:10000'],
            'color' => ['required', 'string', 'max:255'],
            'mileage' => ['nullable', 'integer', 'min:0'],
            'daily_rate' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'vehicle_status' => ['nullable', 'string', 'in:active,inactive,retired'],
            'vehicle_availability' => ['nullable', 'string', 'in:available,reserved,maintenance,unavailable,rented'],
            
            'description' => ['required', 'string', 'max:255'],

            'features' => ['nullable', 'array'],
            'features.*' => ['string'],

            'insurance' => ['nullable', 'array'],



            'images' => ['nullable', 'array', 'max:10'],
            'images.*' => ['url', 'max:2048'],
        ];
    }
}