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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->onDelete('cascade');

            $table->string('method')->default('gcash');
            $table->string('reference_number')->nullable();
            $table->string('proof_image_path');
            $table->decimal('amount', 10, 2);

            // 'pending', 'approved', 'rejected'
            $table->string('status')->default('pending');

            $table->foreignId('reviewed_by')->nullable()->constrained('users');
            $table->text('admin_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::dropIfExists('payments');
    }
};
