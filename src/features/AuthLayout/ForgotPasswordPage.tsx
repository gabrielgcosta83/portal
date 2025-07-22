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
import api from "@/api/axios";
import { Link } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

type ForgotPasswordFormData = yup.InferType<typeof schema>;

export default function ForgotPasswordForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      await api.post("/auth/password-reset/", data);
      setSnackbarOpen(true);
      reset();
    } catch (error: any) {
      setErrorMessage("Erro ao solicitar recuperação. Verifique o email.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Recuperar Senha
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="E-mail"
              variant="standard"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Enviar Link de Recuperação
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
        <Alert severity="success">
          Link de recuperação enviado! Verifique seu e-mail.
        </Alert>
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
