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
        Schema::table('lessons', function (Blueprint $table) {

            // add only if NOT exists

            if (!Schema::hasColumn('lessons', 'video_path')) {
                $table->string('video_path')
                    ->nullable()
                    ->after('content');
            }

            if (!Schema::hasColumn('lessons', 'duration')) {
                $table->integer('duration')
                    ->default(0)
                    ->after('video_path');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {

            if (Schema::hasColumn('lessons', 'video_path')) {
                $table->dropColumn('video_path');
            }

            if (Schema::hasColumn('lessons', 'duration')) {
                $table->dropColumn('duration');
            }
        });
    }
};