import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";
const ProtectedRoutes = () => {
  const { authenticated } = useContextProvider();

  if (!authenticated?._id) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
