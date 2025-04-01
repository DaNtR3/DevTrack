// src/components/utils/ProtectedRoutes.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // Check if there's a token in localStorage
  const token = localStorage.getItem("token");

  // If there's no token, redirect to the sign-in page
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // If there is a token, render the nested routes
  return <Outlet />;
};

export default ProtectedRoutes;
