import { ClipboardList } from "lucide-react";

export default function TeacherQuizzesCard({ quizzes }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-4">
        Quiz récents
      </h2>

      <div className="space-y-1">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50/60 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <ClipboardList size={15} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {quiz.title}
              </h3>

              <p className="text-xs text-gray-400 truncate">
                {quiz.course}
              </p>

              <p className="text-xs text-gray-300 mt-0.5">
                {quiz.updated_at}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}