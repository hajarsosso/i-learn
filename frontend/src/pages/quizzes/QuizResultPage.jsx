import { useLocation, useNavigate } from "react-router-dom";
import { PartyPopper, BookOpen, ChevronLeft, ClipboardList, LayoutDashboard, BookMarked } from "lucide-react";

function QuizResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state?.result) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Résultat</p>
          <h1 className="text-2xl font-semibold text-gray-900">Quiz Result</h1>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-12 flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold text-gray-900">Result not found</p>
          <p className="text-xs text-gray-400 mb-2">This result may have expired or doesn't exist.</p>
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const { result, quizTitle, review } = state;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
          Résultat
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">Quiz Result</h1>
        <p className="text-sm text-gray-400 mt-0.5">{quizTitle}</p>
      </div>

      {/* Result card */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className={`h-0.5 ${result.passed ? "bg-green-500" : "bg-rose-400"}`} />
        <div className="p-10 flex flex-col items-center text-center">

          {/* Icon */}
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
            result.passed ? "bg-green-50 text-green-500" : "bg-rose-50 text-rose-400"
          }`}>
            {result.passed ? <PartyPopper size={36} /> : <BookOpen size={36} />}
          </div>

          {/* Score */}
          <p className={`text-7xl font-bold ${result.passed ? "text-green-500" : "text-rose-400"}`}>
            {result.percentage}%
          </p>
          <p className="text-sm text-gray-400 mt-3">
            Score: {result.score} / {result.total_points}
          </p>

          {/* Badge */}
          <span className={`mt-5 text-sm font-semibold px-6 py-2 rounded-full ${
            result.passed ? "bg-green-50 text-green-700" : "bg-rose-50 text-rose-600"
          }`}>
            {result.passed ? "You Passed!" : "You Didn't Pass"}
          </span>

        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        <button
          onClick={() => navigate(-2)}
          className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200 text-gray-500 text-sm font-medium py-3 rounded-lg transition-colors"
        >
          <ChevronLeft size={14} />
          Back
        </button>

        <button
          onClick={() => navigate("/student/quiz-review", { state: { review, quizTitle } })}
          className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200 text-gray-700 text-sm font-medium py-3 rounded-lg transition-colors"
        >
          <ClipboardList size={14} />
          Review Answers
        </button>

        <button
          onClick={() => navigate("/my-courses")}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-lg transition-colors"
        >
          <BookMarked size={14} />
          My Courses
        </button>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-lg transition-colors"
        >
          <LayoutDashboard size={14} />
          Dashboard
        </button>

      </div>

    </div>
  );
}

export default QuizResultPage;