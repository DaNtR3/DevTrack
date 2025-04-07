import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticated }) => {
  // If the user is not authenticated, redirect to the sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // If the user is authenticated, render the nested routes
  return <Outlet />;
};

export default ProtectedRoutes;