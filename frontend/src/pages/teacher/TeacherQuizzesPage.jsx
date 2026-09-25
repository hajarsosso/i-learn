import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { Link } from "react-router-dom";
import { ClipboardList, Search } from "lucide-react";

export default function TeacherQuizzesPage() {

    const [quizzes, setQuizzes] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axiosClient.get("/teacher/quizzes")

            .then(res => {

                setQuizzes(res.data);
                setFiltered(res.data);

            })

            .finally(() => setLoading(false));

    }, []);

    function search(value) {

        const keyword = value.toLowerCase();

        setFiltered(

            quizzes.filter(q =>

                q.title.toLowerCase().includes(keyword) ||

                q.course.toLowerCase().includes(keyword)

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
                    Quizzes
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Tous les quizzes que vous avez créés.
                </p>

            </div>

            <div className="relative mt-6">

                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input

                    onChange={(e) => search(e.target.value)}

                    className="w-full bg-white border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"

                    placeholder="Rechercher un quiz..."

                />

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-6 overflow-hidden">

                <table className="w-full text-sm">

                    <thead>

                        <tr className="border-b border-gray-100">

                            <th className="text-left px-6 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">
                                Quiz
                            </th>

                            <th className="text-left px-4 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">
                                Cours
                            </th>

                            <th className="text-left px-4 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">
                                Leçon
                            </th>

                            <th className="text-center px-4 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">
                                Tentatives
                            </th>

                            <th className="text-center px-4 py-4 font-medium text-gray-400 text-xs uppercase tracking-wide">
                                Moy. Score
                            </th>

                            <th className="px-6 py-4"></th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.map(quiz => (

                            <tr

                                key={quiz.id}

                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"

                            >

                                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">

                                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <ClipboardList size={16} />
                                    </div>

                                    {quiz.title}

                                </td>

                                <td className="px-4 py-4 text-gray-500">{quiz.course}</td>

                                <td className="px-4 py-4 text-gray-500">{quiz.lesson}</td>

                                <td className="px-4 py-4 text-center text-gray-500">

                                    {quiz.attempts}

                                </td>

                                <td className="px-4 py-4 text-center text-gray-500">

                                    {quiz.average_score}%

                                </td>

                                <td className="px-6 py-4 text-right">

                                    <Link

                                        to={`/teacher/lessons/${quiz.id}/quiz`}

                                        className="inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"

                                    >

                                        Modifier

                                    </Link>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}