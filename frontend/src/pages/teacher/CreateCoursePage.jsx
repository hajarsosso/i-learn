import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios";
import TeacherSidebar from "../../components/dashboard/teacher/TeacherSidebar";
import TeacherTopbar from "../../components/dashboard/teacher/TeacherTopbar";
import { CloudUpload, CheckCircle2, ChevronRight } from "lucide-react";

export default function CreateCoursePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: "",
    status: "draft",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosClient.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (status) => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category_id", form.category_id);
      data.append("status", status);
      if (thumbnail) data.append("thumbnail", thumbnail);

      const response = await axiosClient.post("/courses", data);
      const courseId = response.data.course.id;

      alert(status === "draft" ? "Draft saved." : "Course created! Let's add your lessons.");
      navigate(`/teacher/courses/${courseId}/lessons`);
    } catch (error) {
      console.log(error);
      alert("Failed to create course.");
    } finally {
      setLoading(false);
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
            <span className="text-gray-900 font-medium">Créer un cours</span>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <Step active number={1} text="Crée un cours" />
            <StepDivider />
            <Step number={2} text="Leçons" />
            <StepDivider />
            <Step number={3} text="Quizzes" />
            
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* LEFT */}
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-5">
                  Informations du cours
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Titre
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="ex. React Masterclass"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Catégorie
                    </label>
                    <select
                      name="category_id"
                      value={form.category_id}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={7}
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Décrivez votre cours..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-5">
                  Image de couverture
                </h2>

                <label className="border-2 border-dashed border-gray-200 rounded-2xl h-[280px] flex flex-col justify-center items-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                        <CloudUpload size={22} className="text-blue-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">
                        Importer une image
                      </p>
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleThumbnail}
                  />
                </label>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-50">
              <button
                disabled={loading}
                onClick={() => handleSubmit("draft")}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Enregistrer le brouillon
              </button>

              <button
                disabled={loading}
                onClick={() => handleSubmit("published")}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                {loading ? "Enregistrement..." : "Enregistrer & Continuer"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function StepDivider() {
  return <div className="w-8 h-px bg-gray-200" />;
}

function Step({ number, text, active = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
        active ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-400"
      }`}>
        {active ? <CheckCircle2 size={14} /> : number}
      </div>
      <span className={`text-xs font-medium ${active ? "text-blue-600" : "text-gray-400"}`}>
        {text}
      </span>
    </div>
  );
}