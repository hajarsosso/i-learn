<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [

            "Web Development",

            "Mobile Development",

            "Artificial Intelligence",

            "Cybersecurity",

            "Data Science",

            "UI / UX Design",

            "Cloud Computing",

            "Programming Fundamentals",

        ];

        foreach ($categories as $category) {

            Category::updateOrCreate(

                [
                    'slug' => Str::slug($category),
                ],

                [
                    'name' => $category,
                ]

            );

        }
    }
}