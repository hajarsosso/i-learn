export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-800">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          border
          border-gray-300
          rounded-full
          px-5
          py-3
          outline-none
          transition-all
          duration-200
          focus:border-[#0b1975]
          focus:ring-2
          focus:ring-[#0b1975]/20
        "
      />
    </div>
  );
}