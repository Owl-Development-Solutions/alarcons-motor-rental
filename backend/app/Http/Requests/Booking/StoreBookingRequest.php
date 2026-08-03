<?php

namespace App\Http\Requests\Booking;

use App\Models\Booking;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'vehicle_id' => ['required', 'integer', 'exists:vehicles,id'],
            'pickup_datetime' => ['required', 'date', 'after_or_equal:now'],
            'dropoff_datetime' => ['required', 'date', 'after:pickup_datetime'],

            'rental_mode' => ['required', Rule::in([Booking::RENTAL_MODE_PICKUP, Booking::RENTAL_MODE_DELIVERY])],
            'delivery_location' => [
                'nullable',
                'required_if:rental_mode,' . Booking::RENTAL_MODE_DELIVERY,
                Rule::in(array_keys(Booking::DELIVERY_LOCATIONS)),
            ],

            // Checkout / billing details
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'street_address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'postcode' => ['required', 'string', 'max:20'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:255'],
            'order_notes' => ['nullable', 'string', 'max:2000'],
        ];
    }
}