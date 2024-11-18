<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        // Desactiva temporalmente las restricciones de claves foráneas
        Schema::disableForeignKeyConstraints();

        // Ejecuta el refresh de migraciones

        // Vuelve a activar las restricciones de claves foráneas
        Schema::enableForeignKeyConstraints();
    }
}
