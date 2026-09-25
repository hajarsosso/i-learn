<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\User;
use App\Models\Category;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = User::where('role', 'teacher')->get()->keyBy('email');
        $categories = Category::all()->keyBy('name');

        $courses = [

            [
                'title' => 'Modern React Development',
                'description' => 'Learn how to build modern web applications using React, Hooks, Context API, React Router and best development practices.',
                'teacher' => 'youssef@elearning.com',
                'category' => 'Web Development',
            ],

            [
                'title' => 'Laravel REST API Development',
                'description' => 'Build secure RESTful APIs with Laravel, Sanctum authentication, Eloquent ORM and API Resources.',
                'teacher' => 'youssef@elearning.com',
                'category' => 'Web Development',
            ],

            [
                'title' => 'Flutter Mobile Applications',
                'description' => 'Create cross-platform mobile applications using Flutter and Dart while following clean architecture principles.',
                'teacher' => 'fatima@elearning.com',
                'category' => 'Mobile Development',
            ],

            [
                'title' => 'Introduction to Artificial Intelligence',
                'description' => 'Discover the fundamentals of artificial intelligence, machine learning and real-world AI applications.',
                'teacher' => 'fatima@elearning.com',
                'category' => 'Artificial Intelligence',
            ],

            [
                'title' => 'Cybersecurity Essentials',
                'description' => 'Understand cybersecurity concepts, common attacks, network protection and secure software development.',
                'teacher' => 'mohamed@elearning.com',
                'category' => 'Cybersecurity',
            ],

            [
                'title' => 'Python for Data Analysis',
                'description' => 'Analyze datasets using Python, Pandas, NumPy and Matplotlib to extract valuable insights.',
                'teacher' => 'mohamed@elearning.com',
                'category' => 'Data Science',
            ],

            [
                'title' => 'UI / UX Design Fundamentals',
                'description' => 'Learn user-centered design principles, wireframing, prototyping and interface design using Figma.',
                'teacher' => 'fatima@elearning.com',
                'category' => 'UI / UX Design',
            ],

            [
                'title' => 'Cloud Computing with AWS',
                'description' => 'Explore cloud computing concepts, AWS services, deployment strategies and scalable architectures.',
                'teacher' => 'youssef@elearning.com',
                'category' => 'Cloud Computing',
            ],

        ];

        foreach ($courses as $course) {

            Course::updateOrCreate(

                [
                    'title' => $course['title'],
                ],

                [
                    'description' => $course['description'],

                    'teacher_id' => $teachers[$course['teacher']]->id,

                    'category_id' => $categories[$course['category']]->id,

                    'status' => 'published',

                    'thumbnail' => null,
                ]

            );

        }
    }
}