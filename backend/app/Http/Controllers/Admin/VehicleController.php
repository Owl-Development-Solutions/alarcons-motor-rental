<?php

namespace App\Http\Controllers\Admin;

use App\Exceptions\BookingException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Vehicle\AddVehicleImageRequest;
use App\Http\Requests\Vehicle\RemoveVehicleImageRequest;
use App\Http\Requests\Vehicle\StoreVehicleRequest;
use App\Http\Requests\Vehicle\UpdateVehicleRequest;
use App\Services\VehicleService;
use Illuminate\Http\JsonResponse;

class VehicleController extends Controller
{
    public function __construct(private VehicleService $vehicleService)
    {
    }

    /**
     * Create a vehicle. `images` (if provided) is an array of UploadThing
     * URLs already uploaded by the frontend before this request fires.
     */
    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $data = $request->safe()->except('images');
 
        $vehicle = $this->vehicleService->createVehicle($data, $request->validated('images', []));
 
        return response()->json([
            'message' => 'Vehicle created.',
            'data' => $vehicle,
        ], 201);
    }

    /**
     * Update vehicle fields. Does NOT touch images — use addImage()/removeImage()
     * for those so the frontend can keep them in sync in real time.
     */
    public function update(UpdateVehicleRequest $request, int $vehicle): JsonResponse
    {
        try {
            $vehicle = $this->vehicleService->updateVehicle($vehicle, $request->validated());
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }
 
        return response()->json([
            'message' => 'Vehicle updated.',
            'data' => $vehicle,
        ]);
    }

    /**
     * Called by the frontend right after a single file finishes
     * uploading to UploadThing.
     */
    public function addImage(AddVehicleImageRequest $request, int $vehicle): JsonResponse
    {
        try {
            $vehicle = $this->vehicleService->addImage($vehicle, $request->validated('url'));
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }
 
        return response()->json([
            'message' => 'Image added.',
            'data' => $vehicle,
        ]);
    }

    /**
     * Called by the frontend the moment the user clicks "remove" on an
     * image — keeps the backend list in sync immediately rather than
     * waiting for a form save. Also deletes the file from UploadThing.
     */
    public function removeImage(RemoveVehicleImageRequest $request, int $vehicle): JsonResponse
    {
        try {
            $vehicle = $this->vehicleService->removeImage($vehicle, $request->validated('url'));
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }
 
        return response()->json([
            'message' => 'Image removed.',
            'data' => $vehicle,
        ]);
    }


    public function destroy(int $car): JsonResponse
    {
        try {
            $this->vehicleService->deleteVehicle($car);
        } catch (BookingException $e) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        }
 
        return response()->json(['message' => 'Car deleted.']);
    }
}

