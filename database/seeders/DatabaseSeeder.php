<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Asistencia;
use App\Models\Clase;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        \App\Models\Clase::factory()
            ->count(5) // Crear 5 clases
            ->hasEstudiantes(10) // Cada clase tiene 10 estudiantes
            ->create();

        \App\Models\Clase::factory()
            ->count(5)
            ->has(
                \App\Models\Estudiante::factory()
                    ->count(10)
                    ->hasAsistencias(5) // Cada estudiante tiene 5 registros de asistencia
            )
            ->create();
    }
}
