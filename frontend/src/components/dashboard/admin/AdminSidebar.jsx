import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileCheck,
  FolderOpen,
  BarChart3,
  Settings,
  ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { to: "/admin",          end: true, icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/courses",         icon: BookOpen,    label: "All Courses" },
      { to: "/admin/pending-courses", icon: FileCheck,   label: "Approvals",    badge: "pending" },
      { to: "/admin/categories",      icon: FolderOpen,  label: "Categories" },
    ],
  },
  {
    label: "People",
    items: [
      { to: "/admin/users", icon: Users, label: "Users" },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/admin/reports",  icon: BarChart3, label: "Reports" },
      { to: "/admin/settings", icon: Settings,  label: "Settings" },
    ],
  },
];

export default function AdminSidebar({ pendingCount = 0 }) {
  const navigate = useNavigate();

  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col h-full">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
            <LayoutDashboard size={15} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">i-Learn</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ to, end, icon: Icon, label, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={17} className={isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"} />
                      <span className="flex-1 truncate">{label}</span>

                      {/* Pending badge */}
                      {badge === "pending" && pendingCount > 0 && (
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {pendingCount}
                        </span>
                      )}

                      {/* Active chevron */}
                      {isActive && <ChevronRight size={14} className="text-white/70 shrink-0" />}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Settings size={17} className={isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"} />
              <span className="flex-1">Settings</span>
            </>
          )}
        </NavLink>
      </div>

    </aside>
  );
}