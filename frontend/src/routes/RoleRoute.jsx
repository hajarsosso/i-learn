import { Navigate } from "react-router-dom";

export default function RoleRoute({
  children,
  role,
}) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}