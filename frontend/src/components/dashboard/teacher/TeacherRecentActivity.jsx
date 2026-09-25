export default function TeacherRecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-4">
        Activité récente
      </h2>

      <div className="space-y-1">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="p-2.5 rounded-xl hover:bg-gray-50/60 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">
                  {activity.title}
                </h3>

                <p className="text-xs text-gray-400 mt-0.5">
                  {activity.description}
                </p>

                <p className="text-xs text-gray-300 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}