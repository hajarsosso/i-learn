<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\LessonProgress;

class LessonProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::where('role', 'student')->get();

        foreach ($students as $student) {

            $enrollments = Enrollment::where(
                'student_id',
                $student->id
            )->get();

            foreach ($enrollments as $enrollment) {

                $lessons = $enrollment
                    ->course
                    ->lessons()
                    ->orderBy('order')
                    ->get();

                if ($lessons->isEmpty()) {
                    continue;
                }

                // Student completed between 20% and 100% of the lessons
                $completedCount = rand(
                    max(1, floor($lessons->count() * 0.2)),
                    $lessons->count()
                );

                foreach ($lessons as $index => $lesson) {

                    $completed = $index < $completedCount;

                    LessonProgress::updateOrCreate(

                        [
                            'student_id' => $student->id,
                            'lesson_id' => $lesson->id,
                        ],

                        [
                            'completed' => $completed,

                            'completed_at' => $completed
                                ? now()->subDays(rand(1, 30))
                                : null,

                            'progress_percent' => $completed ? 100 : 0,
                        ]

                    );

                }

            }

        }
    }
}