import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

interface Props {
  children: React.ReactNode;
}

const ProfessorRoute = ({ children }: Props) => {
  const { isAuthenticated, isProfessor } = useAuth();

  if (!isAuthenticated || !isProfessor) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProfessorRoute;
