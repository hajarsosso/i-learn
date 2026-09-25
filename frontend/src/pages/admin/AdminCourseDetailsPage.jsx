import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios";
import { ArrowLeft, PlayCircle, Clock, ExternalLink } from "lucide-react";

export default function AdminCourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axiosClient.get(`/admin/courses/${id}`).then(res => setCourse(res.data));
  }, [id]);

  if (!course) {
    return (
      <div className="flex justify-center py-40">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={15} />
        Retour
      </button>

      {/* Course Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex gap-6">
          <img
            src={course.thumbnail_url || "https://placehold.co/360x200?text=No+Image"}
            alt={course.title}
            className="w-[320px] h-[200px] object-cover rounded-xl flex-shrink-0"
          />

          <div className="flex-1 min-w-0 space-y-4">
            <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>

            <div className="grid grid-cols-2 gap-3">
              <Info label="Enseignant" value={course.teacher?.name} />
              <Info label="Catégorie" value={course.category?.name} />
              <Info label="Statut" value={course.status} />
              <Info label="Leçons" value={course.lessons?.length || 0} />
            </div>

            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Description
              </h2>
              <p className="text-sm text-gray-500 whitespace-pre-wrap leading-relaxed">
                {course.description || "Aucune description."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Leçons</h2>

        {course.lessons?.length ? (
          <div className="space-y-3">
            {course.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <PlayCircle size={16} className="text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      Leçon {index + 1}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 mt-1">
                    {lesson.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                    <Clock size={11} />
                    {lesson.duration || 0} min
                  </div>

                  {lesson.content && (
                    <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {lesson.content}
                    </p>
                  )}

                  {lesson.video_url && (
                    
                     <a href={lesson.video_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-2 transition-colors"
                    >
                      <ExternalLink size={11} />
                      Voir la vidéo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            Ce cours n'a pas encore de leçons.
          </p>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="text-xs uppercase tracking-wide text-gray-400">{label}</div>
      <div className="text-sm font-semibold text-gray-900 mt-0.5">{value || "—"}</div>
    </div>
  );
}