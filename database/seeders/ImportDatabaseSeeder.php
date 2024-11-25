<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImportDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ruta al archivo SQL
        $path = database_path('seeders/BDNube.sql');

        // Cargar el contenido del archivo SQL
        $sql = file_get_contents($path);

        // Ejecutar el contenido del archivo SQL
        DB::unprepared($sql);

        $this->command->info('Base de datos importada con éxito.');
    }
}
