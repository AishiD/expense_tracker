import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return;
  }

  return !user ? children : <Navigate to="/" replace />;
};

export default PublicRoute;