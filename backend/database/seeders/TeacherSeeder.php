<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [

            [
                'name' => 'Dr. Youssef El Idrissi',
                'email' => 'youssef@elearning.com',
            ],

            [
                'name' => 'Fatima Zahra Amrani',
                'email' => 'fatima@elearning.com',
            ],

            [
                'name' => 'Mohamed Bennani',
                'email' => 'mohamed@elearning.com',
            ],

        ];

        foreach ($teachers as $teacher) {

            User::updateOrCreate(

                [
                    'email' => $teacher['email'],
                ],

                [
                    'name' => $teacher['name'],
                    'password' => Hash::make('password'),
                    'role' => 'teacher',
                ]

            );

        }
    }
}