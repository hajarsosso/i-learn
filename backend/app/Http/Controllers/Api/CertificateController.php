<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Certificate;
use App\Models\Course;

use Illuminate\Support\Facades\Auth;

use Barryvdh\DomPDF\Facade\Pdf;

use App\Models\LessonProgress;

class CertificateController extends Controller
{
    public function generate($courseId)
    {
        $course = Course::with('lessons')
            ->findOrFail($courseId);

        $studentId = Auth::id();

        /*
        |--------------------------------------------------------------------------
        | Check Completion
        |--------------------------------------------------------------------------
        */

        $totalLessons =
            $course->lessons->count();

       $completedLessons =
    \App\Models\LessonProgress::where(
        'student_id',
        $studentId
    )
    ->whereIn(
        'lesson_id',
        $course->lessons->pluck('id')
    )
    ->where('completed', true)
    ->count();

    

        if (
            $totalLessons === 0 ||
            $completedLessons < $totalLessons
        ) {
            return response()->json([
                'message' =>
                    'Course is not completed yet.'
            ], 403);
        }

        /*
        |--------------------------------------------------------------------------
        | Existing Certificate
        |--------------------------------------------------------------------------
        */

        $certificate =
            Certificate::firstOrCreate(
                [
                    'student_id' => $studentId,
                    'course_id' => $courseId,
                ],
                [
                    'certificate_number' =>
                        'CERT-' .
                        strtoupper(
                            uniqid()
                        ),

                    'issued_at' => now(),
                ]
            );


        return response()->json(
            $certificate
        );
    }

    public function myCertificates()
    {
        return Certificate::with(
            'course'
        )
        ->where(
            'student_id',
            Auth::id()
        )
        ->latest()
        ->get();
    }

    public function download($courseId)
{
    $certificate = Certificate::with([
        'student',
        'course'
    ])
    ->where('student_id', Auth::id())
    ->where('course_id', $courseId)
    ->first();

    if (!$certificate) {

    $course = Course::with('lessons')
        ->findOrFail($courseId);

    $studentId = Auth::id();

    $totalLessons = $course->lessons->count();

    $completedLessons = LessonProgress::where(
        'student_id',
        $studentId
    )
    ->whereIn(
        'lesson_id',
        $course->lessons->pluck('id')
    )
    ->where('completed', true)
    ->count();

    if (
        $totalLessons === 0 ||
        $completedLessons < $totalLessons
    ) {
        return response()->json([
            'message' => 'Course is not completed yet.'
        ], 403);
    }

    $certificate = Certificate::create([
        'student_id' => $studentId,
        'course_id' => $courseId,
        'certificate_number' => 'CERT-' . strtoupper(uniqid()),
        'issued_at' => now(),
    ]);
}

    $pdf = Pdf::loadView(
    'certificate',
    [
        'certificate' => $certificate
    ]
)->setPaper('a4', 'landscape');

    return $pdf->download(
        'certificate-' .
        $certificate->certificate_number .
        '.pdf'
    );
}
}