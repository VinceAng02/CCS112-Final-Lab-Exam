<?php

use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('lists rooms from the versioned api', function () {
    $room = Room::factory()->create(['number' => '101']);

    $this->getJson('/api/v1/rooms')
        ->assertOk()
        ->assertJsonPath('data.0.id', $room->id)
        ->assertJsonPath('data.0.number', '101');
});

it('creates a room from validated api data', function () {
    $this->postJson('/api/v1/rooms', [
        'number' => '204',
        'type' => 'Deluxe',
        'floor' => 2,
        'capacity' => 2,
        'rate' => 185,
        'status' => 'Available',
        'description' => 'City view',
        'is_admin' => true,
    ])
        ->assertCreated()
        ->assertJsonPath('data.number', '204')
        ->assertJsonMissingPath('data.is_admin');

    $this->assertDatabaseHas('rooms', [
        'number' => '204',
        'type' => 'Deluxe',
        'floor' => 2,
    ]);
});

it('rejects a duplicate room number', function () {
    Room::factory()->create(['number' => '101']);

    $this->postJson('/api/v1/rooms', [
        'number' => '101',
        'type' => 'Standard',
        'floor' => 1,
        'capacity' => 2,
        'rate' => 120,
        'status' => 'Available',
    ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['number']);
});
