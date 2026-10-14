<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => fake()->unique()->numerify('###'),
            'type' => fake()->randomElement(['Standard', 'Deluxe', 'Suite', 'Family']),
            'floor' => fake()->numberBetween(1, 8),
            'capacity' => fake()->numberBetween(1, 4),
            'rate' => fake()->randomFloat(2, 80, 400),
            'status' => 'Available',
            'description' => fake()->sentence(),
        ];
    }
}
