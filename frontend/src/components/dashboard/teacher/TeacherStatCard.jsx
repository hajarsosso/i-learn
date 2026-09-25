export default function TeacherStatCard({ icon, value, label, color }) {

  const colors = {
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">

      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
        {icon}
      </div>

      <div>

        <h2 className="text-xl font-bold text-gray-900">
          {value}
        </h2>

        <p className="text-xs text-gray-400 mt-0.5">
          {label}
        </p>

      </div>

    </div>
  );
}