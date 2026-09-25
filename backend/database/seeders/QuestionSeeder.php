<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Quiz::all() as $quiz) {

            for ($i = 1; $i <= 5; $i++) {

                $question = Question::create([

                    'quiz_id' => $quiz->id,

                    'text' => "Question {$i} for {$quiz->title}",

                    'points' => 1,

                    // no longer used by the application,
                    // but kept because your database requires it
                    'correct_answer' => 'Correct answer',

                    // no longer used
                    'options' => [],

                ]);

                Answer::create([
                    'question_id' => $question->id,
                    'text' => 'Correct answer',
                    'is_correct' => true,
                ]);

                Answer::create([
                    'question_id' => $question->id,
                    'text' => 'Incorrect answer 1',
                    'is_correct' => false,
                ]);

                Answer::create([
                    'question_id' => $question->id,
                    'text' => 'Incorrect answer 2',
                    'is_correct' => false,
                ]);

                Answer::create([
                    'question_id' => $question->id,
                    'text' => 'Incorrect answer 3',
                    'is_correct' => false,
                ]);

            }

        }
    }
}