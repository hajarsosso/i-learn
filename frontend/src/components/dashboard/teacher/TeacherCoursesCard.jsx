import { Link } from "react-router-dom";
import { BookOpen, ClipboardList, Users } from "lucide-react";

export default function TeacherCoursesCard({ courses }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-4">Mes cours</h2>

      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50/60 transition-colors"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 truncate">
                {course.title}
              </h3>

              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {course.students}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {course.lessons}
                </span>
                <span className="flex items-center gap-1">
                  <ClipboardList size={12} />
                  {course.quizzes}
                </span>
              </div>

              <p className="text-xs text-gray-300 mt-1">
                Créé le {course.created_at}
              </p>
            </div>

            <Link
              to={`/teacher/courses/${course.id}/lessons`}
              className="flex-shrink-0 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Gérer
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}