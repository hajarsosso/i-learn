<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Certificate;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return response()->json([

            'total_users' =>
                User::count(),

            'total_students' =>
                User::where(
                    'role',
                    'student'
                )->count(),

            'total_teachers' =>
                User::where(
                    'role',
                    'teacher'
                )->count(),

            'total_courses' =>
                Course::count(),

            'total_enrollments' =>
                Enrollment::count(),

            'total_certificates' =>
                Certificate::count(),
        ]);
    }
}