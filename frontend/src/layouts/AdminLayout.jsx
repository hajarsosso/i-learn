import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/admin/AdminSidebar";
import AdminTopbar from "../components/dashboard/admin/AdminTopbar";


export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1">
        <AdminTopbar />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}