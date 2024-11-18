<?php
// database/factories/ClaseFactory.php
use App\Models\Clase;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClaseFactory extends Factory
{
    protected $model = Clase::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->word,
            'curso_academico' => '2023/2024',
        ];
    }
}
