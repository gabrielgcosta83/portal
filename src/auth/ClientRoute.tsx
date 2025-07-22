import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

interface Props {
  children: React.ReactNode;
}

const ClientRoute = ({ children }: Props) => {
  const { isAuthenticated, isClient } = useAuth();

  if (!isAuthenticated || !isClient) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ClientRoute;
