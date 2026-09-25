import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios";

function CourseDetailsPage() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const response = await axiosClient.get(`/courses/${id}`);
      const courseData = response.data.data;
      setCourse(courseData);
      setCompletedLessons(courseData.completed_lessons || []);
      if (courseData.lessons && courseData.lessons.length > 0) {
        setCurrentLesson(courseData.lessons[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async () => {
    try {
      await axiosClient.post("/lessons/complete", {
        lesson_id: currentLesson.id,
      });
      setCompletedLessons((prev) => {
        if (prev.includes(currentLesson.id)) return prev;
        return [...prev, currentLesson.id];
      });
      fetchCourse();
    } catch (error) {
      console.log(error);
      alert("Failed to update lesson.");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
          <p className="text-slate-500 font-medium">Loading course…</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="text-center">
          <p className="text-5xl mb-4">📭</p>
          <h2 className="text-2xl font-bold text-slate-800">Course not found</h2>
          <Link to="/student/courses" className="mt-4 inline-block text-indigo-600 hover:underline">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const progressPercent = course.progress_percent ?? 0;

  return (
    <div className="bg-slate-100 min-h-screen py-6">

      {/* ── Hero Banner — bleeds full width ── */}
      <div
        className="relative overflow-hidden -mx-10 -mt-10"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)" }}
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        <div className="relative px-10 py-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-6">
            <Link to="/student/courses" className="text-indigo-300 hover:text-white transition font-medium flex items-center gap-1">
              ← Courses
            </Link>
            <span className="text-indigo-600">/</span>
            <Link to="/student/my-courses" className="text-indigo-300/70 hover:text-white transition">My Courses</Link>
            <span className="text-indigo-600">/</span>
            <Link to="/student/dashboard" className="text-indigo-300/70 hover:text-white transition">Dashboard</Link>
          </nav>

          {/* Hero content */}
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-200 bg-white/10 border border-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                  👨‍🏫 {course.teacher?.name}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-200 bg-white/10 border border-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                  📚 {course.lessons_count} lessons
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-200 bg-white/10 border border-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                  ⏱️ {course.total_duration} min
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-3">
                {course.title}
              </h1>

              <p className="text-indigo-200 text-sm leading-relaxed max-w-xl mb-6">
                {course.description}
              </p>

              {/* Progress */}
              <div className="max-w-sm">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-indigo-300">
                    {completedLessons.length} of {course.lessons_count} lessons completed
                  </span>
                  <span className="font-mono font-bold text-emerald-400">{progressPercent}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPercent}%`,
                      background: "linear-gradient(90deg, #818cf8, #34d399)"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            {course.thumbnail_url && (
              <div className="shrink-0 lg:w-64">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full rounded-2xl shadow-2xl object-cover ring-1 ring-white/20"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto  py-8">
        <div className="grid lg:grid-cols-3 gap-6 items-start">

          {/* ── Video + Lesson Info ── */}
          <div className="lg:col-span-2">
            {currentLesson ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                {/* Video */}
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={currentLesson.video_url.replace("watch?v=", "embed/")}
                    title={currentLesson.title}
                    allowFullScreen
                    className="block"
                  />
                </div>

                {/* Lesson info */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">
                      {currentLesson.title}
                    </h2>
                    <span className="shrink-0 text-xs font-mono bg-slate-100 text-slate-500 rounded-lg px-2.5 py-1.5">
                      {currentLesson.duration} min
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 font-semibold uppercase tracking-widest">
                    Lesson {currentLesson.order}
                  </p>

                  <p className="text-slate-600 leading-7 text-sm">
                    {currentLesson.content}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-slate-100">
                    <button
                      onClick={markLessonComplete}
                      disabled={completedLessons.includes(currentLesson.id)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        completedLessons.includes(currentLesson.id)
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5"
                      }`}
                    >
                      {completedLessons.includes(currentLesson.id) ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Lesson Completed
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </button>

                    {currentLesson.quiz && (
                      <button
                        onClick={() => navigate(`/student/quizzes/${currentLesson.quiz.id}`)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-200 hover:-translate-y-0.5 transition-all"
                      >
                        Take Quiz
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
                Select a lesson to get started
              </div>
            )}
          </div>

          {/* ── Lesson Sidebar ── */}
          <div className="sticky top-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">Course Content</h2>
                <span className="text-xs font-mono bg-slate-100 text-slate-500 rounded-full px-2.5 py-0.5">
                  {completedLessons.length}/{course.lessons_count}
                </span>
              </div>

              <div className="max-h-[68vh] overflow-y-auto">
                {course.lessons?.map((lesson, idx) => {
                  const isActive = currentLesson?.id === lesson.id;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(lesson)}
                      className={`w-full text-left px-5 py-4 flex items-start gap-3 transition-colors group border-b border-slate-50 last:border-0 ${
                        isActive ? "bg-indigo-50" : "hover:bg-slate-50"
                      }`}
                    >
                      {/* Node + connector */}
                      <div className="flex flex-col items-center gap-0.5 shrink-0 mt-0.5">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isDone
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : isActive
                              ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                              : "border-slate-300 text-slate-400 group-hover:border-indigo-300"
                          }`}
                        >
                          {isDone ? (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="font-mono text-[10px] font-bold leading-none">
                              {String(lesson.order).padStart(2, "0")}
                            </span>
                          )}
                        </div>
                        {idx < course.lessons.length - 1 && (
                          <div className={`w-0.5 h-5 rounded-full ${isDone ? "bg-emerald-300" : "bg-slate-200"}`} />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 pb-1">
                        <p className={`text-sm font-semibold leading-snug ${isActive ? "text-indigo-700" : "text-slate-800"}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono">{lesson.duration} min</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CourseDetailsPage;