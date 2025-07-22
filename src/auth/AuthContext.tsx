import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isProfessor: boolean;
  isClient: boolean;
}

interface JwtPayload {
  role: "ADMIN" | "PROFESSOR" | "CLIENT";
  exp?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<JwtPayload["role"] | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(savedToken);
        setToken(savedToken);
        setRole(decoded.role);
      } catch (error) {
        console.error("Token inválido", error);
        logout(); // remove token inválido
      }
    }
    setLoading(false);
  }, []);

  const login = (newAccessToken: string, refreshToken: string) => {
    localStorage.setItem("authToken", newAccessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const decoded = jwtDecode<JwtPayload>(newAccessToken);
    setToken(newAccessToken);
    setRole(decoded.role);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    navigate("/"); // redireciona para login
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        login,
        logout,
        isAuthenticated: !!token,
        isAdmin: role === "ADMIN",
        isProfessor: role === "PROFESSOR",
        isClient: role === "CLIENT",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
