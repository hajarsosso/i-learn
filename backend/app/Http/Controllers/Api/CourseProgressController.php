<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Models\Course;
use App\Models\LessonProgress;

class CourseProgressController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | GET COURSE PROGRESS
    |--------------------------------------------------------------------------
    */

    public function show($courseId)
    {
        $course = Course::with('lessons')->find($courseId);

        if (!$course) {
            return response()->json([
                'message' => 'Course not found'
            ], 404);
        }

        $studentId = Auth::id();

        /*
        |--------------------------------------------------------------------------
        | TOTAL LESSONS
        |--------------------------------------------------------------------------
        */

        $totalLessons = $course->lessons->count();

        /*
        |--------------------------------------------------------------------------
        | COMPLETED LESSONS
        |--------------------------------------------------------------------------
        */

        $lessonIds = $course->lessons->pluck('id');

        $completedLessons = LessonProgress::where('student_id', $studentId)
            ->whereIn('lesson_id', $lessonIds)
            ->where('completed', true)
            ->count();

        /*
        |--------------------------------------------------------------------------
        | PROGRESS PERCENT
        |--------------------------------------------------------------------------
        */

        $progressPercent = 0;

        if ($totalLessons > 0) {
            $progressPercent = round(
                ($completedLessons / $totalLessons) * 100
            );
        }

        return response()->json([
            'course_id' => $course->id,
            'course_title' => $course->title,
            'total_lessons' => $totalLessons,
            'completed_lessons' => $completedLessons,
            'progress_percent' => $progressPercent,
        ]);
    }
}