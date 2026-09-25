import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {

    if (user.role === "teacher") {
      return <Navigate to="/teacher/dashboard" />;
    }

    return <Navigate to="/student/dashboard" />;
  }

  return children;
}