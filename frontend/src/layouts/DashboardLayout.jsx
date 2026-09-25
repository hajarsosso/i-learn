import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex bg-[#f5f5f5]">
      <Sidebar />

      <div className="flex-1 p-10">
        {children}
      </div>
    </div>
  );
}