<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Http\Request;


class AdminController extends Controller
{
    public function stats()
{
    return response()->json([

        'users' => User::count(),

        'students' => User::where(
            'role',
            'student'
        )->count(),

        'teachers' => User::where(
            'role',
            'teacher'
        )->count(),

        'courses' => Course::count(),

        'enrollments' => \App\Models\Enrollment::count(),

        'certificates' => \App\Models\Certificate::count(),

    ]);
}

public function recentUsers()
{
    return response()->json(

        User::latest()
            ->take(5)
            ->get()

    );
}

public function recentCourses()
{
    return response()->json(

        Course::with('teacher')
            ->latest()
            ->take(5)
            ->get()

    );
}

    public function users()
    {
        return response()->json(
            User::latest()->get()
        );
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 'admin') {

            return response()->json([
                'message' => 'Cannot delete admin'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted'
        ]);
    }

    public function updateRole(Request $request, $id)
{
    $request->validate([
        'role' => 'required|in:student,teacher,admin'
    ]);

    $user = User::findOrFail($id);

    // Prevent removing your own admin role
    if (
        auth()->id() === $user->id &&
        $request->role !== 'admin'
    ) {
        return response()->json([
            'message' => 'You cannot remove your own admin role.'
        ], 403);
    }

    $user->update([
        'role' => $request->role
    ]);

    return response()->json([
        'message' => 'Role updated',
        'user' => $user
    ]);
}

    public function pendingCourses()
{
    return response()->json(

        Course::with([
            'teacher',
            'category'
        ])

        ->where('status', 'pending')

        ->latest()

        ->get()

    );
}

public function approveCourse($id)
{
    $course = Course::findOrFail($id);

    $course->update([
        'status' => 'published'
    ]);

    return response()->json([
        'message' => 'Course approved'
    ]);
}

public function rejectCourse($id)
{
    $course = Course::findOrFail($id);

    $course->update([
        'status' => 'rejected'
    ]);

    return response()->json([
        'message' => 'Course rejected'
    ]);
}

public function courses()
{
    return response()->json(
        Course::with(['teacher', 'category'])
            ->latest()
            ->get()
    );
}

public function course($id)
{
    $course = Course::with([

        'teacher',

        'category',

        'lessons.quiz.questions'

    ])
    ->findOrFail($id);

    return response()->json($course);
}

public function deleteCourse($id)
{
    $course = Course::findOrFail($id);

    $course->delete();

    return response()->json([
        'message' => 'Course deleted'
    ]);
}
}
