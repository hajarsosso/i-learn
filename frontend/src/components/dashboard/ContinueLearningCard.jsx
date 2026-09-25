import { useNavigate } from "react-router-dom";
import { PlayCircle, ChevronRight, BookOpen } from "lucide-react";

export default function ContinueLearningCard({
  courseId,
  image,
  title,
  instructor,
  progress,
  lessons,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
      <div className="bg-blue-500 h-0.5" />
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <PlayCircle size={16} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Continuer à apprendre</h2>
          </div>
          <button
            onClick={() => navigate("/student/my-courses")}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Voir tout
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Content */}
        <div className="flex gap-5">

          {/* Image */}
          <img
            src={image}
            alt={title}
            className="w-[220px] h-[140px] object-cover rounded-lg shrink-0"
          />

          {/* Info */}
          <div className="flex-1 flex flex-col justify-between">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                <BookOpen size={12} />
                <span>Par {instructor} • {lessons} leçons</span>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-gray-400">Progression</span>
                <span className="text-xs font-semibold text-blue-600">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-1.5 bg-blue-500 rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(`/student/courses/${courseId}`)}
              className="self-start flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              <PlayCircle size={15} />
              Continuer le cours
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}