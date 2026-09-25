import { Outlet } from "react-router-dom";
import TeacherSidebar from "../components/dashboard/teacher/TeacherSidebar";
import TeacherTopbar from "../components/dashboard/teacher/TeacherTopbar";

export default function TeacherLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <TeacherSidebar />

      <div className="flex-1 flex flex-col">

        <TeacherTopbar />

        <main className="flex-1 p-10 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}