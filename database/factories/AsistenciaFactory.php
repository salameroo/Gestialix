<?php
// database/factories/AsistenciaFactory.php
use App\Models\Asistencia;
use App\Models\Estudiante;
use Illuminate\Database\Eloquent\Factories\Factory;

class AsistenciaFactory extends Factory
{
    protected $model = Asistencia::class;

    public function definition()
    {
        return [
            'estudiante_id' => Estudiante::factory(),
            'fecha' => $this->faker->dateTimeThisMonth,
            'asiste' => $this->faker->boolean(80),
            'es_dia_suelto' => $this->faker->boolean(20),
        ];
    }
}
