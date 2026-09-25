import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  ClipboardList,
  BarChart3,
  Settings,
  HelpCircle,
  Bot,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function TeacherSidebar() {
  const location = useLocation();

  const links = [
    { to: "/teacher/dashboard", icon: LayoutDashboard, text: "Dashboard" },
    { to: "/teacher/courses",   icon: BookOpen,         text: "Mes Cours" },
    { to: "/teacher/students",  icon: GraduationCap,    text: "Étudiants" },
    { to: "/teacher/quizzes",   icon: ClipboardList,    text: "Quizzes" },
    { to: "/teacher/reports",   icon: BarChart3,        text: "Rapports" },
    { to: "/teacher/settings",  icon: Settings,         text: "Paramètres" },
    { to: "/teacher/help",      icon: HelpCircle,       text: "Help Center" },
  ];

  return (
    <div className="w-[260px] min-h-screen bg-white border-r border-gray-100 px-5 py-8 flex flex-col justify-between">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div className="leading-tight">
            <p className="font-bold text-gray-900 text-base leading-none">i-Learn</p>
            <p className="text-[10px] text-gray-400">Espace Enseignant</p>
          </div>
        </div>

        {/* LINKS */}
        <nav className="space-y-1">
          {links.map(({ to, icon: Icon, text }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} className="block">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
                  <span className={`text-sm ${active ? "font-semibold" : "font-medium"}`}>
                    {text}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* HELP CARD */}
      <div className="bg-blue-50 rounded-2xl p-5">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
          <Bot size={20} className="text-blue-500" />
        </div>
        <h2 className="text-sm font-bold text-gray-900 mb-1">Besoin d'aide ?</h2>
        <p className="text-xs text-gray-400 leading-relaxed mb-4">
          Posez toutes vos questions à notre assistant IA.
        </p>
        <button
          onClick={() => {
            if (window.botpress?.open) {
              window.botpress.open();
            }
          }}
          className="w-full bg-blue-600 text-white text-xs font-semibold py-2.5 rounded-xl"
        >
          Discutez avec l'IA
        </button>
      </div>

    </div>
  );
}