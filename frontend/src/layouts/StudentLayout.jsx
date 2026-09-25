import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import BotpressChat from "../components/chatbot/BotpressChat";

export default function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">

      <Sidebar />

      <div className="flex-1 p-10">

        <Topbar />

        <div className="mt-10">
          <Outlet />
        </div>

      </div>

        <BotpressChat />


    </div>
  );
}