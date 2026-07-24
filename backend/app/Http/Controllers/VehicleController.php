<?php

namespace App\Http\Controllers;

use App\Exceptions\BookingException;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function __construct(private VehicleService $vehicleService)
    {
    }

    /**
     * Browse/search vehicles. Query params:
     * category, transmission, fuel_type, min_rate, max_rate,
     * pickup_datetime, dropoff_datetime, per_page
     */
    public function index(Request $request): JsonResponse
    {
        $vehicles = $this->vehicleService->listVehicles($request->query());

        return response()->json($vehicles);
    }

    public function show(int $vehicle): JsonResponse
    {
        try {
            $vehicle = $this->vehicleService->getVehicle($vehicle);
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }

        return response()->json(['data' => $vehicle]);
    }
}