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
        Schema::create('app_schools', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('CIF')->nullable();
            $table->string('address')->nullable();
            $table->string('city');
            $table->string('state');
            $table->string('country');
            $table->string('zip');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_schools');
    }
};
