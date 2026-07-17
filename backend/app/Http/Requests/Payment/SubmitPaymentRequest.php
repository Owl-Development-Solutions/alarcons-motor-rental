<?php

namespace App\Http\Requests\Payment;

use Illuminate\Foundation\Http\FormRequest;

class SubmitPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'reference_number' => ['nullable', 'string', 'max:255'],
            'proof_image_url' => ['required', 'url', 'max:2048'],
        ];
    }
}