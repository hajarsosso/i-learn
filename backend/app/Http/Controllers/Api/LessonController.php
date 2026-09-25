<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Lesson;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;

class LessonController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | CREATE LESSON
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Validation
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'course_id' => 'required|exists:courses,id',
            'duration' => 'required|integer|min:1',

            // Optional upload
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:51200',

            // Optional external URL
            'video_url' => 'nullable|string',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Check Course Ownership
        |--------------------------------------------------------------------------
        */

        $course = Course::findOrFail($request->course_id);

        if ($course->teacher_id !== Auth::id()) {

            return response()->json([
                'message' => 'You do not own this course'
            ], 403);
        }

        /*
        |--------------------------------------------------------------------------
        | Automatic Lesson Ordering
        |--------------------------------------------------------------------------
        */

        $lastOrder = Lesson::where(
            'course_id',
            $request->course_id
        )->max('order');

        $validated['order'] = $lastOrder
            ? $lastOrder + 1
            : 1;

        /*
        |--------------------------------------------------------------------------
        | Default Values
        |--------------------------------------------------------------------------
        */

        $validated['video_path'] = null;
        $validated['video_url'] = null;

        /*
        |--------------------------------------------------------------------------
        | Video Upload
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('video')) {

            $path = $request->file('video')
                ->store('lessons/videos', 'public');

            $validated['video_path'] = $path;

            $validated['video_url'] = asset(
                'storage/' . $path
            );
        }

        /*
        |--------------------------------------------------------------------------
        | External Video URL
        |--------------------------------------------------------------------------
        */

        if ($request->filled('video_url')) {

            $validated['video_url']
                = $request->video_url;
        }

        /*
        |--------------------------------------------------------------------------
        | Create Lesson
        |--------------------------------------------------------------------------
        */

        $lesson = Lesson::create($validated);

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Lesson created successfully',
            'lesson' => $lesson
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE LESSON
    |--------------------------------------------------------------------------
    */

    public function update(Request $request, $id)
    {
        $lesson = Lesson::find($id);

        if (!$lesson) {

            return response()->json([
                'message' => 'Lesson not found'
            ], 404);
        }

        $course = Course::find($lesson->course_id);

        /*
        |--------------------------------------------------------------------------
        | Ownership Check
        |--------------------------------------------------------------------------
        */

        if ($course->teacher_id !== Auth::id()) {

            return response()->json([
                'message' => 'You do not own this lesson'
            ], 403);
        }

        /*
        |--------------------------------------------------------------------------
        | Validation
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'duration' => 'sometimes|integer|min:1',
            'order' => 'sometimes|integer|min:1',

            'video' => 'nullable|file|mimes:mp4,mov,avi|max:51200',

            'video_url' => 'nullable|string',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Update Video Upload
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('video')) {

            /*
            |--------------------------------------------------------------------------
            | Delete Old Video
            |--------------------------------------------------------------------------
            */

            if ($lesson->video_path) {

                Storage::disk('public')
                    ->delete($lesson->video_path);
            }

            $path = $request->file('video')
                ->store('lessons/videos', 'public');

            $validated['video_path'] = $path;

            $validated['video_url'] = asset(
                'storage/' . $path
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Update External URL
        |--------------------------------------------------------------------------
        */

        if ($request->filled('video_url')) {

            $validated['video_url']
                = $request->video_url;
        }

        /*
        |--------------------------------------------------------------------------
        | Update Lesson
        |--------------------------------------------------------------------------
        */

        $lesson->update($validated);

        return response()->json([
            'message' => 'Lesson updated successfully',
            'lesson' => $lesson,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE LESSON
    |--------------------------------------------------------------------------
    */

    public function show($id)
{
    $lesson = \App\Models\Lesson::with('quiz')->findOrFail($id);

    return response()->json($lesson);
}



    public function destroy($id)
    {
        $lesson = Lesson::find($id);

        if (!$lesson) {

            return response()->json([
                'message' => 'Lesson not found'
            ], 404);
        }

        $course = Course::find($lesson->course_id);

        /*
        |--------------------------------------------------------------------------
        | Ownership Check
        |--------------------------------------------------------------------------
        */

        if ($course->teacher_id !== Auth::id()) {

            return response()->json([
                'message' => 'You do not own this lesson'
            ], 403);
        }

        /*
        |--------------------------------------------------------------------------
        | Delete Video
        |--------------------------------------------------------------------------
        */

        if ($lesson->video_path) {

            Storage::disk('public')
                ->delete($lesson->video_path);
        }

        /*
        |--------------------------------------------------------------------------
        | Delete Lesson
        |--------------------------------------------------------------------------
        */

        $lesson->delete();

        return response()->json([
            'message' => 'Lesson deleted successfully'
        ]);
    }
}