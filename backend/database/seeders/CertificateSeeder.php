<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Enrollment;
use App\Models\LessonProgress;
use App\Models\Certificate;
use Illuminate\Support\Str;

class CertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enrollments = Enrollment::with('course.lessons')->get();

        foreach ($enrollments as $enrollment) {

            $course = $enrollment->course;

            if (!$course) {
                continue;
            }

            $lessonIds = $course->lessons->pluck('id');

            if ($lessonIds->isEmpty()) {
                continue;
            }

            $completedLessons = LessonProgress::where(
                'student_id',
                $enrollment->student_id
            )
            ->whereIn('lesson_id', $lessonIds)
            ->where('completed', true)
            ->count();

            if ($completedLessons === $lessonIds->count()) {

                Certificate::updateOrCreate(

                    [
                        'student_id' => $enrollment->student_id,
                        'course_id' => $course->id,
                    ],

                    [
                        'certificate_number' => strtoupper(Str::random(12)),

                        'issued_at' => now()->subDays(rand(1, 20)),
                    ]

                );

            }

        }
    }
}