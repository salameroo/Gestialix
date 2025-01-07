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
        Schema::table('app_attendances', function (Blueprint $table) {
            $table->unsignedBigInteger('occasional_id')->nullable();

            // Clave foránea hacia la tabla 'ocasionals'
            $table->foreign('occasional_id')->references('id')->on('app_occasionals')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('app_attendances', function (Blueprint $table) {
            $table->dropForeign(['occasional_id']);
            $table->dropColumn('occasional_id');
        });
    }
};
