import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

function QuizReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { review, quizTitle } = location.state || {};

  if (!review) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-sm font-semibold text-gray-500">
          Aucune donnée de révision trouvée.
        </h1>
      </div>
    );
  }

  const correct = review.filter((i) => i.is_correct).length;

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-5xl mx-auto space-y-5">

        {/* Header */}
       <div className="bg-blue-500 rounded-2xl p-5">
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-1.5 text-xs text-blue-200 hover:text-white transition-colors mb-4"
  >
    <ArrowLeft size={13} />
    Retour
  </button>

  <h1 className="text-lg font-bold text-white">{quizTitle}</h1>
  <p className="text-xs text-blue-200 mt-1">Révision des réponses</p>

  <div className="flex items-center gap-3 mt-4">
    <div className="flex items-center gap-1.5 text-xs font-medium text-white bg-white/20 px-3 py-1.5 rounded-full">
      <CheckCircle2 size={12} />
      {correct} correcte{correct !== 1 ? "s" : ""}
    </div>
    <div className="flex items-center gap-1.5 text-xs font-medium text-white bg-white/20 px-3 py-1.5 rounded-full">
      <XCircle size={12} />
      {review.length - correct} incorrecte{review.length - correct !== 1 ? "s" : ""}
    </div>
  </div>
</div>

        {/* Questions */}
        {review.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                    Q{index + 1}
                  </span>
                  {item.is_correct
                    ? <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">Correcte</span>
                    : <span className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">Incorrecte</span>
                  }
                </div>

                <h2 className="text-sm font-semibold text-gray-900 mb-4">
                  {item.question}
                </h2>

                <div className="space-y-2">
                  <div className={`flex items-start gap-2 text-xs px-3 py-2.5 rounded-xl border ${
                    item.is_correct
                      ? "bg-green-50 border-green-100 text-green-700"
                      : "bg-red-50 border-red-100 text-red-600"
                  }`}>
                    <span className="font-semibold flex-shrink-0 mt-0.5">Votre réponse :</span>
                    <span>{item.student_answer || "Aucune réponse"}</span>
                  </div>

                  {!item.is_correct && (
                    <div className="flex items-start gap-2 text-xs px-3 py-2.5 rounded-xl bg-green-50 border border-green-100 text-green-700">
                      <span className="font-semibold flex-shrink-0 mt-0.5">Bonne réponse :</span>
                      <span>{item.correct_answer}</span>
                    </div>
                  )}
                </div>

              </div>

              <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                item.is_correct ? "bg-green-50" : "bg-red-50"
              }`}>
                {item.is_correct
                  ? <CheckCircle2 size={18} className="text-green-600" />
                  : <XCircle size={18} className="text-red-500" />
                }
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={15} />
          Retour
        </button>

      </div>
    </div>
  );
}

export default QuizReviewPage;