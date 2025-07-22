import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  CircularProgress,
  Paper,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/api/axios";
import { useAuth } from "@/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role: "ADMIN" | "PROFESSOR" | "CLIENT";
  exp?: number;
}

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      const response = await api.post("/auth/token/", data);
      const { access, refresh } = response.data;
      login(access, refresh);

      const decoded = jwtDecode<TokenPayload>(access);
      const userRole = decoded.role;

      if (userRole === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (userRole === "PROFESSOR") {
        navigate("/professor");
      } else if (userRole === "CLIENT") {
        navigate("/profile");
      } else {
        navigate("/"); // rota default, caso role não reconhecida
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Email ou senha inválidos.");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Bem-vindo!
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Senha"
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <Link to="/register">
              <Typography variant="body2">
                Ainda não tem conta? Cadastre-se
              </Typography>
            </Link>

            <Typography variant="body2" sx={{ mt: 1 }}>
              <Link to="/forgot-password">Esqueci minha senha</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
