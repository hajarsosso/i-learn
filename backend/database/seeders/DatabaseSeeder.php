<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([

            AdminSeeder::class,

            TeacherSeeder::class,

            StudentSeeder::class,

            CategorySeeder::class,

            CourseSeeder::class,

            LessonSeeder::class,

            QuizSeeder::class,

            QuestionSeeder::class,

            EnrollmentSeeder::class,

            LessonProgressSeeder::class,

            QuizAttemptSeeder::class,

            CertificateSeeder::class,

        ]);
    }
}