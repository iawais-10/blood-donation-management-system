import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="container">Loading...</div>;

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  if (Array.isArray(allowRoles) && allowRoles.length > 0) {
    if (!allowRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}
