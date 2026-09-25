<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | CREATE QUIZ
    |--------------------------------------------------------------------------
    */

    public function store(Request $request): JsonResponse
    {
        
        $validated = $request->validate([
    'title' => 'required|string|max:255',
    'required_score' => 'required|integer|min:0|max:100',
    'time_limit' => 'required|integer|min:1',
    'lesson_id' => 'required|exists:lessons,id',
]);

        $quiz = Quiz::create($validated);

        return response()->json([
            'message' => 'Quiz created successfully',
            'quiz' => $quiz,
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
{
    $quiz = Quiz::find($id);

    if (!$quiz) {
        return response()->json([
            'message' => 'Quiz not found'
        ], 404);
    }

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'required_score' => 'required|integer|min:0|max:100',
    ]);

    $quiz->update($validated);

    return response()->json([
        'message' => 'Quiz updated successfully',
        'quiz' => $quiz
    ]);
}

    /*
    |--------------------------------------------------------------------------
    | SHOW QUIZ WITH QUESTIONS + ANSWERS
    |--------------------------------------------------------------------------
    */

    public function show(int $id): JsonResponse
    {
        $quiz = Quiz::with('questions.answers')
            ->findOrFail($id);

        return response()->json($quiz);
    }

    /*
    |--------------------------------------------------------------------------
    | SUBMIT QUIZ
    |--------------------------------------------------------------------------
    */

    public function submit(Request $request): JsonResponse
{
    $validated = $request->validate([
    'quiz_id' => 'required|exists:quizzes,id',
    'answers' => 'nullable|array',
]);

$validated['answers'] =
    $validated['answers'] ?? [];
    
    $quiz = Quiz::with('questions.answers')
        ->findOrFail($validated['quiz_id']);

    $existingAttempt = QuizAttempt::where('student_id', Auth::id())
    ->where('quiz_id', $validated['quiz_id'])
    ->first();

if ($existingAttempt) {
    return response()->json([
        'message' => 'You have already submitted this quiz.'
    ], 409);
}

    $questions = $quiz->questions;

    $score = 0;
    $totalQuestions = $questions->count();
    $totalPoints = $questions->sum('points');

    $review = [];

foreach ($questions as $question) {
    
    $studentAnswerId =
        $validated['answers'][$question->id] ?? null;

    $correctAnswer = $question->answers
        ->where('is_correct', true)
        ->first();

    $studentAnswer = $question->answers
        ->where('id', $studentAnswerId)
        ->first();

    $isCorrect =
        $correctAnswer &&
        (int) $studentAnswerId === (int) $correctAnswer->id;

    if ($isCorrect) {
        $score += $question->points;
    }

    $review[] = [
        'question' => $question->text,

        'student_answer' =>
            $studentAnswer?->text,

        'correct_answer' =>
            $correctAnswer?->text,

        'is_correct' =>
            $isCorrect,

        'points' =>
            $question->points,
    ];
}

    $percentage = $totalPoints > 0
        ? round(($score / $totalPoints) * 100)
        : 0;

    $passed = $percentage >= $quiz->required_score;

    $attempt = QuizAttempt::create([
        'student_id' => Auth::id(),
        'quiz_id' => $quiz->id,
        'score' => $score,
        'total_questions' => $totalQuestions,
        'percentage' => $percentage,
        'passed' => $passed,
        'attempted_at' => now(),
    ]);

    return response()->json([
    'message' => 'Quiz submitted successfully',

    'result' => [
        'score' => $score,
        'total_points' => $totalPoints,
        'percentage' => $percentage,
        'passed' => $passed,
    ],

    'review' => $review,

    'attempt' => $attempt,
]);
}

    /*
    |--------------------------------------------------------------------------
    | QUIZ ATTEMPTS
    |--------------------------------------------------------------------------
    */

    public function attempts($id): JsonResponse
    {
        $attempts = QuizAttempt::where('quiz_id', $id)
            ->latest()
            ->get();

        return response()->json($attempts);
    }

    /*
|--------------------------------------------------------------------------
| DELETE QUIZ
|--------------------------------------------------------------------------
*/

public function destroy($id)
{
    $quiz = Quiz::findOrFail($id);

    $quiz->delete();

    return response()->json([
        'message' => 'Quiz deleted successfully'
    ]);
}

public function myAttempts(): JsonResponse
{
    $attempts = QuizAttempt::with('quiz')
        ->where('student_id', Auth::id())
        ->latest()
        ->get();

    return response()->json($attempts);
}
}