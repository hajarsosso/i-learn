export default function TeacherStudentsCard({ students }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-4">
        Étudiants récents
      </h2>

      <div className="space-y-1">
        {students.map((student, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50/60 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center font-semibold text-xs text-blue-600 flex-shrink-0">
              {student.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {student.name}
              </h3>

              <p className="text-xs text-gray-400 truncate">
                {student.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}