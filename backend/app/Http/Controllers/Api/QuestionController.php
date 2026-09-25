<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class QuestionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'points' => 'required|integer|min:1',
            'quiz_id' => 'required|exists:quizzes,id',
            'answers' => 'required|array|min:2',
        ]);

        $correctAnswer = collect($validated['answers'])
    ->firstWhere('is_correct', true);

$question = Question::create([
    'text' => $validated['text'],
    'points' => $validated['points'],
    'quiz_id' => $validated['quiz_id'],
    'correct_answer' => $correctAnswer['text'],
]);

        foreach ($validated['answers'] as $answerData) {

            Answer::create([
                'text' => $answerData['text'],
                'is_correct' => $answerData['is_correct'],
                'question_id' => $question->id,
            ]);
        }

        return response()->json([
            'message' => 'Question created successfully',
            'question' => $question->load('answers')
        ], 201);
    }

    

    public function destroy($id): JsonResponse
{
    $question = Question::find($id);

    if (!$question) {
        return response()->json([
            'message' => 'Question not found'
        ], 404);
    }

    $question->delete();

    return response()->json([
        'message' => 'Question deleted successfully'
    ]);
}

public function update(Request $request, $id): JsonResponse
{
    $question = Question::find($id);

    if (!$question) {
        return response()->json([
            'message' => 'Question not found'
        ], 404);
    }

    $validated = $request->validate([
        'text' => 'required|string',
        'points' => 'required|integer|min:1',
        'answers' => 'required|array|min:2',
    ]);

    $question->update([
        'text' => $validated['text'],
        'points' => $validated['points'],
    ]);

    $question->answers()->delete();

    foreach ($validated['answers'] as $answerData) {

        Answer::create([
            'question_id' => $question->id,
            'text' => $answerData['text'],
            'is_correct' => $answerData['is_correct'],
        ]);
    }

    return response()->json([
        'message' => 'Question updated successfully',
        'question' => $question->load('answers')
    ]);
}
}