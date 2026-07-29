<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin array */
class AdminDashboardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'metrics' => $this['metrics'],
            'vehicle_summaries' => $this['vehicle_summaries'],
            'charts' => $this['charts'],
            'recent_bookings' => $this['recent_bookings']->map(fn ($booking) => [
                'id' => $booking->id,
                'customer_name' => $booking->user?->full_name ?: $booking->full_name,
                'vehicle_name' => trim("{$booking->vehicle?->make} {$booking->vehicle?->model}"),
                'vehicle_type' => $booking->vehicle?->vehicle_type,
                'pickup_datetime' => $booking->pickup_datetime,
                'dropoff_datetime' => $booking->dropoff_datetime,
                'payment_status' => $booking->payment_status,
                'booking_status' => $booking->booking_status,
            ]),
            'recent_customers' => $this['recent_customers']->map(fn ($customer) => [
                'id' => $customer->id,
                'name' => $customer->full_name,
                'email' => $customer->email,
                'phone' => $customer->phone_number,
                'is_active' => $customer->is_active,
                'created_at' => $customer->created_at,
            ]),
            'recent_notifications' => $this['recent_notifications']->map(fn ($notification) => [
                'id' => $notification->id,
                'type' => $notification->type,
                'data' => $notification->data,
                'read_at' => $notification->read_at,
                'created_at' => $notification->created_at,
            ]),
        ];
    }
}
