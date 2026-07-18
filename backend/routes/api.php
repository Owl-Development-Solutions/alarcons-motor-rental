<?php

use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\Admin\VehicleController as AdminVehicleController; //for admin vehicle controller
use App\Http\Controllers\BookingController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Health check
Route::get('/health', fn () => response()->json(['status' => 'ok', 'timestamp' => now()]));


Route::prefix('v1')->group(function () {

    //Public 
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    // Public vehicle browsing (no auth needed to look around)
    Route::get('/vehicles', [VehicleController::class, 'index']);
    Route::get('/vehicle/{vehicleId}', [VehicleController::class, 'show']);

    // Guest can also do the bookings..
    Route::post('/bookings', [BookingController::class, 'store']);

    // Authenticated (any logged-in user)
    Route::middleware('auth:sanctum')->group(function() {

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/auth/change-password', [AuthController::class, 'changePassword']);
        Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

        Route::get('/bookings', [BookingController::class, 'index']);
        Route::get('/bookings/{booking}', [BookingController::class, 'show']);
        Route::post('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);




        //Admin-only - protected by the 'admin' middleware alias.
        Route::middleware('admin')->prefix('admin')->group(function () {
            Route::get('/users', [AdminUserController::class, 'index']);
            Route::post('/vehicles', [AdminVehicleController::class, 'store']);
            Route::put('/vehicles/{vehicle}', [AdminVehicleController::class, 'update']);
            Route::delete('/vehicles/{vehicle}', [AdminVehicleController::class, 'destroy']);
           

            // Hit immediately by the frontend on each UploadThing success/removal
            // so image state stays in sync without a separate "save" step.
            Route::post('/vehicles/{vehicle}/images', [AdminVehicleController::class, 'addImage']);
            Route::delete('/vehicles/{vehicle}/images', [AdminVehicleController::class, 'removeImage']);

        
            Route::get('/bookings', [AdminBookingController::class, 'index']);
            Route::post('/bookings/{booking}/confirm', [AdminBookingController::class, 'confirm']);
            Route::post('/bookings/{booking}/cancel', [AdminBookingController::class, 'cancel']);
        
        
        });

    });

});
