import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AVATAR_COLORS = [
  "bg-violet-500","bg-blue-500","bg-emerald-500",
  "bg-orange-400","bg-pink-500","bg-cyan-500",
];



function CourseAvatar({ title }) {
  const color = AVATAR_COLORS[title?.charCodeAt(0) % AVATAR_COLORS.length ?? 0];
  return (
    <div className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center text-white text-sm font-bold ${color}`}>
      {title?.slice(0, 2).toUpperCase() ?? "??"}
    </div>
  );
}

function TeacherAvatar({ name }) {
  const initials = name?.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() ?? "?";
  const color = AVATAR_COLORS[name?.charCodeAt(0) % AVATAR_COLORS.length ?? 0];
  return (
    <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
      {initials}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-gray-100 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-2/5" />
          <div className="h-3 bg-gray-100 rounded w-1/4" />
          <div className="h-3 bg-gray-100 rounded w-3/5 mt-3" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-gray-100 rounded-xl" />
          <div className="h-9 w-24 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function AdminCoursesPage() {
  const [courses, setCourses]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [approvingId, setAppId] = useState(null);
  const [rejectingId, setRejId] = useState(null);
  const [search, setSearch]     = useState("");

  const navigate = useNavigate();

  const fetchCourses = () => {
    setLoading(true);
    axiosClient
      .get("/admin/pending-courses")
      .then(res => setCourses(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const approve = async (id) => {
    setAppId(id);
    await axiosClient.put(`/admin/courses/${id}/approve`);
    setAppId(null);
    fetchCourses();
  };

  const reject = async (id) => {
    setRejId(id);
    await axiosClient.put(`/admin/courses/${id}/reject`);
    setRejId(null);
    fetchCourses();
  };

  const filtered = courses.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.teacher?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Courses</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {loading ? "Loading…" : `${courses.length} course${courses.length !== 1 ? "s" : ""} awaiting review`}
          </p>
        </div>

        {/* Pending count pill */}
        {!loading && courses.length > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            {courses.length} pending
          </span>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by title or teacher…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* Cards */}
      <div className="grid gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-gray-500 font-medium">
              {search ? "No courses match your search." : "All caught up — no pending courses."}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {!search && "New submissions will appear here."}
            </p>
          </div>
        ) : (
          filtered.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">

                {/* Course avatar */}
                <CourseAvatar title={course.title} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 truncate">{course.title}</h2>

                  <div className="flex items-center gap-1.5 mt-1">
                    <TeacherAvatar name={course.teacher?.name} />
                    <span className="text-xs text-gray-500">{course.teacher?.name ?? "Unknown teacher"}</span>
                  </div>

                  {course.description && (
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">{course.description}</p>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    {course.category?.name && (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                        {course.category.name}
                      </span>
                    )}
                    {course.created_at && (
                      <span className="text-xs text-gray-400">
                        Submitted {new Date(course.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">

                      <button
    onClick={() => navigate(`/admin/courses/${course.id}`)}
    className="
      inline-flex
      items-center
      justify-center
      px-4
      py-2
      bg-blue-600
      hover:bg-blue-700
      text-white
      rounded-xl
      font-semibold
      text-sm
    "
  >
    View Course
  </button>

                    <button
                    onClick={() => approve(course.id)}
                    disabled={approvingId === course.id || rejectingId === course.id}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    {approvingId === course.id ? (
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    Approve
                  </button>



</div>

                  <button
                    onClick={() => reject(course.id)}
                    disabled={rejectingId === course.id || approvingId === course.id}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-red-50 disabled:opacity-50 text-red-600 border border-red-200 hover:border-red-300 text-sm font-semibold rounded-xl transition-colors"
                  >
                    {rejectingId === course.id ? (
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    Reject
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer count */}
      {!loading && filtered.length > 0 && (
        <p className="text-xs text-gray-400 text-center">
          Showing {filtered.length} of {courses.length} pending courses
        </p>
      )}

    </div>
  );
}