<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReservationController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return ReservationResource::collection(
            Reservation::query()->with('room')->orderByDesc('id')->get(),
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'room_id' => ['required', 'integer', 'exists:rooms,id'],
            'guest_name' => ['required', 'string', 'max:255'],
            'guest_email' => ['nullable', 'email', 'max:255'],
            'check_in' => ['required', 'date'],
            'check_out' => ['required', 'date', 'after:check_in'],
            'guests' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'in:Confirmed,Checked-in,Completed,Cancelled'],
        ]);

        $reservation = Reservation::create($validated)->load('room');

        return ReservationResource::make($reservation)->response()->setStatusCode(201);
    }
}
