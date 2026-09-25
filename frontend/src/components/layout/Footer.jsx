import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-[#0b0717] text-white px-32 py-16">
      <div className="flex justify-between">
        {/* LEFT */}

        <div>
          <div className="text-4xl font-bold cursor-pointer transition-all duration-300 hover:scale-105">
            i-
            <span className="text-pink-500">
              Learn
            </span>
          </div>

          <p className="text-gray-300 mt-6 max-w-sm leading-8 text-lg">
            Learn anytime, anywhere with
            courses, video lessons, and
            quizzes designed to help you
            progress step by step.
          </p>

          <Link to="/register">
            <button 
            className="
              mt-8
              bg-red-500
              px-10
              py-4
              rounded-full
              cursor-pointer
              transition-all
              duration-300
              hover:bg-red-600
              hover:scale-105
              active:scale-95
            "
          >
            Register
          </button>
          </Link>
        </div>

        {/* RIGHT */}

        <div>
          <h2 className="font-bold text-2xl mb-8">
            Quick Links:
          </h2>

          <div className="space-y-6 text-gray-300 text-lg">
            <p className="cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-2">
              Home
            </p>

            <p className="cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-2">
              Courses
            </p>

            <p className="cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-2">
              About Us
            </p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}

      <div className="border-t border-gray-700 mt-16 pt-8 text-center text-gray-400">
        Copyright @ 2026 i-Learn || All
        Rights Reserved
      </div>
    </footer>
  );
}