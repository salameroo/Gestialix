<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('app_occasionals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id')->nullable(); // Relación con la tabla de estudiantes
            $table->unsignedBigInteger('class_id')->nullable();  // Relación con la clase
            $table->date('date')->nullable();                    // Fecha en la que fue ocasional
            $table->timestamps();

            // Claves foráneas
            $table->foreign('student_id')->references('id')->on('app_students')->onDelete('cascade');
            $table->foreign('class_id')->references('id')->on('app_classes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_occasionals');
    }
};
