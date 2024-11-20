<?php

namespace Database\Factories;

use App\Models\Clase;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClaseFactory extends Factory
{
    protected $model = Clase::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->word(),
            'curso_academico' => $this->faker->year(),
        ];
    }
}
