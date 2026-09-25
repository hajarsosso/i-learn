<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\LessonProgress;

class LessonCompletionController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | MARK LESSON AS COMPLETED
    |--------------------------------------------------------------------------
    */

    public function complete(Request $request)
    {
        $validated = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
        ]);

        $progress = LessonProgress::updateOrCreate(
            [
                'student_id' => Auth::id(),
                'lesson_id' => $validated['lesson_id'],
            ],
            [
                'completed' => true,
                'completed_at' => now(),
            ]
        );

        return response()->json([
            'message' => 'Lesson completed successfully',
            'progress' => $progress,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | MARK LESSON AS INCOMPLETE
    |--------------------------------------------------------------------------
    */

    public function incomplete(Request $request)
    {
        $validated = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
        ]);

        $progress = LessonProgress::updateOrCreate(
            [
                'student_id' => Auth::id(),
                'lesson_id' => $validated['lesson_id'],
            ],
            [
                'completed' => false,
                'completed_at' => null,
            ]
        );

        return response()->json([
            'message' => 'Lesson marked as incomplete',
            'progress' => $progress,
        ]);
    }
}