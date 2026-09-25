import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axios";

import TeacherSidebar from "../../components/dashboard/teacher/TeacherSidebar";
import TeacherTopbar from "../../components/dashboard/teacher/TeacherTopbar";

import {
  Plus,
  Pencil,
  Trash2,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  X,
} from "lucide-react";

export default function ManageQuizPage() {
  const { id } = useParams();

  const [showDeleteQuizModal, setShowDeleteQuizModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const [quizForm, setQuizForm] = useState({
    title: "",
    required_score: 50,
    time_limit: 15,
  });

  const [questionForm, setQuestionForm] = useState({
    text: "",
    points: 10,
    answers: [
      { text: "", is_correct: true },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
    ],
  });

  useEffect(() => { fetchQuiz(); }, []);

  const fetchQuiz = async () => {
    try {
      const lessonResponse = await axiosClient.get(`/lessons/${id}`);
      const lesson = lessonResponse.data;
      if (!lesson.quiz) { setQuiz(null); return; }
      const quizResponse = await axiosClient.get(`/quizzes/${lesson.quiz.id}`);
      setQuiz(quizResponse.data);
    } catch (error) { console.log(error); setQuiz(null); }
  };

  const createQuiz = async () => {
    try {
      if (editingQuiz) {
        await axiosClient.put(`/quizzes/${quiz.id}`, {
          title: quizForm.title,
          required_score: Number(quizForm.required_score),
        });
      } else {
        const response = await axiosClient.post("/quizzes", {
          title: quizForm.title,
          required_score: Number(quizForm.required_score),
          time_limit: Number(quizForm.time_limit),
          lesson_id: Number(id),
        });
        setQuiz(response.data.quiz);
      }
      setEditingQuiz(false);
      setShowQuizModal(false);
      fetchQuiz();
    } catch (error) {
      console.log(error.response?.data);
      alert(JSON.stringify(error.response?.data, null, 2));
    }
  };

  const createQuestion = async () => {
    try {
      if (editingQuestion) {
        await axiosClient.put(`/questions/${editingQuestion.id}`, {
          text: questionForm.text,
          points: questionForm.points,
          answers: questionForm.answers,
        });
      } else {
        await axiosClient.post("/questions", {
          quiz_id: quiz.id,
          text: questionForm.text,
          points: questionForm.points,
          answers: questionForm.answers,
        });
      }
      setEditingQuestion(null);
      setShowQuestionModal(false);
      setQuestionForm({
        text: "", points: 10,
        answers: [
          { text: "", is_correct: true },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ],
      });
      fetchQuiz();
    } catch (error) {
      console.log(error.response?.data);
      alert(JSON.stringify(error.response?.data, null, 2));
    }
  };

  const deleteQuiz = async () => {
    try {
      await axiosClient.delete(`/quizzes/${quiz.id}`);
      setShowDeleteQuizModal(false);
      setQuiz(null);
      alert("Quiz deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete quiz");
    }
  };

  const deleteQuestion = async (questionId) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await axiosClient.delete(`/questions/${questionId}`);
      fetchQuiz();
    } catch (error) {
      console.error(error);
      alert("Failed to delete question");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TeacherSidebar />

      <div className="flex-1">
        <TeacherTopbar />

        <div className="p-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
            <span>Mes Cours</span>
            <ChevronRight size={12} />
            <span>Leçons</span>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">Quiz</span>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Step done number={1} text="Créer un cours" />
            <StepDivider />
            <Step done number={2} text="Leçons" />
            <StepDivider />
            <Step active number={3} text="Quizzes" />
            
          </div>

          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quiz Builder</h1>
              <p className="text-sm text-gray-400 mt-1">Créez et gérez les questions du quiz.</p>
            </div>

            <div className="flex items-center gap-2">
              {!quiz && (
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} />
                  Créer un quiz
                </button>
              )}

              {quiz && (
                <>
                  <button
                    onClick={() => {
                      setEditingQuiz(true);
                      setQuizForm({ title: quiz.title, required_score: quiz.required_score });
                      setShowQuizModal(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-600 text-xs font-semibold hover:bg-amber-100 transition-colors"
                  >
                    <Pencil size={13} />
                    Modifier
                  </button>

                  <button
                    onClick={() => setShowDeleteQuizModal(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={13} />
                    Supprimer
                  </button>

                  <button
                    onClick={() => setShowQuestionModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <Plus size={16} />
                    Ajouter une question
                  </button>
                </>
              )}
            </div>
          </div>

          {!quiz ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-20">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HelpCircle size={20} className="text-gray-300" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Aucun quiz</h2>
              <p className="text-xs text-gray-400 mt-1">Créez votre premier quiz.</p>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs text-gray-400">Questions</p>
                  <h3 className="text-xl font-bold text-blue-600 mt-1">
                    {quiz.questions?.length || 0}
                  </h3>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs text-gray-400">Total Points</p>
                  <h3 className="text-xl font-bold text-green-600 mt-1">
                    {quiz.questions?.reduce((sum, q) => sum + q.points, 0)}
                  </h3>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs text-gray-400">Score requis</p>
                  <h3 className="text-xl font-bold text-purple-600 mt-1">
                    {quiz.required_score}%
                  </h3>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-3">
                {quiz.questions?.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            Q{index + 1}
                          </span>
                          <span className="text-xs text-gray-400">{question.points} pts</span>
                        </div>

                        <h3 className="text-sm font-semibold text-gray-900">
                          {question.text}
                        </h3>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {question.answers?.map((answer) => (
                            <div
                              key={answer.id}
                              className={`px-3 py-2 rounded-xl text-xs border ${
                                answer.is_correct
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-gray-50 text-gray-500 border-gray-100"
                              }`}
                            >
                              {answer.text}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setEditingQuestion(question);
                            setQuestionForm({
                              text: question.text,
                              points: question.points,
                              answers: question.answers.map((a) => ({
                                text: a.text,
                                is_correct: a.is_correct,
                              })),
                            });
                            setShowQuestionModal(true);
                          }}
                          className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-amber-50 text-gray-400 hover:text-amber-600 flex items-center justify-center transition-colors"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => deleteQuestion(question.id)}
                          className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* QUIZ MODAL */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-[520px]">

            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900">
                {editingQuiz ? "Modifier le quiz" : "Créer un quiz"}
              </h2>
              <button
                onClick={() => { setShowQuizModal(false); setEditingQuiz(false); }}
                className="w-7 h-7 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Titre du quiz
                </label>
                <input
                  type="text"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                  placeholder="ex. JavaScript Basics Quiz"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Score de passage (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={quizForm.required_score}
                    onChange={(e) => setQuizForm({ ...quizForm, required_score: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Limite de temps (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={quizForm.time_limit}
                  onChange={(e) => setQuizForm({ ...quizForm, time_limit: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                Les étudiants doivent obtenir au moins {quizForm.required_score}% pour réussir ce quiz.
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-50">
              <button
                onClick={() => { setShowQuizModal(false); setEditingQuiz(false); }}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={createQuiz}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                {editingQuiz ? "Mettre à jour" : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUESTION MODAL */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 overflow-auto py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-[560px]">

            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900">
                {editingQuestion ? "Modifier la question" : "Ajouter une question"}
              </h2>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <input
                type="text"
                placeholder="Texte de la question"
                value={questionForm.text}
                onChange={(e) => setQuestionForm({ ...questionForm, text: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              />

              <input
                type="number"
                placeholder="Points"
                value={questionForm.points}
                onChange={(e) => setQuestionForm({ ...questionForm, points: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              />

              <p className="text-xs font-medium text-gray-500 pt-1">Réponses — sélectionnez la bonne</p>

              {questionForm.answers.map((answer, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={`Réponse ${index + 1}`}
                    value={answer.text}
                    onChange={(e) => {
                      const updated = [...questionForm.answers];
                      updated[index].text = e.target.value;
                      setQuestionForm({ ...questionForm, answers: updated });
                    }}
                    className={`flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                      answer.is_correct
                        ? "border-green-300 bg-green-50 focus:ring-green-100"
                        : "border-gray-200 focus:ring-blue-100 focus:border-blue-300"
                    }`}
                  />
                  <button
                    onClick={() => {
                      const updated = questionForm.answers.map((a, i) => ({
                        ...a,
                        is_correct: i === index,
                      }));
                      setQuestionForm({ ...questionForm, answers: updated });
                    }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      answer.is_correct
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {answer.is_correct && <CheckCircle2 size={12} className="text-white" />}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-50">
              <button
                onClick={() => setShowQuestionModal(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={createQuestion}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                {editingQuestion ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE QUIZ MODAL */}
      {showDeleteQuizModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-[440px]">

            <div className="px-6 py-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-500" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Supprimer le quiz</h2>
                  <p className="text-xs text-gray-400">Cette action est irréversible.</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-red-700">"{quiz?.title}"</p>
                <p className="text-xs text-red-500 mt-1">
                  Toutes les questions et réponses seront définitivement supprimées.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-50">
              <button
                onClick={() => setShowDeleteQuizModal(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={deleteQuiz}
                className="px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepDivider() {
  return <div className="w-8 h-px bg-gray-200" />;
}

function Step({ number, text, active = false, done = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
        active ? "bg-blue-600 text-white" : done ? "bg-blue-50 text-blue-600" : "border border-gray-200 text-gray-400"
      }`}>
        {active || done ? <CheckCircle2 size={14} /> : number}
      </div>
      <span className={`text-xs font-medium ${active ? "text-blue-600" : done ? "text-blue-400" : "text-gray-400"}`}>
        {text}
      </span>
    </div>
  );
}