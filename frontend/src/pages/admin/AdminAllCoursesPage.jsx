import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { Link } from "react-router-dom";

const AVATAR_COLORS = [
  "bg-violet-500","bg-blue-500","bg-emerald-500",
  "bg-orange-400","bg-pink-500","bg-cyan-500",
];

const STATUS_CONFIG = {
  published: { label: "Published", bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  pending:   { label: "Pending",   bg: "bg-amber-100",   text: "text-amber-700",   dot: "bg-amber-500"   },
  draft:     { label: "Draft",     bg: "bg-gray-100",    text: "text-gray-600",    dot: "bg-gray-400"    },
  rejected:  { label: "Rejected",  bg: "bg-red-100",     text: "text-red-700",     dot: "bg-red-500"     },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function CourseAvatar({ title }) {
  const color = AVATAR_COLORS[title?.charCodeAt(0) % AVATAR_COLORS.length ?? 0];
  return (
    <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-white text-xs font-bold ${color}`}>
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

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-50 animate-pulse">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gray-100 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3 bg-gray-100 rounded w-36" />
            <div className="h-2.5 bg-gray-100 rounded w-24" />
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-100" />
          <div className="h-3 bg-gray-100 rounded w-24" />
        </div>
      </td>
      <td className="px-5 py-4"><div className="h-6 w-20 bg-gray-100 rounded-full" /></td>
      <td className="px-5 py-4"><div className="h-3 w-8 bg-gray-100 rounded ml-auto" /></td>
    </tr>
  );
}

const STATUSES = ["all", "published", "pending", "draft", "rejected"];

export default function AdminAllCoursesPage() {
  const [courses, setCourses]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("all");

  useEffect(() => {
    axiosClient.get("/admin/courses")
      .then(res => setCourses(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter(c => {
    const matchSearch =
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher?.name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Count per status for filter tabs
  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = s === "all" ? courses.length : courses.filter(c => c.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Courses</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {loading ? "Loading…" : `${courses.length} course${courses.length !== 1 ? "s" : ""} total`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
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

        {/* Status tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === s
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {s === "all" ? "All" : s}
              {counts[s] > 0 && (
                <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${
                  statusFilter === s ? "bg-gray-100 text-gray-600" : "bg-gray-200 text-gray-500"
                }`}>
                  {counts[s]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
            </tbody>
          </table>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            {search || statusFilter !== "all"
              ? "No courses match your filters."
              : "No courses found."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Teacher</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(course => (
                <tr key={course.id} className="hover:bg-gray-50/60 transition-colors group">

                  {/* Course */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <CourseAvatar title={course.title} />
                      <div className="min-w-0">
                        <Link
                          to={`/admin/courses/${course.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600 transition-colors truncate block"
                        >
                          {course.title}
                        </Link>
                        {course.category?.name && (
                          <span className="text-xs text-gray-400">{course.category.name}</span>
                        )}
                        {/* Teacher shown inline on mobile */}
                        <p className="text-xs text-gray-400 sm:hidden mt-0.5">{course.teacher?.name}</p>
                      </div>
                    </div>
                  </td>

                  {/* Teacher */}
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <TeacherAvatar name={course.teacher?.name} />
                      <span className="text-gray-600 text-sm">{course.teacher?.name ?? "—"}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={course.status} />
                  </td>

                  {/* View link */}
                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/admin/courses/${course.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Footer */}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-50 text-xs text-gray-400">
            Showing {filtered.length} of {courses.length} courses
          </div>
        )}
      </div>

    </div>
  );
}