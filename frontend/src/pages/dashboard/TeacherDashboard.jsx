import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";

import TeacherStatCard from "../../components/dashboard/teacher/TeacherStatCard";
import TeacherProgressChart from "../../components/dashboard/teacher/TeacherProgressChart";
import TeacherRecentActivity from "../../components/dashboard/teacher/TeacherRecentActivity";
import TeacherCoursesCard from "../../components/dashboard/teacher/TeacherCoursesCard";
import TeacherStudentsCard from "../../components/dashboard/teacher/TeacherStudentsCard";
import TeacherQuizzesCard from "../../components/dashboard/teacher/TeacherQuizzesCard";

import { Link } from "react-router-dom";

import {
  BookOpen,
  Users,
  TrendingUp,
  ClipboardList,
  Plus,
} from "lucide-react";

export default function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axiosClient.get("/teacher/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboardData) {
    return (
      <div className="flex justify-center py-40">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-10">

      {/* HERO */}
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, Prof. {dashboardData.teacher_name} 👋
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Voici un aperçu de vos cours et de vos statistiques.
          </p>
        </div>

        <Link
          to="/teacher/courses/create"
          className="bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Créer un cours
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <TeacherStatCard
          icon={<BookOpen size={18} />}
          value={dashboardData.total_courses}
          label="Cours créés"
          color="purple"
        />

        <TeacherStatCard
          icon={<Users size={18} />}
          value={dashboardData.total_students}
          label="Étudiants"
          color="green"
        />

        <TeacherStatCard
          icon={<TrendingUp size={18} />}
          value={`${dashboardData.average_progress}%`}
          label="Progression moyenne"
          color="orange"
        />

        <TeacherStatCard
          icon={<ClipboardList size={18} />}
          value={dashboardData.total_quizzes}
          label="Quiz créés"
          color="blue"
        />
      </div>

      {/* CHART + CARDS */}
      <div className="grid grid-cols-3 gap-5 mt-5">
        <div className="col-span-2 space-y-5">
          <TeacherProgressChart data={dashboardData.students_per_course} />
          <TeacherCoursesCard courses={dashboardData.courses} />
        </div>

        <div className="space-y-5">
          <TeacherRecentActivity activities={dashboardData.recent_activity} />
          <TeacherStudentsCard students={dashboardData.recent_students} />
          <TeacherQuizzesCard quizzes={dashboardData.recent_quizzes} />
        </div>
      </div>

    </div>
  );
}