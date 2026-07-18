<?php

namespace App\Http\Controllers\Admin;

use App\Exceptions\BookingException;
use App\Http\Controllers\Controller;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * IMPORTANT: every route to this controller must be behind the
 * 'admin' middleware (App\Http\Middleware\EnsureUserIsAdmin).
 */
class BookingController extends Controller
{
    public function __construct(private BookingService $bookingService)
    {
    }

    /**
     * List bookings. Optional ?status=pending to see only what needs review.
     */
    public function index(Request $request): JsonResponse
    {
        $bookings = $this->bookingService->getAllBookings($request->query('status'));

        return response()->json(['data' => $bookings]);
    }

    /**
     * Confirm a pending booking once the customer has paid in person
     * at the meet-up.
     */
    public function confirm(int $booking): JsonResponse
    {
        try {
            $booking = $this->bookingService->confirmBooking($booking);
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }

        return response()->json([
            'message' => 'Booking confirmed.',
            'data' => $booking,
        ]);
    }

    public function cancel(int $booking): JsonResponse
    {
        try {
            $booking = $this->bookingService->adminCancelBooking($booking);
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }

        return response()->json([
            'message' => 'Booking cancelled.',
            'data' => $booking,
        ]);
    }
}