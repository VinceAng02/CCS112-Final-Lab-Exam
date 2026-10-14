<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoomController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return RoomResource::collection(Room::query()->orderByDesc('id')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'number' => ['required', 'string', 'max:20', 'unique:rooms,number'],
            'type' => ['required', 'string', 'max:50'],
            'floor' => ['required', 'integer', 'min:0'],
            'capacity' => ['required', 'integer', 'min:1'],
            'rate' => ['required', 'numeric', 'min:0'],
            'status' => ['required', 'in:Available,Occupied,Maintenance'],
            'description' => ['nullable', 'string', 'max:2000'],
        ]);

        $room = Room::create($validated);

        return RoomResource::make($room)->response()->setStatusCode(201);
    }
}
