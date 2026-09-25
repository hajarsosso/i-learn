import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios";
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (!quiz || submitting) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quiz, submitting]);

  useEffect(() => {
    if (timeLeft === 0 && quiz && !submitting) {
      handleSubmit(true);
    }
  }, [timeLeft]);

  const fetchQuiz = async () => {
    try {
      const response = await axiosClient.get(`/quizzes/${id}`);
      setQuiz(response.data);
      setTimeLeft(response.data.time_limit * 60);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId, answerId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = async (auto = false) => {
    console.log("ANSWERS SENT:", answers);
    try {
      if (submitting) return;
      setSubmitting(true);
      const response = await axiosClient.post("/quizzes/submit", {
        quiz_id: quiz.id,
        answers,
      });
      console.log(response.data);
      navigate("/student/quiz-result", {
        state: {
          result: response.data.result,
          review: response.data.review,
          quizTitle: quiz.title,
        },
      });
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        alert(error.response.data.message);
        return;
      }
      alert("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center p-10 text-sm text-gray-400">
        <span className="animate-pulse">Loading quiz…</span>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const isLast = currentQuestion === quiz.questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-4 max-w-5xl mx-auto">

      {/* Header card */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="bg-blue-500 h-0.5" />
        <div className="p-6">

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
                Quiz
              </p>
              <h1 className="text-xl font-semibold text-gray-900">{quiz.title}</h1>
              <p className="text-xs text-gray-400 mt-1">
                Question {currentQuestion + 1} of {quiz.questions.length} · {answeredCount} answered
              </p>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold shrink-0 ${
              timeLeft <= 60
                ? "bg-rose-50 text-rose-600"
                : "bg-blue-50 text-blue-600"
            }`}>
              <Clock size={14} />
              {formattedTime}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question dots */}
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {quiz.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestion(i)}
                className={`w-6 h-6 rounded-md text-xs font-medium transition-colors ${
                  i === currentQuestion
                    ? "bg-blue-600 text-white"
                    : answers[q.id]
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="bg-purple-500 h-0.5" />
        <div className="p-6">

          <h2 className="text-base font-semibold text-gray-900 mb-5">
            {question.text}
          </h2>

          <div className="space-y-2.5">
            {question.answers && question.answers.length > 0 ? (
              question.answers.map((answer) => {
                const selected = answers[question.id] === answer.id;
                return (
                  <button
                    key={answer.id}
                    onClick={() => handleSelect(question.id, answer.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-lg border text-sm transition-colors flex items-center justify-between gap-3 ${
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span>{answer.text}</span>
                    {selected && <CheckCircle size={15} className="text-blue-500 shrink-0" />}
                  </button>
                );
              })
            ) : (
              question.options?.map((option, index) => {
                const selected = answers[question.id] === option;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(question.id, option)}
                    className={`w-full text-left px-4 py-3.5 rounded-lg border text-sm transition-colors flex items-center justify-between gap-3 ${
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span>{option}</span>
                    {selected && <CheckCircle size={15} className="text-blue-500 shrink-0" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-5 border-t border-gray-50">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={15} />
              Previous
            </button>

            {!isLast ? (
              <button
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Next
                <ChevronRight size={15} />
              </button>
            ) : (
              <button
                disabled={submitting}
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                <CheckCircle size={15} />
                {submitting ? "Submitting…" : "Submit Quiz"}
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

export default QuizPage;