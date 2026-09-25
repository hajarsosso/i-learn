import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Users,
  BookOpen,
} from "lucide-react";

export default function TeacherCoursesPage() {

  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axiosClient.get("/teacher/courses")

      .then(res => {

        setCourses(res.data);

        setFiltered(res.data);

      })

      .finally(() => setLoading(false));

  }, []);

  function search(value) {

    const keyword = value.toLowerCase();

    setFiltered(

      courses.filter(course =>

        course.title.toLowerCase().includes(keyword)

      )

    );

  }

  if (loading) {

    return (

      <div className="flex justify-center py-40">

        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-500"></div>

      </div>

    );

  }

  return (

    <>

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Mes Cours
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Gérez l'ensemble de vos cours.
          </p>

        </div>

        <Link

          to="/teacher/courses/create"

          className="bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors"

        >

          <Plus size={16} />

          Créer un cours

        </Link>

      </div>

      <div className="mt-6 relative">

        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input

          onChange={(e) => search(e.target.value)}

          placeholder="Rechercher un cours..."

          className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"

        />

      </div>

      <div className="grid grid-cols-3 gap-5 mt-8">

        {filtered.map(course => (

          <div

            key={course.id}

            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:border-gray-200 transition-colors"

          >

            <img

              src={course.thumbnail}

              className="w-full h-40 object-cover"

            />

            <div className="p-5">

              <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">

                {course.category}

              </span>

              <h2 className="text-base font-bold text-gray-900 mt-1.5">

                {course.title}

              </h2>

              <div className="flex justify-between mt-4 text-xs text-gray-400">

                <div className="flex items-center gap-1.5">

                  <Users size={14} />
                  {course.students}

                </div>

                <div className="flex items-center gap-1.5">

                  <BookOpen size={14} />
                  {course.lessons}

                </div>

              </div>

              <p className="text-gray-400 text-xs mt-4">

                Créé le {course.created_at}

              </p>

              <Link

                to={`/teacher/courses/${course.id}/lessons`}

                className="block text-center mt-4 bg-blue-50 text-blue-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-100 transition-colors"

              >

                Gérer

              </Link>

            </div>

          </div>

        ))}

      </div>

    </>

  );

}