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

    /**
     * Logged-in user's own bookings — including any past guest bookings
     * that used the same email (auto-linked by getUserBookings()). To
     * see booking history, a guest needs to register/log in with the
     * email they used at checkout; there's no separate guest-lookup
     * route since login + this endpoint covers it.
     * Paginated: ?page=1&per_page=10 (per_page capped at 50).
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) $request->query('per_page', 10), 50);
        $page = max((int) $request->query('page', 1), 1);

        $bookings = $this->bookingService->getUserBookings($request->user(), $perPage, $page);

        return response()->json($bookings);
    }

    /**
     * Creates the booking as 'pending' and notifies every admin.
     * Works for both logged-in users and guests — this route is NOT
     * behind auth:sanctum, so $request->user() is simply null for a
     * guest instead of throwing. If a valid token IS sent, the booking
     * still gets attached to that account.
     */
    public function store(StoreBookingRequest $request): JsonResponse
    {
        try {
            $booking = $this->bookingService->createBooking($request->user('sanctum'), $request->validated());
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

    /**
     * Permanently removes a booking from the user's history. Only
     * allowed once it's cancelled/completed — cancel() first if it's
     * still pending/confirmed.
     */
    public function destroy(Request $request, int $booking): JsonResponse
    {
        try {
            $this->bookingService->deleteBookingForUser($request->user(), $booking);
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }

        return response()->json(['message' => 'Booking deleted.']);
    }
}