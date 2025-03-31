import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {

  const isAuthenticated = false;
  return isAuthenticated ? (
    <Outlet /> // Render the child routes if authenticated
  ) : (
    <Navigate to="/signin" /> // Redirect to sign-in page if not authenticated
  );
}

export default ProtectedRoutes;