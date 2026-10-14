<?php

use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('lists reservations with their room details', function () {
    $room = Room::factory()->create(['number' => '305']);
    $reservation = Reservation::factory()->create(['room_id' => $room->id]);

    $this->getJson('/api/v1/reservations')
        ->assertOk()
        ->assertJsonPath('data.0.id', $reservation->id)
        ->assertJsonPath('data.0.room.number', '305');
});

it('creates a reservation and persists the selected room', function () {
    $room = Room::factory()->create();

    $this->postJson('/api/v1/reservations', [
        'room_id' => $room->id,
        'guest_name' => 'Jordan Lee',
        'guest_email' => 'jordan@example.com',
        'check_in' => '2027-01-10',
        'check_out' => '2027-01-12',
        'guests' => 2,
        'status' => 'Confirmed',
    ])
        ->assertCreated()
        ->assertJsonPath('data.room_id', $room->id)
        ->assertJsonPath('data.guest_name', 'Jordan Lee');

    $this->assertDatabaseHas('reservations', [
        'room_id' => $room->id,
        'guest_name' => 'Jordan Lee',
        'check_in' => '2027-01-10',
        'check_out' => '2027-01-12',
    ]);
});

it('rejects a reservation when check out is not after check in', function () {
    $room = Room::factory()->create();

    $this->postJson('/api/v1/reservations', [
        'room_id' => $room->id,
        'guest_name' => 'Jordan Lee',
        'check_in' => '2027-01-12',
        'check_out' => '2027-01-10',
        'guests' => 2,
        'status' => 'Confirmed',
    ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['check_out']);
});
