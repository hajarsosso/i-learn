<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::where('role', 'student')->get();
        $courses = Course::all();

        foreach ($students as $student) {

            // Each student gets between 2 and 4 courses
            $selectedCourses = $courses->random(rand(2, 4));

            foreach ($selectedCourses as $course) {

                Enrollment::updateOrCreate(

                    [
                        'student_id' => $student->id,
                        'course_id' => $course->id,
                    ],

                    []

                );

            }

        }
    }
}