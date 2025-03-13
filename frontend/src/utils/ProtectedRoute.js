import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("authToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
