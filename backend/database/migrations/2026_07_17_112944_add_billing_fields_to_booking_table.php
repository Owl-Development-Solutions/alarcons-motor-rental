<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Checkout / billing details, collected at booking time.
            // Payment itself is handled in person (meet-up) for now.
            $table->string('first_name')->after('user_id');
            $table->string('last_name')->after('first_name');
            $table->string('company_name')->nullable()->after('last_name');
            $table->string('country')->after('company_name'); // region/country
            $table->string('street_address')->after('country');
            $table->string('city')->after('street_address');
            $table->string('postcode')->after('city');
            $table->string('phone')->after('postcode');
            $table->string('email')->after('phone');
            $table->text('order_notes')->nullable()->after('email');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'first_name', 'last_name', 'company_name', 'country',
                'street_address', 'city', 'postcode', 'phone', 'email', 'order_notes',
            ]);
        });
    }
};