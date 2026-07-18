<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewBookingPlaced extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Booking $booking)
    {
    }

    /**
     * 'database' lets you show a notification bell/list in an admin
     * dashboard; 'mail' sends an email. Drop whichever you don't need.
     */
    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        $booking = $this->booking;
        $vehicle = $booking->vehicle;

        return (new MailMessage)
            ->subject("New booking #{$booking->id} placed")
            ->greeting('New booking received')
            ->line("Customer: {$booking->first_name} {$booking->last_name}")
            ->line("Email: {$booking->email}")
            ->line("Phone: {$booking->phone}")
            ->line("Vehicle: {$vehicle?->make} {$vehicle?->model} ({$vehicle?->plate_number})")
            ->line("Pickup: {$booking->pickup_datetime}")
            ->line("Dropoff: {$booking->dropoff_datetime}")
            ->line("Total: {$booking->total_amount} {$vehicle?->currency}")
            ->when($booking->order_notes, fn ($mail) => $mail->line("Notes: {$booking->order_notes}"))
            ->action('Review booking', url("/admin/bookings/{$booking->id}"))
            ->line('Payment will be settled in person (meet-up) — confirm once received.');
    }

    public function toArray($notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'customer_name' => "{$this->booking->first_name} {$this->booking->last_name}",
            'vehicle_id' => $this->booking->vehicle_id,
            'pickup_datetime' => $this->booking->pickup_datetime,
            'dropoff_datetime' => $this->booking->dropoff_datetime,
            'total_amount' => $this->booking->total_amount,
        ];
    }
}