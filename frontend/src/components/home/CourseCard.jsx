export default function CourseCard({
  image,
  title,
  author,
  category,
}) {
  return (
    <div
      className="
        bg-[#f3f3f3]
        rounded-3xl
        overflow-hidden
        p-5
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}

      <img
        src={image}
        alt={title}
        className="
          w-full
          h-[260px]
          object-cover
          rounded-2xl
        "
      />

      {/* CONTENT */}

      <div className="mt-6">
        <h3
          className="
            text-3xl
            font-bold
            text-[#111827]
          "
        >
          {title}
        </h3>

        <p className="text-gray-400 mt-2 text-lg">
          Par {author}
        </p>

        {/* FOOTER */}

        <div className="flex items-center justify-between mt-6">
          <span
            className="
              bg-[#eef6f7]
              text-[#111827]
              px-4
              py-2
              rounded-xl
              text-sm
            "
          >
            {category}
          </span>

          <button
            className="
              bg-[#0b73d9]
              text-white
              px-6
              py-3
              rounded-full
              transition-all
              duration-300
              hover:bg-[#095cb0]
              hover:scale-105
              active:scale-95
            "
          >
            Voir le cours
          </button>
        </div>
      </div>
    </div>
  );
}