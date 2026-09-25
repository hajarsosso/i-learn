import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { Search } from "lucide-react";

export default function TeacherStudentsPage() {

    const [students, setStudents] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axiosClient.get("/teacher/students")

            .then(res => {

                setStudents(res.data);
                setFiltered(res.data);

            })

            .finally(() => setLoading(false));

    }, []);

    function search(keyword) {

        keyword = keyword.toLowerCase();

        setFiltered(

            students.filter(student =>

                student.name.toLowerCase().includes(keyword) ||

                student.email.toLowerCase().includes(keyword) ||

                student.course.toLowerCase().includes(keyword)

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

            <div>

                <h1 className="text-2xl font-bold text-gray-900">
                    Étudiants
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Étudiants inscrits à vos cours.
                </p>

            </div>

            <div className="relative mt-6">

                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input

                    onChange={(e) => search(e.target.value)}

                    placeholder="Rechercher un étudiant..."

                    className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"

                />

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-6 overflow-hidden">

                <table className="w-full text-sm">

                    <thead>

                        <tr className="border-b border-gray-100">

                            <th className="text-left px-6 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">Étudiant</th>

                            <th className="text-left px-4 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">Email</th>

                            <th className="text-left px-4 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">Cours</th>

                            <th className="text-left px-4 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">Progression</th>

                            <th className="text-left px-4 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">Moy. Quiz</th>

                            <th className="text-left px-6 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">Inscrit le</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.map(student => (

                            <tr

                                key={student.id}

                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"

                            >

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-xs">

                                            {student.name.charAt(0)}

                                        </div>

                                        <span className="font-medium text-gray-900">

                                            {student.name}

                                        </span>

                                    </div>

                                </td>

                                <td className="px-4 py-4 text-gray-500">{student.email}</td>

                                <td className="px-4 py-4 text-gray-500">{student.course}</td>

                                <td className="px-4 py-4">

                                    <div className="flex items-center gap-2">

                                        <div className="w-24 bg-gray-100 rounded-full h-1.5">

                                            <div

                                                className="bg-blue-500 h-1.5 rounded-full"

                                                style={{

                                                    width: `${student.progress}%`

                                                }}

                                            />

                                        </div>

                                        <span className="text-xs text-gray-400">

                                            {student.progress}%

                                        </span>

                                    </div>

                                </td>

                                <td className="px-4 py-4 text-gray-500">

                                    {student.average_quiz}%

                                </td>

                                <td className="px-6 py-4 text-gray-500">

                                    {student.joined}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );
}