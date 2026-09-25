export default function StatCard({
  icon,
  value,
  label,
  bgColor,
}) {
  return (
    <div
      className={`
        ${bgColor}
        rounded-2xl
        p-6
        flex
        items-center
        gap-5
        shadow-md
      `}
    >
      <div className="text-4xl">
        {icon}
      </div>

      <div>
        <h2 className="text-3xl font-bold">
          {value}
        </h2>

        <p className="text-gray-600">
          {label}
        </p>
      </div>
    </div>
  );
}