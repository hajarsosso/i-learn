import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, UserCircle, ChevronDown, LogOut, User } from "lucide-react";
import axiosClient from "../../../api/axios";

const ROUTE_TITLES = {
  "/admin": {
    title: "Dashboard",
    sub: "Overview of your platform",
  },
  "/admin/users": {
    title: "User Management",
    sub: "Manage accounts and roles",
  },
  "/admin/courses": {
    title: "Pending Courses",
    sub: "Review and approve submissions",
  },
  "/admin/all-courses": {
    title: "All Courses",
    sub: "Browse every course on the platform",
  },
  "/admin/categories": {
    title: "Categories",
    sub: "Organise course topics",
  },
};

export default function AdminTopbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    axiosClient.get("/user").then((res) => setUser(res.data));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const logout = async () => {
    try {
      await axiosClient.post("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const matched = Object.entries(ROUTE_TITLES)
    .sort((a, b) => b[0].length - a[0].length)
    .find(([path]) => location.pathname.startsWith(path));

  const { title, sub } = matched?.[1] ?? { title: "Admin", sub: "" };

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">

      {/* LEFT */}
      <div>
        <h1 className="text-base font-bold text-gray-900">{title}</h1>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-2.5 w-[300px] focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="outline-none bg-transparent w-full text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* User Dropdown */}
        <div ref={dropdownRef} className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 hover:border-gray-300 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <UserCircle size={18} className="text-blue-600" />
            </div>

            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900 leading-none">
                {user?.name}
              </p>
              <p className="text-xs text-gray-400 capitalize mt-0.5">
                {user?.role}
              </p>
            </div>

            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden z-50">

              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
              </div>

              <Link
                to="/admin/settings"
                className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <User size={14} />
                Mon profil
              </Link>

              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} />
                Se déconnecter
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}