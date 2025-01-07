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
        Schema::create('app_students', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('surname')->nullable();
            $table->foreignId('class_id')->nullable()->constrained('app_classes')->onDelete('cascade');
            $table->string('payment')->default(false)->nullable();
            $table->json('intolerance_religion')->nullable();
            $table->boolean('scholarship')->default(false)->nullable();
            $table->boolean('assigned_lunch')->default(false)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_students');
    }
};
