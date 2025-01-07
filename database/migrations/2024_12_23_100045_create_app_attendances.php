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
        Schema::create('app_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('app_students')->onDelete('cascade');
            $table->date('date');
            $table->boolean('attends')->default(true);
            $table->boolean('lonely_day')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_attendances');
    }
};
