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
        Schema::table('vehicles', function (Blueprint $table) {
            // Rename status -> vehicle_status
            $table->renameColumn('status', 'vehicle_status');

            $table->string('vehicle_availability')
                  ->default('available')
                  ->after('vehicle_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropColumn('vehicle_availability');

            $table->renameColumn('vehicle_status', 'status');
        });
    }
};
