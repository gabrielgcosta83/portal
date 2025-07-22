import { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import api from "@/api/axios";

const schema = yup.object({
  new_password: yup
    .string()
    .required("Nova senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
});

type ResetPasswordPageData = yup.InferType<typeof schema>;

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPageData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ResetPasswordPageData> = async (data) => {
    if (!uid || !token) {
      setErrorMessage("Link inválido ou expirado.");
      return;
    }

    try {
      await api.post("/auth/password-reset-confirm/", {
        uid,
        token,
        new_password: data.new_password,
      });
      setSnackbarOpen(true);
            setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      setErrorMessage("Erro ao redefinir senha. Tente novamente.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Redefinir Senha
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              type="password"
              label="Nova Senha"
              variant="standard"
              fullWidth
              error={!!errors.new_password}
              helperText={errors.new_password?.message}
              {...register("new_password")}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              type="password"
              label="Confirmar Nova Senha"
              variant="standard"
              fullWidth
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
              {...register("confirm_password")}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Redefinir Senha
            </Button>
          </Grid>
        </Grid>
      </form>

      <Link to="/">
        <Typography variant="body2" my={2} textAlign="center">
          Voltar à tela de login
        </Typography>
      </Link>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success">Senha redefinida com sucesso!</Alert>
      </Snackbar>

      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={4000}
          onClose={() => setErrorMessage("")}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      )}
    </Paper>
  );
}
