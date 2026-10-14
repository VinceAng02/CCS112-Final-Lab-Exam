<?php

use App\Http\Controllers\Api\V1\ReservationController;
use App\Http\Controllers\Api\V1\RoomController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->name('api.v1.')->group(function (): void {
    Route::apiResource('rooms', RoomController::class)->only(['index', 'store']);
    Route::apiResource('reservations', ReservationController::class)->only(['index', 'store']);
});
