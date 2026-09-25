<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\LessonProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CourseResource;

class CourseController extends Controller
{
    /**
     * Display all courses
     */
    public function index(Request $request)
    {
        $courses = Course::with([
            'teacher',
            'category'
        ])
            ->withCount('lessons')
            ->where('status', 'published')
            ->latest()
            ->get();

        /*
        |--------------------------------------------------------------------------
        | Check enrollments
        |--------------------------------------------------------------------------
        */

        $user = Auth::guard('sanctum')->user();

        if ($user) {

            $enrolledCourseIds = $user
                ->enrollments()
                ->pluck('course_id');

            $courses->each(function ($course) use ($enrolledCourseIds) {
                $course->is_enrolled =
                    $enrolledCourseIds->contains($course->id);
            });
        } else {

            $courses->each(function ($course) {
                $course->is_enrolled = false;
            });
        }

        return CourseResource::collection($courses);
    }

    /**
     * Store new course
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail'   => 'nullable|image',
            'status' => 'nullable',
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['status'] = 'pending';

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request
                ->file('thumbnail')
                ->store('courses', 'public');
        }

        $validated['teacher_id'] = Auth::id();

        $course = Course::create($validated);

        return response()->json([
            'message' => 'Course created successfully.',
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
            ]
        ], 201);
    }

    /**
     * Show single course
     */
    public function show($id)
    {
        $course = Course::with([
            'teacher',
            'category',
            'lessons.quiz',
        ])
            ->withCount([
                'lessons',
                'enrollments as students_count',
            ])
            ->findOrFail($id);

        /*
        |--------------------------------------------------------------------------
        | Total Duration
        |--------------------------------------------------------------------------
        */

        $course->total_duration =
            $course->lessons->sum('duration');

        /*
        |--------------------------------------------------------------------------
        | Student Progress
        |--------------------------------------------------------------------------
        */


        $progress = 0;

        $course->completed_lessons = collect([]);

        if (Auth::check()) {

            $completedLessons = LessonProgress::where(
                'student_id',
                Auth::id()
            )
                ->where('completed', true)
                ->whereIn(
                    'lesson_id',
                    $course->lessons->pluck('id')
                );

            $completedCount = $completedLessons->count();

            $course->completed_lessons =
                $completedLessons->pluck('lesson_id');

            $progress = $course->lessons_count > 0
                ? round(
                    ($completedCount / $course->lessons_count) * 100
                )
                : 0;
        }

        $course->progress_percent = $progress;

        return new CourseResource($course);
    }

    /**
     * Update course
     */
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        if ($course->teacher_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validated = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'thumbnail'   => 'nullable|image',
            'status'      => 'sometimes|in:draft,published',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request
                ->file('thumbnail')
                ->store('courses', 'public');
        }

        $course->update($validated);

        return response()->json([
            'message' => 'Course updated successfully',
            'course'  => $course,
        ]);
    }

    /**
     * Delete course
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);

        if ($course->teacher_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully',
        ]);
    }
}
