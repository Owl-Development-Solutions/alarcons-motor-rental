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
        Schema::table('bookings', function (Blueprint $table) {
            //
            Schema::table('bookings', function (Blueprint $table) {
                $table->string('rental_mode')->nullable()->after('payment_status');
                $table->string('delivery_location')->nullable()->after('rental_mode');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            //
            Schema::table('bookings', function (Blueprint $table) {
                $table->dropColumn(['rental_mode', 'delivery_location']);
            });
        });
    }
};
