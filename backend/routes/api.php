<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\ProgressController;
use App\Http\Controllers\Api\LessonCompletionController;
use App\Http\Controllers\Api\CourseProgressController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\AdminController;


/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get(
    '/student/profile',
    [DashboardController::class, 'profile']
);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/courses', [CourseController::class, 'index']);

Route::middleware('auth:sanctum')->get(
    '/courses/{id}',
    [CourseController::class, 'show']
);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/quizzes/{id}', [QuizController::class, 'show'])
    ->whereNumber('id');
/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('admin')
    ->middleware(['auth:sanctum', 'admin'])
    ->group(function () {

        Route::get('/stats', [AdminController::class, 'stats']);

        Route::get('/users', [AdminController::class, 'users']);

        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);

        Route::put('/users/{id}/role', [AdminController::class, 'updateRole']);

        Route::get('/pending-courses', [AdminController::class, 'pendingCourses']);

        Route::get('/courses', [AdminController::class, 'courses']);

        Route::put('/courses/{id}/approve', [AdminController::class, 'approveCourse']);

        Route::put('/courses/{id}/reject', [AdminController::class, 'rejectCourse']);

        Route::get('/courses/{id}', [AdminController::class, 'course']);

        Route::delete('/courses/{id}', [AdminController::class, 'deleteCourse']);

        Route::get('/recent-users', [AdminController::class, 'recentUsers']);

        Route::get('/recent-courses', [AdminController::class, 'recentCourses']);

        Route::post('/categories', [CategoryController::class, 'store']);

        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    });

    Route::get(
        '/certificates',
        [CertificateController::class, 'myCertificates']
    );

    Route::post(
        '/certificates/{courseId}',
        [CertificateController::class, 'generate']
    );

    Route::get(
        '/certificates/{courseId}',
        [CertificateController::class, 'download']
    );

    Route::delete(
        '/enrollments/{courseId}',
        [EnrollmentController::class, 'destroy']
    );

    /*
    |--------------------------------------------------------------------------
    | USER
    |--------------------------------------------------------------------------
    */

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);


    /*
    |--------------------------------------------------------------------------
    | STUDENT ROUTES
    |--------------------------------------------------------------------------
    */



    /*
|--------------------------------------------------------------------------
| DASHBOARDS
|--------------------------------------------------------------------------
*/

    Route::get('/student/dashboard', [
        DashboardController::class,
        'studentDashboard'
    ]);

    Route::middleware('role:teacher')->group(function () {

        Route::get('/teacher/dashboard', [
            DashboardController::class,
            'teacherDashboard'
        ]);
    });

    /*
    |--------------------------------------------------------------------------
    | ENROLLMENTS
    |--------------------------------------------------------------------------
    */

    Route::post('/enrollments', [EnrollmentController::class, 'store']);

    Route::get('/my-courses', [
        EnrollmentController::class,
        'myCourses'
    ]);

    /*
    |--------------------------------------------------------------------------
    | LESSON PROGRESS
    |--------------------------------------------------------------------------
    */

    Route::post('/progress', [ProgressController::class, 'updateProgress']);


    /*
    |--------------------------------------------------------------------------
    | LESSON COMPLETION
    |--------------------------------------------------------------------------
    */

    Route::post('/lessons/complete', [
        LessonCompletionController::class,
        'complete'
    ]);

    Route::post('/lessons/incomplete', [
        LessonCompletionController::class,
        'incomplete'
    ]);

    /*
|--------------------------------------------------------------------------
| COURSE PROGRESS
|--------------------------------------------------------------------------
*/

    Route::get('/courses/{id}/progress', [
        CourseProgressController::class,
        'show'
    ]);


    /*
    |--------------------------------------------------------------------------
    | QUIZZES
    |--------------------------------------------------------------------------
    */

    Route::post('/quizzes/submit', [QuizController::class, 'submit']);

    Route::get('/my-quiz-attempts', [QuizController::class, 'myAttempts']);




    /*
    |--------------------------------------------------------------------------
    | TEACHER ROUTES
    |--------------------------------------------------------------------------
    */

    Route::middleware('role:teacher')->group(function () {

        /*
        |--------------------------------------------------------------------------
        | COURSES
        |--------------------------------------------------------------------------
        */

        Route::post('/courses', [CourseController::class, 'store']);

        Route::put('/courses/{id}', [CourseController::class, 'update']);

        Route::delete('/courses/{id}', [CourseController::class, 'destroy']);


        /*
        |--------------------------------------------------------------------------
        | LESSONS
        |--------------------------------------------------------------------------
        */

        Route::post('/lessons', [LessonController::class, 'store']);

        Route::put('/lessons/{id}', [LessonController::class, 'update']);

        Route::get('/lessons/{id}', [LessonController::class, 'show']);

        Route::delete('/lessons/{id}', [LessonController::class, 'destroy']);


        /*
        |--------------------------------------------------------------------------
        | QUIZZES
        |--------------------------------------------------------------------------
        */

        Route::post('/quizzes', [QuizController::class, 'store']);

        Route::put('/quizzes/{id}', [
            QuizController::class,
            'update'
        ]);
        Route::delete('/quizzes/{id}', [QuizController::class, 'destroy']);

        Route::get('/quizzes/{id}/attempts', [
            QuizController::class,
            'attempts'
        ]);



        /*
        |--------------------------------------------------------------------------
        | QUESTIONS
        |--------------------------------------------------------------------------
        */


        Route::post('/questions', [QuestionController::class, 'store']);

        Route::delete('/questions/{id}', [QuestionController::class, 'destroy']);


        Route::put('/questions/{id}', [
            QuestionController::class,
            'update'
        ]);

        /*
        |--------------------------------------------------------------------------
        | CATEGORIES
        |--------------------------------------------------------------------------
        */

        Route::post('/categories', [CategoryController::class, 'store']);
    });

    Route::middleware('auth:sanctum')->get(
    '/teacher/courses',
    [DashboardController::class,'teacherCourses']
);

Route::middleware('auth:sanctum')->get(
    '/teacher/students',
    [DashboardController::class,'teacherStudents']
);

Route::middleware('auth:sanctum')->get(
    '/teacher/quizzes',
    [DashboardController::class,'teacherQuizzes']
);
Route::middleware('auth:sanctum')->get(
    '/teacher/reports',
    [DashboardController::class, 'teacherReports']
);

});
