<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Lesson;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Course::all() as $course) {

            $lessons = [

                [
                    'title' => 'Introduction',
                    'duration' => 15,
                ],

                [
                    'title' => 'Installation and Setup',
                    'duration' => 25,
                ],

                [
                    'title' => 'Core Concepts',
                    'duration' => 40,
                ],

                [
                    'title' => 'Practical Project',
                    'duration' => 55,
                ],

                [
                    'title' => 'Final Review',
                    'duration' => 20,
                ],

            ];

            foreach ($lessons as $index => $lesson) {

                Lesson::updateOrCreate(

                    [
                        'course_id' => $course->id,
                        'order' => $index + 1,
                    ],

                    [
                        'title' => $lesson['title'],

                        'content' =>
                            "This lesson is part of the course '{$course->title}'. It introduces the learner to the topic and provides practical explanations accompanied by examples and exercises to reinforce understanding.",

                        'video_url' =>
                            "https://www.youtube.com/watch?v=dCLhUialKPQ",

                        'video_path' => null,

                        'duration' => $lesson['duration'],

                    ]

                );

            }

        }
    }
}