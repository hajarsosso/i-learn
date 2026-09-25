export default function AuthButton({
  text,
  type = "button",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        bg-[#0b1975]
        text-white
        py-3
        rounded-full
        font-medium
        transition-all
        duration-200
        hover:bg-[#09145f]
        hover:scale-[1.01]
        active:scale-[0.99]
        cursor-pointer
      "
    >
      {text}
    </button>
  );
}