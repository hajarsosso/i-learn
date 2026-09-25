import { Activity } from "lucide-react";

function ActivityItem({ title, subtitle, time }) {
  return (
    <div>
      <div className="py-4 flex items-start justify-between gap-4">

        <div className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          </div>
        </div>

        <span className="text-xs text-gray-400 shrink-0">{time}</span>

      </div>
    </div>
  );
}

export default function ActivityCard({ activities = [] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
      <div className="bg-blue-500 h-0.5" />
      <div className="p-6">

        <div className="flex items-center gap-2.5 mb-4">
          <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <Activity size={16} />
          </div>
          <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
        </div>

        {activities.length === 0 ? (

          <p className="text-sm text-gray-400 py-4">No recent activity.</p>

        ) : (

          <div className="space-y-0">
            {activities.map((activity, index) => (
              <div key={index}>
                <ActivityItem
                  title={activity.title}
                  subtitle={activity.subtitle}
                  time={activity.time}
                />
                {index < activities.length - 1 && <div className="h-px bg-gray-50" />}
              </div>
            ))}
          </div>

        )}

      </div>
    </div>
  );
}