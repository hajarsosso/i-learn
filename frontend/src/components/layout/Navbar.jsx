import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-20 py-6 flex justify-between items-center">

      {/* LOGO */}
      <Link to="/">
        <div className="text-4xl font-bold text-[#16152b] cursor-pointer select-none transition-all duration-300 hover:scale-105">
          i-
          <span className="text-pink-500">
            Learn
          </span>
        </div>
      </Link>

      {/* LINKS */}
      <div className="flex items-center gap-12 text-lg font-medium">

        <Link
          to="/"
          className="cursor-pointer transition-all duration-300 hover:text-[#0d1b6b] hover:-translate-y-1"
        >
          Home
        </Link>

        <Link
          to="/courses"
          className="cursor-pointer transition-all duration-300 hover:text-[#0d1b6b] hover:-translate-y-1"
        >
          Courses
        </Link>

        <Link
          to="/about"
          className="cursor-pointer transition-all duration-300 hover:text-[#0d1b6b] hover:-translate-y-1"
        >
          About Us
        </Link>

        <Link
          to="/login"
          className="cursor-pointer transition-all duration-300 hover:text-[#0d1b6b] hover:-translate-y-1"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="
            bg-[#111827]
            text-white
            px-8
            py-3
            rounded-full
            cursor-pointer
            transition-all
            duration-300
            hover:bg-[#1f2937]
            hover:scale-105
            active:scale-95
            shadow-md
          "
        >
          Register
        </Link>

      </div>

    </nav>
  );
}