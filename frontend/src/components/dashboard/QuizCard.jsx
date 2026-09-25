import { ClipboardList, ChevronRight, PartyPopper, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuizCard({ quiz }) {
  const navigate = useNavigate();

  if (!quiz) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
        <div className="bg-purple-500 h-0.5" />
        <div className="p-6">

          <div className="flex items-center gap-2.5 mb-4">
            <div className="bg-purple-50 text-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <ClipboardList size={16} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Prochain quiz</h2>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
            <PartyPopper size={15} className="text-purple-400" />
            You have completed all available quizzes.
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
      <div className="bg-purple-500 h-0.5" />
      <div className="p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="bg-purple-50 text-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <ClipboardList size={16} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Prochain quiz</h2>
          </div>
          <ClipboardList size={18} className="text-gray-300" />
        </div>

        {/* Quiz info block — taller, centered like screenshot */}
        <div className="bg-purple-50 rounded-xl py-8 px-6 mb-5 flex flex-col items-center text-center gap-3">
          <div className="bg-white text-purple-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm">
            <ClipboardList size={26} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{quiz.title}</h3>
            <p className="text-xs text-gray-400 mt-1">Cours: {quiz.course}</p>
          </div>
          {quiz.scheduled_at && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock size={12} />
              <span>{quiz.scheduled_at}</span>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => navigate(`/quizzes/${quiz.id}`)}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
        >
          Commencez le quiz
          <ChevronRight size={15} />
        </button>

      </div>
    </div>
  );
}