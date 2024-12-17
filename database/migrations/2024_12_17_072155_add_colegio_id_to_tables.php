<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Agregar colegio_id a la tabla users
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('colegio_id')->constrained('colegios')->onDelete('cascade');
        });

        // Agregar colegio_id a la tabla estudiantes
        Schema::table('estudiantes', function (Blueprint $table) {
            $table->foreignId('colegio_id')->constrained('colegios')->onDelete('cascade');
        });

        // Agregar colegio_id a la tabla clases
        Schema::table('clases', function (Blueprint $table) {
            $table->foreignId('colegio_id')->constrained('colegios')->onDelete('cascade');
        });

        // Agregar colegio_id a la tabla asistencias
        Schema::table('asistencias', function (Blueprint $table) {
            $table->foreignId('colegio_id')->constrained('colegios')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['colegio_id']);
            $table->dropColumn('colegio_id');
        });

        Schema::table('estudiantes', function (Blueprint $table) {
            $table->dropForeign(['colegio_id']);
            $table->dropColumn('colegio_id');
        });

        Schema::table('clases', function (Blueprint $table) {
            $table->dropForeign(['colegio_id']);
            $table->dropColumn('colegio_id');
        });

        Schema::table('asistencias', function (Blueprint $table) {
            $table->dropForeign(['colegio_id']);
            $table->dropColumn('colegio_id');
        });
    }
};
