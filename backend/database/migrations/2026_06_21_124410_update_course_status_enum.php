<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    DB::statement("
        ALTER TABLE courses
        MODIFY status ENUM(
            'pending',
            'published',
            'rejected'
        )
        DEFAULT 'pending'
    ");
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
