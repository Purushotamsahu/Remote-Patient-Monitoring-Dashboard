<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::connection('mongodb')->table('users', function (Blueprint $table) {
            // Doctor verification fields
            $table->boolean('is_verified')->default(false);
            $table->string('verification_status')->default('none'); // none, pending, verified, rejected
            $table->string('medical_license')->nullable();
            $table->string('specialization')->nullable();
            $table->text('qualifications')->nullable();
            $table->text('verification_notes')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->string('verified_by')->nullable(); // admin user_id

            // Admin hierarchy
            $table->boolean('is_master_admin')->default(false);
        });
    }

    public function down(): void
    {
        Schema::connection('mongodb')->table('users', function (Blueprint $table) {
            $table->dropColumn([
                'is_verified',
                'verification_status',
                'medical_license',
                'specialization',
                'qualifications',
                'verification_notes',
                'verified_at',
                'verified_by',
                'is_master_admin',
            ]);
        });
    }
};
