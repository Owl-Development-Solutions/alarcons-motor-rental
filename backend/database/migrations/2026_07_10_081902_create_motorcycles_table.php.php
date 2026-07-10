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
        Schema::create('motorcycles', function (Blueprint $table) {
            $table->id();
            $table->string('make');
            $table->string('model');
            $table->unsignedSmallInteger('year');
            $table->string('plate_number')->unique()->nullable();
            $table->string('vin')->unique()->nullable();
            $table->string('category');
            $table->unsignedInteger('engine_displacement_cc')->nullable();
            $table->string('transmission');
            $table->string('fuel_type');
            $table->unsignedTinyInteger('seats')->default(2);
            $table->string('color');
            $table->unsignedInteger('mileage')->default(0);
            $table->decimal('daily_rate', 10, 2);
            $table->char('currency', 3)->default('PHP');
            $table->string('status');
            
            // Simplified fields
            $table->json('features')->nullable();
            $table->json('images')->nullable();
            $table->json('insurance')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motorcycles');
    }
};
