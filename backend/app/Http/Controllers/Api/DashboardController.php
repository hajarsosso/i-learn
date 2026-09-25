<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\QuizAttempt;
use App\Models\Quiz;


class DashboardController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | STUDENT DASHBOARD
    |--------------------------------------------------------------------------
    */

    public function studentDashboard()
    {
        $studentId = Auth::id();

        /*
        |--------------------------------------------------------------------------
        | ENROLLED COURSES
        |--------------------------------------------------------------------------
        */

        $enrollments = Enrollment::with([
            'course.teacher',
            'course.category',
            'course.lessons'
        ])
            ->where('student_id', $studentId)
            ->get();

        $courses = [];

        $nextQuiz = null;

        $completedCourses = 0;

        $studyMinutes = 0;

        foreach ($enrollments as $enrollment) {


            $course = $enrollment->course;

            $totalLessons = $course->lessons->count();

            $lessonIds = $course->lessons->pluck('id');

            $completedLessonProgress = LessonProgress::where('student_id', $studentId)
                ->whereIn('lesson_id', $lessonIds)
                ->where('completed', true)
                ->get();

            $completedLessons = $completedLessonProgress->count();

            $progressPercent = 0;

            if ($totalLessons > 0) {
                $progressPercent = round(
                    ($completedLessons / $totalLessons) * 100
                );
                if ($progressPercent == 100) {

                    $completedCourses++;
                }

                foreach ($course->lessons as $lesson) {

                    if (
                        $completedLessonProgress
                        ->where('lesson_id', $lesson->id)
                        ->count()
                    ) {

                        $studyMinutes += $lesson->duration ?? 0;
                    }
                }
            }

            if ($nextQuiz === null) {

                foreach ($course->lessons as $lesson) {

                    if (!$lesson->quiz) {
                        continue;
                    }

                    $alreadyAttempted = QuizAttempt::where(
                        'student_id',
                        $studentId
                    )
                        ->where(
                            'quiz_id',
                            $lesson->quiz->id
                        )
                        ->exists();

                    if (!$alreadyAttempted) {

                        $nextQuiz = [
                            'id' => $lesson->quiz->id,
                            'title' => $lesson->quiz->title,
                            'course' => $course->title,
                        ];

                        break;
                    }
                }
            }

            $courses[] = [
                'course_id' => $course->id,
                'title' => $course->title,
                'thumbnail' => asset('storage/' . $course->thumbnail),
                'teacher' => $course->teacher->name,
                'category' => $course->category->name,
                'lessons_count' => $totalLessons,
                'progress_percent' => $progressPercent,
            ];
        }

        $averageProgress = count($courses)
            ? round(
                collect($courses)
                    ->avg('progress_percent')
            )
            : 0;

        $studyHours = round($studyMinutes / 60, 1);

        /*
        |--------------------------------------------------------------------------
        | QUIZ ATTEMPTS
        |--------------------------------------------------------------------------
        */

        $quizAttempts = QuizAttempt::with('quiz')
            ->where('student_id', $studentId)
            ->latest()
            ->get();



        $activities = [];

        /*
|--------------------------------------------------------------------------
| Completed lessons
|--------------------------------------------------------------------------
*/

        $lessonActivities = LessonProgress::with('lesson.course')
            ->where('student_id', $studentId)
            ->where('completed', true)
            ->latest()
            ->take(5)
            ->get();

        foreach ($lessonActivities as $lesson) {

            $activities[] = [

                'title' => 'Lesson completed',

                'subtitle' => $lesson->lesson->title,

                'time' => $lesson->updated_at->diffForHumans(),

                'date' => $lesson->updated_at,
            ];
        }

        /*
|--------------------------------------------------------------------------
| Quiz attempts
|--------------------------------------------------------------------------
*/

        $quizActivities = QuizAttempt::with('quiz')
            ->where('student_id', $studentId)
            ->latest()
            ->take(5)
            ->get();

        foreach ($quizActivities as $attempt) {

            $activities[] = [

                'title' => 'Quiz completed',

                'subtitle' =>
                $attempt->quiz->title .
                    ' (' .
                    $attempt->percentage .
                    '%)',

                'time' =>
                $attempt->created_at->diffForHumans(),

                'date' =>
                $attempt->created_at,
            ];
        }

        $activities = collect($activities)
            ->sortByDesc('date')
            ->take(6)
            ->values();

        return response()->json([
            'student_id' => $studentId,

            'enrolled_courses_count' => count($courses),

            'completed_courses_count' => $completedCourses,

            'average_progress' => $averageProgress,

            'study_time_hours' => $studyHours,

            'next_quiz' => $nextQuiz,

            'courses' => $courses,

            'quiz_attempts' => $quizAttempts,

            'activities' => $activities,


        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | TEACHER DASHBOARD
    |--------------------------------------------------------------------------
    */

    public function teacherDashboard()
    {
        $teacherId = Auth::id();

        /*
    |--------------------------------------------------------------------------
    | Teacher courses
    |--------------------------------------------------------------------------
    */

        $courses = Course::with([
            'category',
            'lessons',
        ])
            ->withCount('enrollments')
            ->where('teacher_id', $teacherId)
            ->latest()
            ->get();

        /*
    |--------------------------------------------------------------------------
    | Basic stats
    |--------------------------------------------------------------------------
    */

        $totalCourses = $courses->count();

        $totalLessons = Lesson::whereHas('course', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })->count();

        $totalStudents = Enrollment::whereHas('course', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })->distinct('student_id')
            ->count('student_id');

        /*
    |--------------------------------------------------------------------------
    | Total quizzes
    |--------------------------------------------------------------------------
    */

        $totalQuizzes = \App\Models\Quiz::whereHas('lesson.course', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })->count();

        /*
    |--------------------------------------------------------------------------
    | Average Progress
    |--------------------------------------------------------------------------
    */

        $averageProgress = LessonProgress::whereHas('lesson.course', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })->avg('progress_percent');

        $averageProgress = round($averageProgress ?? 0);

        /*
    |--------------------------------------------------------------------------
    | Recent Students
    |--------------------------------------------------------------------------
    */

        $recentStudents = Enrollment::with('student')
            ->whereHas('course', function ($query) use ($teacherId) {
                $query->where('teacher_id', $teacherId);
            })
            ->latest()
            ->take(4)
            ->get()
            ->map(function ($enrollment) {

                return [
                    'name' => $enrollment->student->name,
                    'email' => $enrollment->student->email,
                ];
            });

        /*
    |--------------------------------------------------------------------------
    | Recent Quizzes
    |--------------------------------------------------------------------------
    */

        $recentQuizzes = \App\Models\Quiz::with('lesson.course')
            ->whereHas('lesson.course', function ($query) use ($teacherId) {
                $query->where('teacher_id', $teacherId);
            })
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($quiz) {

                return [
                    'title' => $quiz->title,
                    'course' => $quiz->lesson->course->title,
                    'updated_at' => $quiz->updated_at->diffForHumans(),
                ];
            });

        /*
    |--------------------------------------------------------------------------
    | Recent Activity
    |--------------------------------------------------------------------------
    */

        $recentActivity = [];

        foreach ($courses->take(4) as $course) {

            $recentActivity[] = [
                'title' => 'Course Updated',
                'description' => $course->title,
                'time' => $course->updated_at->diffForHumans(),
            ];
        }

        /*
    /*
|--------------------------------------------------------------------------
| Students per course
|--------------------------------------------------------------------------
*/

        $studentsPerCourse = $courses->map(function ($course) {

            return [

                'course' => $course->title,

                'students' => $course->enrollments_count,

            ];
        });

        /*
    |--------------------------------------------------------------------------
    | Courses list
    |--------------------------------------------------------------------------
    */

        $teacherCourses = $courses->map(function ($course) {

            return [
                'id' => $course->id,

                'title' => $course->title,

                'thumbnail' => $course->thumbnail_url,

                'students' => $course->enrollments_count,

                'lessons' => $course->lessons->count(),

                'quizzes' => Quiz::whereHas('lesson', function ($q) use ($course) {
                    $q->where('course_id', $course->id);
                })->count(),

                'created_at' => $course->created_at->format('d M Y'),
            ];
        });

        return response()->json([

            'teacher_name' => Auth::user()->name,

            'total_courses' => $totalCourses,

            'total_students' => $totalStudents,

            'average_progress' => $averageProgress,

            'total_quizzes' => $totalQuizzes,

            'courses' => $teacherCourses,

            'recent_students' => $recentStudents,

            'recent_quizzes' => $recentQuizzes,

            'recent_activity' => $recentActivity,

            'students_per_course' => $studentsPerCourse,
        ]);
    }


    public function profile()
    {
        $user = Auth::user();

        $enrolledCourses = Enrollment::where('student_id', $user->id)->count();

        $completedCourses = 0;

        $enrollments = Enrollment::with('course.lessons')
            ->where('student_id', $user->id)
            ->get();

        foreach ($enrollments as $enrollment) {

            $lessonIds = $enrollment->course->lessons->pluck('id');

            $completedLessons = LessonProgress::where('student_id', $user->id)
                ->whereIn('lesson_id', $lessonIds)
                ->where('completed', true)
                ->count();

            if (
                $enrollment->course->lessons->count() > 0 &&
                $completedLessons == $enrollment->course->lessons->count()
            ) {
                $completedCourses++;
            }
        }

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'role' => ucfirst($user->role),
            'joined_at' => $user->created_at->format('d M Y'),

            'stats' => [
                'enrolled_courses' => $enrolledCourses,
                'completed_courses' => $completedCourses,
                'quiz_attempts' => QuizAttempt::where('student_id', $user->id)->count(),
                'certificates' => \App\Models\Certificate::where('student_id', $user->id)->count(),
            ]
        ]);
    }

    public function teacherCourses()
    {
        $teacherId = Auth::id();

        $courses = Course::with([
            'category',
            'lessons',
        ])
            ->withCount('enrollments')
            ->where('teacher_id', $teacherId)
            ->latest()
            ->get()
            ->map(function ($course) {

                return [

                    'id' => $course->id,

                    'title' => $course->title,

                    'thumbnail' => asset('storage/' . $course->thumbnail),

                    'category' => $course->category->name,

                    'students' => $course->enrollments_count,

                    'lessons' => $course->lessons->count(),

                    'created_at' => $course->created_at->format('d M Y')

                ];
            });

        return response()->json($courses);
    }


    public function teacherStudents()
    {
        $teacherId = Auth::id();

        $students = Enrollment::with([
            'student',
            'course.lessons'
        ])
            ->whereHas('course', function ($query) use ($teacherId) {
                $query->where('teacher_id', $teacherId);
            })
            ->latest()
            ->get()
            ->groupBy('student_id')
            ->map(function ($enrollments) {

                $student = $enrollments->first()->student;

                $totalLessons = 0;
                $completedLessons = 0;

                foreach ($enrollments as $enrollment) {

                    $lessonIds = $enrollment
                        ->course
                        ->lessons
                        ->pluck('id');

                    $totalLessons += $lessonIds->count();

                    $completedLessons += LessonProgress::where(
                        'student_id',
                        $student->id
                    )
                        ->whereIn('lesson_id', $lessonIds)
                        ->where('completed', true)
                        ->count();
                }

                $progress = $totalLessons
                    ? round(($completedLessons / $totalLessons) * 100)
                    : 0;

                $averageQuiz = QuizAttempt::where(
                    'student_id',
                    $student->id
                )->avg('percentage');

                return [

                    'id' => $student->id,

                    'name' => $student->name,

                    'email' => $student->email,

                    'courses' => $enrollments->pluck('course.title'),

                    'courses_count' => $enrollments->count(),

                    'progress' => $progress,

                    'average_quiz' => round($averageQuiz ?? 0),

                    'joined' => $student->created_at->format('d M Y'),

                ];
            })
            ->values();

        return response()->json($students);
    }


    public function teacherQuizzes()
    {
        $teacherId = Auth::id();

        $quizzes = Quiz::with([
            'lesson.course',
            'attempts'
        ])
            ->whereHas('lesson.course', function ($query) use ($teacherId) {
                $query->where('teacher_id', $teacherId);
            })
            ->latest()
            ->get()
            ->map(function ($quiz) {

                return [

                    'id' => $quiz->id,

                    'title' => $quiz->title,

                    'course' => $quiz->lesson->course->title,

                    'lesson' => $quiz->lesson->title,

                    'attempts' => $quiz->attempts->count(),

                    'average_score' => round(
                        $quiz->attempts->avg('percentage') ?? 0
                    ),

                ];
            });

        return response()->json($quizzes);
    }
    public function teacherReports()
    {
        $teacherId = Auth::id();

        $courses = Course::with([
    'lessons'
])
->withCount('enrollments')
->where('teacher_id', $teacherId)
->get();

        $totalCourses = $courses->count();

        $totalLessons = $courses->sum(function ($course) {
            return $course->lessons->count();
        });

        $totalStudents = Enrollment::whereHas('course', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })
            ->distinct('student_id')
            ->count('student_id');

        $totalQuizzes = \App\Models\Quiz::whereHas('lesson.course', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })->count();

        $averageProgress = LessonProgress::whereHas('lesson.course', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })->avg('progress_percent');

        $studentsPerCourse = $courses->map(function ($course) {

            return [

                'course' => $course->title,

                'students' => $course->enrollments_count,

            ];
        });

        $lessonsPerCourse = $courses->map(function ($course) {

            return [

                'course' => $course->title,

                'lessons' => $course->lessons->count()

            ];
        });

        return response()->json([

            'total_courses' => $totalCourses,

            'total_students' => $totalStudents,

            'total_lessons' => $totalLessons,

            'total_quizzes' => $totalQuizzes,

            'average_progress' => round($averageProgress ?? 0),

            'students_per_course' => $studentsPerCourse,

            'lessons_per_course' => $lessonsPerCourse,

        ]);
    }
}
