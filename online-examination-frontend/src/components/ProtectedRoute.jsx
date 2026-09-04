import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRole, children }) {

  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").toUpperCase();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/courses" replace />;
  }

  return children ? children : <Outlet />;
}