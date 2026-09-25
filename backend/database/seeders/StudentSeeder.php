<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [

            [
                'name' => 'Sara Bennani',
                'email' => 'sara@elearning.com',
            ],

            [
                'name' => 'Omar El Fassi',
                'email' => 'omar@elearning.com',
            ],

            [
                'name' => 'Aya Chraibi',
                'email' => 'aya@elearning.com',
            ],

            [
                'name' => 'Mehdi Alaoui',
                'email' => 'mehdi@elearning.com',
            ],

            [
                'name' => 'Nour El Mansouri',
                'email' => 'nour@elearning.com',
            ],

            [
                'name' => 'Hassan Berrada',
                'email' => 'hassan@elearning.com',
            ],

            [
                'name' => 'Salma Idrissi',
                'email' => 'salma@elearning.com',
            ],

            [
                'name' => 'Yassine El Amrani',
                'email' => 'yassine@elearning.com',
            ],

            [
                'name' => 'Imane Tazi',
                'email' => 'imane@elearning.com',
            ],

            [
                'name' => 'Anas Cherkaoui',
                'email' => 'anas@elearning.com',
            ],

        ];

        foreach ($students as $student) {

            User::updateOrCreate(

                [
                    'email' => $student['email'],
                ],

                [
                    'name' => $student['name'],
                    'password' => Hash::make('password'),
                    'role' => 'student',
                ]

            );

        }
    }
}