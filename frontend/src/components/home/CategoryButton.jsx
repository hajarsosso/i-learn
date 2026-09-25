export default function CategoryButton({
  text,
}) {
  return (
    <button
      className="
        border
        border-gray-300
        px-6
        py-3
        rounded-full
        text-gray-700
        transition-all
        duration-300
        hover:bg-[#0b1975]
        hover:text-white
        hover:border-[#0b1975]
        hover:scale-105
        active:scale-95
      "
    >
      {text}
    </button>
  );
}