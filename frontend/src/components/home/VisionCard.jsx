export default function VisionCard({
  title,
  description,
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-8
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-3
        hover:shadow-2xl
      "
    >
      <h3
        className="
          text-3xl
          font-bold
          text-[#0f223d]
          leading-tight
        "
      >
        {title}
      </h3>

      <p
        className="
          text-gray-700
          text-lg
          leading-relaxed
          mt-6
        "
      >
        {description}
      </p>
    </div>
  );
}