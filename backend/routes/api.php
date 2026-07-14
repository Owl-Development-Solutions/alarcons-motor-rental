<?php

use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\Admin\VehicleController as AdminVehicleController; //for admin vehicle controller
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


    Route::middleware('auth:sanctum')->group(function() {

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/auth/change-password', [AuthController::class, 'changePassword']);
        Route::put('/auth/profile', [AuthController::class, 'updateProfile']);



        //Admin-only - protected by the 'admin' middleware alias.
        Route::middleware('admin')->prefix('admin')->group(function () {
            Route::get('/users', [AdminUserController::class, 'index']);
            Route::post('/vehicles', [AdminVehicleController::class, 'store']);
            Route::put('/vehicles/{vehicle}', [AdminVehicleController::class, 'update']);
            Route::delete('/vehicles/{vehicle}', [AdminVehicleController::class, 'destroy']);
            Route::post('/vehicles/{vehicle}/images', [AdminVehicleController::class, 'addImage']);
            Route::delete('/vehicles/{vehicle}/images', [AdminVehicleController::class, 'removeImage']);
        });

    });

});
