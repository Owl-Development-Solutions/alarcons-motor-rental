<?php

namespace App\Http\Controllers;

use App\Exceptions\BookingException;
use App\Http\Requests\Booking\StoreBookingRequest;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct(private BookingService $bookingService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $bookings = $this->bookingService->getUserBookings($request->user());

        return response()->json(['data' => $bookings]);
    }

    /**
     * Creates the booking as 'pending' and notifies every admin.
     * Payment is settled in person — no proof-of-payment step.
     */
    public function store(StoreBookingRequest $request): JsonResponse
    {
        try {
            $booking = $this->bookingService->createBooking($request->user(), $request->validated());
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }

        return response()->json([
            'message' => 'Booking placed. We\'ll contact you to confirm — payment is settled in person.',
            'data' => $booking,
        ], 201);
    }

    public function show(Request $request, int $booking): JsonResponse
    {
        try {
            $booking = $this->bookingService->getBookingForUser($request->user(), $booking);
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }

        return response()->json(['data' => $booking]);
    }

    public function cancel(Request $request, int $booking): JsonResponse
    {
        try {
            $booking = $this->bookingService->cancelBooking($request->user(), $booking);
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }

        return response()->json([
            'message' => 'Booking cancelled.',
            'data' => $booking,
        ]);
    }
}