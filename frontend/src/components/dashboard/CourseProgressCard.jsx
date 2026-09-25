import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";

function CourseItem({ image, title, lessons, progress }) {
  return (
    <div>
      <div className="py-4 flex gap-4 items-center">

        <img
          src={image}
          alt={title}
          className="w-[88px] h-[60px] rounded-lg object-cover shrink-0"
        />

        <div className="flex-1 min-w-0">

          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{title}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <BookOpen size={11} />
                <span>{lessons}</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-green-600 shrink-0">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-gray-100 rounded-full">
            <div
              style={{ width: `${progress}%` }}
              className="h-1.5 bg-green-500 rounded-full transition-all duration-500"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CourseProgressCard({ courses }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
      <div className="bg-green-500 h-0.5" />
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-green-50 text-green-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <BookOpen size={16} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Mes Cours</h2>
          </div>
          <button
            onClick={() => navigate("/student/my-courses")}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Voir tout
            <ChevronRight size={13} />
          </button>
        </div>

        {/* List */}
        <div>
          {courses.map((course, index) => (
            <div key={course.course_id}>
              <CourseItem
                image={course.thumbnail}
                title={course.title}
                lessons={`${course.lessons_count} lessons`}
                progress={course.progress_percent}
              />
              {index < courses.length - 1 && <div className="h-px bg-gray-50" />}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}