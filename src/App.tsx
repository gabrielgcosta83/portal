import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./utils/Theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/features/AuthLayout/LoginPage";
import RegisterPage from "@/features/AuthLayout/RegisterPage";
import ForgotPasswordPage from "@/features/AuthLayout/ForgotPasswordPage";
import ProfilePage from "@/pages/ProfilePage";
import SchedulePage from "@/pages/SchedulePage";
import AdminUsersPage from "@/pages/admin/AdminLayout";
import ClientRoute from "@/auth/ClientRoute";
import AdminRoute from "@/auth/AdminRoute";
import { AuthProvider } from "@/auth/AuthContext";
import AuthLayout from "@/pages/AuthLayout";
import ResetPasswordPage from "@/features/AuthLayout/ResetPasswordPage";
import AdminLayout from "@/pages/admin/AdminLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientsPage from "./features/Admin/ClientsPage";

const queryClient = new QueryClient();

let theme = createTheme(themeOptions);

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Router>
          <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              {/* Página principal: AuthLayout com Outlet */}
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Navigate to="login" />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route
                  path="forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="reset-password" element={<ResetPasswordPage />} />
              </Route>

              {/* Rotas privadas Admin */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<h1>Dashboard</h1>} />
                <Route path="clients" element={<ClientsPage />} />
              </Route>

              {/* Rotas privadas Client */}
              <Route
                path="/profile"
                element={
                  <ClientRoute>
                    <ProfilePage />
                  </ClientRoute>
                }
              />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
            </Routes>
          </AuthProvider>
          </QueryClientProvider>
        </Router>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
