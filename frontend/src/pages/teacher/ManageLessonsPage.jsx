import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios";

import TeacherSidebar from "../../components/dashboard/teacher/TeacherSidebar";
import TeacherTopbar from "../../components/dashboard/teacher/TeacherTopbar";

import {
  Plus,
  Pencil,
  Trash2,
  PlayCircle,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  Clock,
  Video,
} from "lucide-react";

export default function ManageLessonsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", duration: "", video_url: "" });
  const [video, setVideo] = useState(null);

  useEffect(() => { fetchCourse(); }, []);

  const fetchCourse = async () => {
    try {
      const response = await axiosClient.get(`/courses/${id}`);
      setCourse(response.data.data);
      setLessons(response.data.data.lessons || []);
    } catch (error) { console.log(error); }
  };

  const resetForm = () => {
    setForm({ title: "", content: "", duration: "", video_url: "" });
    setVideo(null);
    setEditingLesson(null);
  };

  const openCreate = () => { resetForm(); setShowModal(true); };

  const openEdit = (lesson) => {
    setEditingLesson(lesson);
    setForm({ title: lesson.title, content: lesson.content, duration: lesson.duration, video_url: lesson.video_url || "" });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      data.append("duration", form.duration);
      if (form.video_url) data.append("video_url", form.video_url);
      if (video) data.append("video", video);

      if (editingLesson) {
        data.append("_method", "PUT");
        await axiosClient.post(`/lessons/${editingLesson.id}`, data);
      } else {
        data.append("course_id", id);
        await axiosClient.post("/lessons", data);
      }

      setShowModal(false);
      fetchCourse();
      resetForm();
    } catch (error) {
      console.log(error);
      alert("Failed to save lesson.");
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    try {
      await axiosClient.delete(`/lessons/${lessonId}`);
      fetchCourse();
    } catch (error) {
      console.log(error);
      alert("Failed to delete lesson.");
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
            <span className="text-gray-900 font-medium">Leçons</span>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Step done number={1} text="Crée un cours" />
            <StepDivider />
            <Step active number={2} text="Leçons" />
            <StepDivider />
            <Step number={3} text="Quizzes" />
            
          </div>

          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course?.title}</h1>
              <p className="text-sm text-gray-400 mt-1">Organisez et gérez vos leçons.</p>
            </div>

            <button
              onClick={openCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Plus size={16} />
              Ajouter une leçon
            </button>
          </div>

          {/* Lessons */}
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center justify-between">

                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <PlayCircle size={18} className="text-blue-600" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          Leçon {lesson.order}
                        </span>
                      </div>

                      <h2 className="text-sm font-semibold text-gray-900">
                        {lesson.title}
                      </h2>

                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {lesson.duration} min
                        </span>
                        {lesson.video_url && (
                          <span className="flex items-center gap-1 text-green-600">
                            <Video size={11} />
                            Vidéo attachée
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-400 mt-1.5 max-w-xl line-clamp-1">
                        {lesson.content}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(lesson)}
                      className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-yellow-50 text-gray-400 hover:text-yellow-600 flex items-center justify-center transition-colors"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      onClick={() => deleteLesson(lesson.id)}
                      className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>

                    <button
                      onClick={() => navigate(`/teacher/lessons/${lesson.id}/quiz`)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 text-purple-600 text-xs font-semibold hover:bg-purple-100 transition-colors"
                    >
                      <HelpCircle size={13} />
                      Quiz
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-[560px]">

            <h2 className="text-sm font-bold text-gray-900 mb-5">
              {editingLesson ? "Modifier la leçon" : "Ajouter une leçon"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Titre de la leçon"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              />

              <textarea
                rows={4}
                placeholder="Contenu de la leçon"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              />

              <input
                type="number"
                placeholder="Durée (minutes)"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              />

              <input
                type="text"
                placeholder="URL YouTube"
                value={form.video_url}
                onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
              />

              <div className="border border-gray-200 rounded-xl px-4 py-2.5">
                <input
                  type="file"
                  onChange={(e) => setVideo(e.target.files[0])}
                  className="text-sm text-gray-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-5 border-t border-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Enregistrer
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