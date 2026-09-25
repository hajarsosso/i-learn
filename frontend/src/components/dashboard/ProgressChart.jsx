import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";

export default function ProgressChart({ courses }) {
  const data = courses.map((course) => ({
    name:
      course.title.length > 12
        ? course.title.substring(0, 12) + "..."
        : course.title,
    progress: course.progress_percent,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
      <div className="bg-blue-500 h-0.5" />
      <div className="p-6">

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-1">
          <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <TrendingUp size={16} />
          </div>
          <h2 className="text-base font-semibold text-gray-900">Learning Progress</h2>
        </div>

        <p className="text-xs text-gray-400 mb-6 ml-[42px]">
          Progress for each enrolled course
        </p>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={28}>

              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                width={36}
              />

              <Tooltip
                cursor={{ fill: "#f3f4f6" }}
                contentStyle={{
                  border: "0.5px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "none",
                }}
                formatter={(value) => [`${value}%`, "Progress"]}
              />

              <Bar
                dataKey="progress"
                radius={[6, 6, 0, 0]}
                fill="#3b82f6"
              />

            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}