import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios";
import { ClipboardList, ArrowLeft, CheckCircle, XCircle, Calendar } from "lucide-react";

function QuizAttemptsPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const response = await axiosClient.get("/my-quiz-attempts");
      setAttempts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-10 text-sm text-gray-400">
        <span className="animate-pulse">Loading attempts…</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
            Historique
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">Quiz History</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            All your past quiz attempts.
          </p>
        </div>
        
      </div>

      {/* Empty state */}
      {attempts.length === 0 ? (

        <div className="bg-white rounded-xl border border-gray-100 p-12 flex flex-col items-center gap-3 text-center">
          <div className="bg-gray-50 text-gray-300 w-12 h-12 rounded-xl flex items-center justify-center">
            <ClipboardList size={22} />
          </div>
          <p className="text-sm text-gray-400">No quiz attempts yet.</p>
        </div>

      ) : (

        <div className="space-y-3">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors"
            >
              <div className={`h-0.5 ${attempt.passed ? "bg-green-500" : "bg-rose-400"}`} />
              <div className="p-5 flex items-center justify-between gap-4">

                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${attempt.passed ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-500"}`}>
                    {attempt.passed
                      ? <CheckCircle size={17} />
                      : <XCircle size={17} />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{attempt.quiz?.title}</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                      <Calendar size={11} />
                      <span>{new Date(attempt.attempted_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-2xl font-bold ${attempt.passed ? "text-green-600" : "text-rose-500"}`}>
                    {attempt.percentage}%
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${attempt.passed ? "bg-green-50 text-green-700" : "bg-rose-50 text-rose-600"}`}>
                    {attempt.passed ? "Passed" : "Failed"}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      )}

    </div>
  );
}

export default QuizAttemptsPage;