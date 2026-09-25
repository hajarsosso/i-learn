import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

export default function TeacherProgressChart({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-5">
        Étudiants par cours
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="course"
              interval={0}
              angle={-15}
              textAnchor="end"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "#eff6ff" }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #dbeafe",
                fontSize: "12px",
                boxShadow: "none",
              }}
            />
            <Bar
              dataKey="students"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            >
              <LabelList
                dataKey="students"
                position="top"
                style={{ fontSize: "11px", fill: "#9ca3af" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}