import { useEffect, useState } from "react";

import axios from "axios";

import { Trophy, ChevronRight } from "lucide-react";


import StatCard from "../../components/dashboard/StatCard";

import ContinueLearningCard from "../../components/dashboard/ContinueLearningCard";

import QuizCard from "../../components/dashboard/QuizCard";

import CourseProgressCard from "../../components/dashboard/CourseProgressCard";

import ActivityCard from "../../components/dashboard/ActivityCard";

import ProgressChart from "../../components/dashboard/ProgressChart";

import { Link } from "react-router-dom";

import { FaBookOpen, FaCheckCircle, FaTrophy, FaClock } from "react-icons/fa";

export default function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://127.0.0.1:8000/api/student/dashboard",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setDashboardData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
<>      

        {/* TITLE */}

        <div className="mt-10">
          <h1 className="text-5xl font-bold text-[#111827]">Bonjour</h1>

          <p className="text-gray-500 mt-3 text-lg">
            Continuez votre apprentissage et atteignez vos objectifs.
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              to="/student/courses"
              className="
      bg-blue-600
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
      hover:bg-blue-700
    "
            >
              Browse Courses
            </Link>

            <Link
              to="/student/my-courses"
              className="
      border
      border-gray-300
      px-6
      py-3
      rounded-xl
      font-semibold
      hover:bg-gray-100
    "
            >
              My Courses
            </Link>

            <Link
              to="/student/certificates"
              className="
    border
    border-gray-300
    px-6
    py-3
    rounded-xl
    font-semibold
    hover:bg-gray-100
  "
            >
              My Certificates
            </Link>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-4 gap-6 mt-10">
          <StatCard
            icon={<FaBookOpen />}
            value={dashboardData.enrolled_courses_count}
            label="Cours suivis"
            bgColor="bg-[#eef2ff]"
            iconColor="text-[#1d4ed8]"
          />

          <StatCard
            icon={<FaCheckCircle />}
            value={dashboardData.completed_courses_count}
            label="Cours terminés"
            bgColor="bg-[#ecfdf3]"
            iconColor="text-[#16a34a]"
          />

          <StatCard
            icon={<FaTrophy />}
            value={`${dashboardData.average_progress}%`}
            label="Progression"
            bgColor="bg-[#f5f3ff]"
            iconColor="text-[#7c3aed]"
          />

          <StatCard
            icon={<FaClock />}
            value={`${dashboardData.study_time_hours}h`}
            label="Completed Content"
            bgColor="bg-[#fff7ed]"
            iconColor="text-[#ea580c]"
          />
        </div>

        {/* GRID */}

        <div className="grid grid-cols-3 gap-6 mt-10">
          {/* LEFT */}

          <div className="col-span-2 space-y-6">
            <ContinueLearningCard
              courseId={dashboardData.courses[0]?.course_id}
              image={dashboardData.courses[0]?.thumbnail}
              title={dashboardData.courses[0]?.title}
              instructor={dashboardData.courses[0]?.teacher}
              progress={dashboardData.courses[0]?.progress_percent}
              lessons={dashboardData.courses[0]?.lessons_count}
            />

            <CourseProgressCard courses={dashboardData.courses} />

            <ProgressChart courses={dashboardData.courses} />
          </div>

          {/* RIGHT */}

          {/* RIGHT */}

          <div className="space-y-6">
            <QuizCard quiz={dashboardData.next_quiz} />


<Link
  to="/student/quiz-attempts"
  className="block bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors group"
>
  <div className="bg-yellow-400 h-0.5" />
  <div className="p-4 flex items-center justify-between">

    <div className="flex items-center gap-3">
      <div className="bg-yellow-50 text-yellow-600 w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
        <Trophy size={17} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">Quiz History</h3>
        <p className="text-xs text-gray-400">View all your quiz attempts</p>
      </div>
    </div>

    <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-400 transition-colors" />

  </div>
</Link>

            <ActivityCard activities={dashboardData.activities} />
          </div>
        </div>
      </>
  );
}

