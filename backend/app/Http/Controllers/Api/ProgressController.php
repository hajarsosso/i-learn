<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\LessonProgress;

class ProgressController extends Controller
{
    public function updateProgress(Request $request)
    {
        $validated = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'progress_percent' => 'required|integer|min:0|max:100',
        ]);

        $progress = LessonProgress::updateOrCreate(
            [
                'student_id' => Auth::id(),
                'lesson_id' => $validated['lesson_id'],
            ],
            [
                'progress_percent' => $validated['progress_percent'],
                'completed' => $validated['progress_percent'] >= 100,
                'completed_at' => $validated['progress_percent'] >= 100
                    ? now()
                    : null,
            ]
        );

        return response()->json([
            'message' => 'Progress updated successfully',
            'progress' => $progress,
        ]);
    }
}