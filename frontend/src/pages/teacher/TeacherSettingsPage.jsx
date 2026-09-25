import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";

import {
  User,
  LogOut,
  BookOpen,
  Users,
  Shield,
} from "lucide-react";

export default function TeacherSettingsPage() {

  const [teacher, setTeacher] = useState(null);

  const [stats, setStats] = useState(null);

  useEffect(() => {

    axiosClient.get("/user")
      .then((res) => setTeacher(res.data));

    axiosClient.get("/teacher/dashboard")
      .then((res) => setStats(res.data));

  }, []);

  const logout = async () => {

    await axiosClient.post("/logout");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

  };

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-2xl font-bold text-gray-900">

          Paramètres

        </h1>

        <p className="text-sm text-gray-400 mt-1">

          Gérez votre compte enseignant.

        </p>

      </div>

      {/* PROFILE */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        <div className="flex items-center gap-4 mb-6">

          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">

            <User size={24} />

          </div>

          <div>

            <h2 className="text-lg font-bold text-gray-900">

              {teacher?.name}

            </h2>

            <p className="text-sm text-gray-400">

              {teacher?.email}

            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <InfoCard

            icon={<BookOpen size={16}/>}

            title="Cours"

            value={stats?.total_courses}

          />

          <InfoCard

            icon={<Users size={16}/>}

            title="Étudiants"

            value={stats?.total_students}

          />

          <InfoCard

            icon={<Shield size={16}/>}

            title="Rôle"

            value={teacher?.role}

          />

          <InfoCard

            icon={<User size={16}/>}

            title="Compte"

            value="Enseignant"

          />

        </div>

      </div>

      {/* LOGOUT */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-lg font-bold text-gray-900 mb-4">

          Sécurité

        </h2>

        <button

          onClick={logout}

          className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"

        >

          <LogOut size={16} />

          Se déconnecter

        </button>

      </div>

    </div>

  );

}

function InfoCard({

  icon,

  title,

  value,

}){

  return(

    <div className="border border-gray-100 rounded-xl p-4">

      <div className="flex items-center gap-2 text-blue-600">

        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide">

          {title}

        </span>

      </div>

      <h3 className="text-xl font-bold text-gray-900 mt-2">

        {value}

      </h3>

    </div>

  )

}