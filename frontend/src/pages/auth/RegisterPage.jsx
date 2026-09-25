import { useState } from "react";
import axios from "axios";

import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function RegisterPage() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Registration successful");
    } catch (error) {
      console.log(error);

      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col overflow-hidden">
      {/* NAVBAR */}

      <Navbar />

      {/* REGISTER */}

      <div className="flex-1 flex justify-center items-center py-20 px-6">
        <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-lg p-16">
          <h1 className="text-5xl font-bold text-center text-[#111827]">
            Create Your Account
          </h1>

          <p className="text-center text-gray-500 mt-4 text-lg">
            Create an account and start
            learning today
          </p>

          {/* GOOGLE */}

          <button
            className="
              w-full
              border
              mt-12
              py-4
              rounded-full
              flex
              items-center
              justify-center
              gap-4
              text-lg
              font-medium
              cursor-pointer
              transition-all
              duration-300
              hover:bg-gray-50
              hover:shadow-md
            "
          >
            <FaGoogle className="text-xl" />

            Sign up with Google
          </button>

          {/* DIVIDER */}

          <div className="flex items-center gap-4 my-10">
            <div className="h-[1px] bg-gray-300 flex-1"></div>

            <span className="text-gray-400">
              or
            </span>

            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleRegister}
            className="space-y-8"
          >
            <AuthInput
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <AuthInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            {/* PASSWORD */}

            <div>
              <label className="font-medium text-gray-800">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
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

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-[#0b1975]
                    transition-all
                    duration-200
                    cursor-pointer
                  "
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            {/* TERMS */}

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="
                  w-4
                  h-4
                  accent-[#0d1b6b]
                  cursor-pointer
                "
              />

              <p className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="font-semibold text-[#0d1b6b]">
                  Terms & Privacy
                </span>
              </p>
            </div>

            {/* BUTTON */}

            <AuthButton
              text={
                loading
                  ? "Loading..."
                  : "Register"
              }
              type="submit"
            />

            <p className="text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-[#0d1b6b] font-semibold cursor-pointer hover:underline">
                Log In
              </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}