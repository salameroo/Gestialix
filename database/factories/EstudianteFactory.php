<?php
// database/factories/EstudianteFactory.php

use App\Models\Clase;
use App\Models\Estudiante;
use Illuminate\Database\Eloquent\Factories\Factory;

class EstudianteFactory extends Factory
{
    protected $model = Estudiante::class;


    public function definition()
    {
        return [
            'nombre' => $this->faker->firstName,
            'apellidos' => $this->faker->lastName,
            'clase_id' => Clase::factory(),
            'pago' => $this->faker->boolean,
            'intolerancia_religion' => $this->faker->randomElement(['Ninguna', 'Lactosa', 'Religión']),
            'beca' => $this->faker->boolean,
        ];
    }
}
