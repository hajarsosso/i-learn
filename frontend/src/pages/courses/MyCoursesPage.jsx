import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { Link } from "react-router-dom";

const CARD_ACCENTS = [
  "from-violet-500 to-indigo-600",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-600",
  "from-fuchsia-500 to-purple-600",
];

function CourseCard({ course, onRemove }) {
  const accent = CARD_ACCENTS[course.id % CARD_ACCENTS.length];

  const downloadCertificate = async () => {
    try {
      const response = await axiosClient.get(`/certificates/${course.id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate-${course.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
      alert("Unable to download certificate.");
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${accent}`} />
        )}

        {course.is_completed && (
          <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Completed
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-1 line-clamp-2">
          {course.title}
        </h2>

        <p className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {course.teacher}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 mt-auto">
          <Link
            to={`/student/courses/${course.id}`}
            className="w-full text-center text-sm font-semibold bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            Continue learning
          </Link>

          {course.is_completed && (
            <button
              onClick={downloadCertificate}
              className="w-full text-center text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 py-2.5 rounded-xl hover:bg-emerald-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download certificate
            </button>
          )}

          <button
            onClick={() => onRemove(course.id)}
            className="w-full text-sm font-semibold text-gray-400 py-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
          >
            Remove course
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const response = await axiosClient.get("/my-courses");
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async (courseId) => {
    if (!window.confirm("Remove this course from your enrolled courses?")) return;

    try {
      await axiosClient.delete(`/enrollments/${courseId}`);
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.log(error);
      alert("Failed to remove course");
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Loading your courses...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-8">

      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My courses</h1>
          <p className="text-sm text-gray-400 mt-1">
            {courses.length > 0
              ? `${courses.length} course${courses.length !== 1 ? "s" : ""} enrolled`
              : "Continue your learning journey."}
          </p>
        </div>

        <Link
          to="/student/courses"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-200 bg-blue-50 px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Browse courses
        </Link>
      </div>

      {/* Empty state */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
            <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-gray-700 font-semibold text-lg">No courses enrolled yet</p>
          <p className="text-gray-400 text-sm mt-1 mb-6">Explore the catalog and start learning.</p>
          <Link
            to="/student/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onRemove={removeCourse} />
          ))}
        </div>
      )}

    </div>
  );
}