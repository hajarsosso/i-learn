import axiosClient from "../../api/axios";
import { useEffect, useState } from "react";
import {
  Shield,
  User,
  LogOut,
  Server,
} from "lucide-react";

export default function AdminSettingsPage() {

  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    axiosClient.get("/user").then((res) => setAdmin(res.data));
  }, []);

  const logout = async () => {
  try {
    await axiosClient.post("/logout");
  } catch (e) {
    // Ignore if token is already invalid
  }

  // Clear all stored auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // If you use sessionStorage anywhere
  sessionStorage.clear();

  // Redirect and replace history
  window.location.replace("/login");
};

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
          Plateforme i-Learn
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage administrator information.
        </p>
      </div>

      {/* Admin */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
        <div className="bg-blue-500 h-0.5" />
        <div className="p-6">

          <div className="flex items-center gap-2.5 mb-6">
            <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <User size={16} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Administrator</h2>
          </div>

          <div className="space-y-5">

            <div>
              <p className="text-xs text-gray-400 mb-0.5">Name</p>
              <p className="text-sm font-semibold text-gray-900">{admin?.name}</p>
            </div>

            <div className="h-px bg-gray-50" />

            <div>
              <p className="text-xs text-gray-400 mb-0.5">Email</p>
              <p className="text-sm font-semibold text-gray-900">{admin?.email}</p>
            </div>

            <div className="h-px bg-gray-50" />

            <div>
              <p className="text-xs text-gray-400 mb-0.5">Role</p>
              <span className="inline-block bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                {admin?.role}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* System */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
        <div className="bg-green-500 h-0.5" />
        <div className="p-6">

          <div className="flex items-center gap-2.5 mb-6">
            <div className="bg-green-50 text-green-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Server size={16} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">System Information</h2>
          </div>

          <div className="space-y-4">

            {[
              { label: "Frontend",       value: "React + Vite"     },
              { label: "Backend",        value: "Laravel 12"        },
              { label: "Authentication", value: "Laravel Sanctum"   },
            ].map(({ label, value }, i, arr) => (
              <div key={label}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-semibold text-gray-900">{value}</span>
                </div>
                {i < arr.length - 1 && <div className="h-px bg-gray-50 mt-4" />}
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
        <div className="bg-rose-500 h-0.5" />
        <div className="p-6">

          <div className="flex items-center gap-2.5 mb-6">
            <div className="bg-rose-50 text-rose-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <Shield size={16} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Security</h2>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>

        </div>
      </div>

    </div>
  );
}