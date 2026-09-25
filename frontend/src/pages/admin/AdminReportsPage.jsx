import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import {
  Users,
  GraduationCap,
  BookOpen,
  Award,
  ClipboardList,
  UserCheck,
  RefreshCw,
} from "lucide-react";

export default function AdminReportsPage() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axiosClient.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <div className="space-y-8">

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
          Plateforme i-Learn
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Vue d'ensemble des métriques clés.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

        <ReportCard
          title="Total Users"
          value={stats.users || 0}
          icon={<Users size={18} />}
          accent="bg-blue-500"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <ReportCard
          title="Students"
          value={stats.students || 0}
          icon={<GraduationCap size={18} />}
          accent="bg-green-500"
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />

        <ReportCard
          title="Teachers"
          value={stats.teachers || 0}
          icon={<UserCheck size={18} />}
          accent="bg-purple-500"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />

        <ReportCard
          title="Courses"
          value={stats.courses || 0}
          icon={<BookOpen size={18} />}
          accent="bg-amber-500"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />

        <ReportCard
          title="Enrollments"
          value={stats.enrollments || 0}
          icon={<ClipboardList size={18} />}
          accent="bg-rose-500"
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
        />

        <ReportCard
          title="Certificates"
          value={stats.certificates || 0}
          icon={<Award size={18} />}
          accent="bg-teal-500"
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
        />

      </div>
    </div>
  );
}

function ReportCard({ title, value, icon, accent, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">

      {/* Thin colored top bar */}
      <div className={`${accent} h-0.5`} />

      <div className="p-4">
        {/* Icon with soft tint */}
        <div className={`${iconBg} ${iconColor} w-9 h-9 rounded-lg flex items-center justify-center mb-3`}>
          {icon}
        </div>

        {/* Label */}
        <p className="text-xs text-gray-400 mb-1">{title}</p>

        {/* Value — your real data, untouched */}
        <p className="text-3xl font-semibold text-gray-900 leading-none">
          {value}
        </p>
      </div>

    </div>
  );
}