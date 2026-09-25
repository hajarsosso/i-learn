import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";

import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCertificate,
  FaClipboardList,
} from "react-icons/fa";

// ─── Stat Card ───────────────────────────────────────────────────────────────

const CARD_CONFIGS = [
  { key: "users",       title: "Total Users",   icon: FaUsers,              gradient: "from-blue-500 to-blue-600" },
  { key: "students",    title: "Students",      icon: FaUserGraduate,       gradient: "from-emerald-500 to-emerald-600" },
  { key: "teachers",    title: "Teachers",      icon: FaChalkboardTeacher,  gradient: "from-violet-500 to-violet-600" },
  { key: "courses",     title: "Courses",       icon: FaBook,               gradient: "from-orange-400 to-orange-500" },
  { key: "enrollments", title: "Enrollments",   icon: FaClipboardList,      gradient: "from-cyan-500 to-cyan-600" },
  { key: "certificates",title: "Certificates",  icon: FaCertificate,        gradient: "from-amber-400 to-amber-500" },
];

function StatCard({ title, value, icon: Icon, gradient, loading }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white shadow-sm`}>
      {/* Background icon watermark */}
      <div className="absolute -right-3 -bottom-3 opacity-10">
        <Icon className="text-8xl" />
      </div>

      <p className="text-sm font-medium opacity-80 mb-1">{title}</p>

      {loading ? (
        <div className="h-9 w-16 bg-white/20 rounded-lg animate-pulse mt-2" />
      ) : (
        <p className="text-4xl font-bold tracking-tight">{value ?? 0}</p>
      )}

      <div className="mt-4 flex items-center gap-1.5 opacity-80">
        <Icon className="text-sm" />
        <span className="text-xs font-medium">Total</span>
      </div>
    </div>
  );
}

// ─── Role Badge (shared with users page style) ────────────────────────────────

const ROLE_CONFIG = {
  admin:   { label: "Admin",   bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
  teacher: { label: "Teacher", bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-500"   },
  student: { label: "Student", bg: "bg-emerald-100",text: "text-emerald-700",dot: "bg-emerald-500" },
};

function RoleBadge({ role }) {
  const cfg = ROLE_CONFIG[role] ?? { label: role, bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── Course Status Badge ──────────────────────────────────────────────────────

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

// ─── Avatar ───────────────────────────────────────────────────────────────────

const AVATAR_COLORS = ["bg-violet-500","bg-blue-500","bg-emerald-500","bg-orange-400","bg-pink-500","bg-cyan-500"];

function Avatar({ name, size = "w-9 h-9" }) {
  const initials = name?.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() ?? "?";
  const color = AVATAR_COLORS[name?.charCodeAt(0) % AVATAR_COLORS.length ?? 0];
  return (
    <div className={`${size} ${color} rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0`}>
      {initials}
    </div>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-3 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-2.5 bg-gray-100 rounded w-1/2" />
      </div>
      <div className="h-6 w-16 bg-gray-100 rounded-full" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [stats, setStats]     = useState({});
  const [users, setUsers]     = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axiosClient.get("/admin/stats").then(res => setStats(res.data)),
      axiosClient.get("/admin/users").then(res => setUsers(res.data.slice(0, 5))),
      axiosClient.get("/admin/courses").then(res => setCourses(res.data.slice(0, 5))),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back — here's what's happening on i-Learn.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CARD_CONFIGS.map(cfg => (
          <StatCard
            key={cfg.key}
            title={cfg.title}
            value={stats[cfg.key]}
            icon={cfg.icon}
            gradient={cfg.gradient}
            loading={loading}
          />
        ))}
      </div>

      {/* Recent tables */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900">Recent Users</h2>
            <span className="text-xs text-gray-400">{users.length} shown</span>
          </div>

          <ul className="divide-y divide-gray-50 px-5">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <li key={i}><SkeletonRow /></li>)
              : users.length === 0
              ? <li className="py-12 text-center text-sm text-gray-400">No users yet.</li>
              : users.map(user => (
                <li key={user.id} className="flex items-center gap-3 py-3.5">
                  <Avatar name={user.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <RoleBadge role={user.role} />
                </li>
              ))
            }
          </ul>
        </div>

        {/* Recent Courses */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900">Recent Courses</h2>
            <span className="text-xs text-gray-400">{courses.length} shown</span>
          </div>

          <ul className="divide-y divide-gray-50 px-5">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <li key={i}><SkeletonRow /></li>)
              : courses.length === 0
              ? <li className="py-12 text-center text-sm text-gray-400">No courses yet.</li>
              : courses.map(course => (
                <li key={course.id} className="flex items-center gap-3 py-3.5">
                  {/* Course color swatch */}
                  <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-white text-xs font-bold
                    ${AVATAR_COLORS[course.title?.charCodeAt(0) % AVATAR_COLORS.length ?? 0]}`}>
                    {course.title?.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {course.teacher?.name ?? "No teacher"}
                    </p>
                  </div>

                  <StatusBadge status={course.status} />
                </li>
              ))
            }
          </ul>
        </div>

      </div>
    </div>
  );
}