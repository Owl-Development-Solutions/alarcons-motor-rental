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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand');
            $table->string('model');
            $table->string('year');
            $table->string('type'); // motorcycle or car
            $table->string('transmission');
            $table->string('fuel_type');
            $table->string('seats')->nullable();
            $table->string('color')->nullable();
            $table->string('plate_number')->unique();
            $table->decimal('price_per_day', 10, 2);
            $table->text('description')->nullable();
            $table->string('availability')->default('available'); // available, rented, maintenance
            $table->string('status')->default('active'); // active, inactive
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
