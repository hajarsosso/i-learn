import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  BookOpen,
  GraduationCap,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">

      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

      <div>

        <p className="text-xs text-gray-400">
          {title}
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-0.5">
          {value}
        </h2>

      </div>

    </div>
  );
}

export default function TeacherReportsPage() {

  const [report, setReport] = useState(null);

  useEffect(() => {
  axiosClient.get("/teacher/reports").then((res) => {
    console.log(res.data);
    console.log(res.data.students_per_course);

    setReport(res.data);
  });
}, []);

  if (!report) {

    return (

      <div className="flex justify-center py-40">

        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-500"></div>

      </div>

    );

  }

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Rapports
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Statistiques sur votre activité d'enseignement.
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-5 gap-4">

        <StatCard

          title="Cours"

          value={report.total_courses}

          icon={<BookOpen size={18} className="text-blue-600" />}

          color="bg-blue-50"

        />

        <StatCard

          title="Étudiants"

          value={report.total_students}

          icon={<GraduationCap size={18} className="text-green-600" />}

          color="bg-green-50"

        />

        <StatCard

          title="Leçons"

          value={report.total_lessons}

          icon={<BookOpen size={18} className="text-purple-600" />}

          color="bg-purple-50"

        />

        <StatCard

          title="Quizzes"

          value={report.total_quizzes}

          icon={<ClipboardList size={18} className="text-orange-600" />}

          color="bg-orange-50"

        />

        <StatCard

          title="Progression moy."

          value={`${report.average_progress}%`}

          icon={<TrendingUp size={18} className="text-blue-600" />}

          color="bg-blue-50"

        />

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-5">

        {/* Students */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <h2 className="text-sm font-bold text-gray-900 mb-5">

            Étudiants par cours

          </h2>

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <BarChart
              data={report.students_per_course}
            >

              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />

              <XAxis dataKey="course" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />

              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />

              <Tooltip cursor={{ fill: "#fdf2f8" }} />

              <Bar
                dataKey="students"
                fill="#ec4899"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Lessons */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <h2 className="text-sm font-bold text-gray-900 mb-5">

            Leçons par cours

          </h2>

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <BarChart
              data={report.lessons_per_course}
            >

              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />

              <XAxis dataKey="course" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />

              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />

              <Tooltip cursor={{ fill: "#faf5ff" }} />

              <Bar
                dataKey="lessons"
                fill="#9333ea"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

        <h2 className="text-lg font-bold text-gray-900 mb-5">

          Résumé des cours

        </h2>

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-gray-100">

              <th className="text-left py-3 font-medium text-gray-400 text-xs uppercase tracking-wide">
                Cours
              </th>

              <th className="text-center font-medium text-gray-400 text-xs uppercase tracking-wide">
                Étudiants
              </th>

              <th className="text-center font-medium text-gray-400 text-xs uppercase tracking-wide">
                Leçons
              </th>

            </tr>

          </thead>

          <tbody>

            {report.students_per_course.map((course, index) => (

              <tr
                key={index}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
              >

                <td className="py-4 font-medium text-gray-900">

                  {course.course}

                </td>

                <td className="text-center text-gray-500">

                  {course.students}

                </td>

                <td className="text-center text-gray-500">

                  {report.lessons_per_course[index]?.lessons}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}