import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
