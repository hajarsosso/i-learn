<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LessonProgress;
use App\Models\QuizAttempt;

class QuizAttemptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $completedLessons = LessonProgress::where(
            'completed',
            true
        )->get();

        foreach ($completedLessons as $progress) {

            $lesson = $progress->lesson;

            if (!$lesson || !$lesson->quiz) {
                continue;
            }

            $quiz = $lesson->quiz;

            $score = rand(2, 5);

            $totalQuestions = 5;

            $percentage = round(
                ($score / $totalQuestions) * 100
            );

            QuizAttempt::updateOrCreate(

                [
                    'student_id' => $progress->student_id,
                    'quiz_id' => $quiz->id,
                ],

                [
                    'score' => $score,

                    'total_questions' => $totalQuestions,

                    'percentage' => $percentage,

                    'passed' => $percentage >= $quiz->required_score,

                    'attempted_at' => now()->subDays(rand(1, 30)),
                ]

            );

        }
    }
}