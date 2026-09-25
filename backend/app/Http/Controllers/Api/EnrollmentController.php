<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Enrollment;

use App\Models\LessonProgress;

class EnrollmentController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | ENROLL COURSE
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
    ]);

    $alreadyEnrolled = Enrollment::where(
        'student_id',
        Auth::id()
    )
    ->where(
        'course_id',
        $validated['course_id']
    )
    ->exists();

    if ($alreadyEnrolled) {
        return response()->json([
            'message' => 'You are already enrolled in this course.'
        ], 409);
    }

    $existing = Enrollment::where('student_id', Auth::id())
    ->where('course_id', $validated['course_id'])
    ->first();

if ($existing) {
    return response()->json([
        'message' => 'Already enrolled',
    ], 409);
}

$enrollment = Enrollment::create([
    'student_id' => Auth::id(),
    'course_id' => $validated['course_id'],
    'enrolled_at' => now(),
]);

    return response()->json([
        'message' => 'Enrollment successful',
        'enrollment' => $enrollment,
    ], 201);
}


public function destroy($courseId)
{
    Enrollment::where(
        'student_id',
        Auth::id()
    )
    ->where(
        'course_id',
        $courseId
    )
    ->delete();

    return response()->json([
        'message' => 'Course removed'
    ]);
}

    /*
    |--------------------------------------------------------------------------
    | MY COURSES
    |--------------------------------------------------------------------------
    */

    public function myCourses()
{
    $studentId = Auth::id();

    $courses = Enrollment::with([
        'course',
        'course.teacher',
        'course.lessons',
    ])
    ->where('student_id', $studentId)
    ->get()
    ->map(function ($enrollment) use ($studentId) {

        $course = $enrollment->course;

        if (!$course) {
            return null;
        }

        $lessonIds = $course->lessons->pluck('id');

        $completedLessons = LessonProgress::where(
            'student_id',
            $studentId
        )
        ->whereIn(
            'lesson_id',
            $lessonIds
        )
        ->where('completed', true)
        ->count();

        $totalLessons = $course->lessons->count();

        return [

    'id' => $course->id,

    'title' => $course->title,

    'thumbnail' => $course->thumbnail_url,

    'teacher' => $course->teacher?->name,

    'is_completed' =>
        $totalLessons > 0 &&
        $completedLessons >= $totalLessons,

];
    })
    ->filter()
    ->values();

    return response()->json($courses);
}
}