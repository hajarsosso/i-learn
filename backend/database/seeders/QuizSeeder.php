<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Quiz;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Lesson::all() as $lesson) {

            Quiz::updateOrCreate(

                [
                    'lesson_id' => $lesson->id,
                ],

                [
                    'title' => $lesson->title . ' Quiz',

                    'required_score' => 70,

                    'time_limit' => 15,
                ]

            );

        }
    }
}