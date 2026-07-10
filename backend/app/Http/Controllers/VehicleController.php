<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of vehicles.
     */
    public function index()
    {
        $vehicles = Vehicle::all();
        return response()->json($vehicles);
    }

    /**
     * Store a newly created vehicle in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|string|max:4',
            'type' => 'required|string|in:motorcycle,car',
            'transmission' => 'required|string|max:255',
            'fuel_type' => 'required|string|max:255',
            'seats' => 'nullable|string|max:10',
            'color' => 'nullable|string|max:255',
            'plate_number' => 'required|string|unique:vehicles,plate_number',
            'price_per_day' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'availability' => 'required|string|in:available,rented,maintenance',
            'status' => 'nullable|string|in:active,inactive',
            'image' => 'nullable|string',
        ]);

        $vehicle = Vehicle::create($validated);
        return response()->json($vehicle, 201);
    }

    /**
     * Display the specified vehicle.
     */
    public function show($id)
    {
        $vehicle = Vehicle::find($id);
        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }
        return response()->json($vehicle);
    }

    /**
     * Update the specified vehicle in storage.
     */
    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::find($id);
        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'brand' => 'sometimes|required|string|max:255',
            'model' => 'sometimes|required|string|max:255',
            'year' => 'sometimes|required|string|max:4',
            'type' => 'sometimes|required|string|in:motorcycle,car',
            'transmission' => 'sometimes|required|string|max:255',
            'fuel_type' => 'sometimes|required|string|max:255',
            'seats' => 'nullable|string|max:10',
            'color' => 'nullable|string|max:255',
            'plate_number' => 'sometimes|required|string|unique:vehicles,plate_number,'.$id,
            'price_per_day' => 'sometimes|required|numeric|min:0',
            'description' => 'nullable|string',
            'availability' => 'sometimes|required|string|in:available,rented,maintenance',
            'status' => 'nullable|string|in:active,inactive',
            'image' => 'nullable|string',
        ]);

        $vehicle->update($validated);
        return response()->json($vehicle);
    }

    /**
     * Remove the specified vehicle from storage.
     */
    public function destroy($id)
    {
        $vehicle = Vehicle::find($id);
        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }
        $vehicle->delete();
        return response()->json(['message' => 'Vehicle deleted successfully']);
    }
}
