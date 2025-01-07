<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('app_classes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default("Noname");

            // Obtener el año actual y el siguiente año para establecer el curso académico
            $currentYear = date('Y');
            $nextYear = $currentYear + 1;
            $academicYear = "{$currentYear}-{$nextYear}";

            $table->string('academic_year')->default($academicYear); // Valor predeterminado dinámico
            $table->foreignId('school_id')->constrained('app_schools')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('app_classes');
    }
};
