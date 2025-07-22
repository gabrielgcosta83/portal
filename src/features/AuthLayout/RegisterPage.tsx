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
  first_name: yup.string().required("Nome é obrigatório"),
  last_name: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  client_profile: yup.object({
    phone: yup
      .string()
    //   .matches(/^\+55 \(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
      .required("Telefone é obrigatório"),
    birth_date: yup.string().nullable(),
    cep: yup
      .string()
    //   .matches(/^\d{5}-\d{3}$/, "CEP inválido")
      .nullable(),
    street: yup.string().nullable(),
    number: yup.string().nullable(),
    complement: yup.string().nullable(),
    neighborhood: yup.string().nullable(),
    city: yup.string().nullable(),
    state: yup.string().nullable(),
  }),
});

type RegisterFormData = yup.InferType<typeof schema>;

export default function RegisterForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      client_profile: {
        phone: "",
        birth_date: null,
        cep: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      },
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await api.post("/auth/register/client/", data);
      setSnackbarOpen(true);
      reset();
    } catch (error) {
      console.error("Erro ao registrar", error);
    }
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const address = await response.json();

      if (!address.erro) {
        setValue("client_profile.street", address.logradouro || "");
        setValue("client_profile.neighborhood", address.bairro || "");
        setValue("client_profile.city", address.localidade || "");
        setValue("client_profile.state", address.uf || "");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Novo Cadastro
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Email e Senha */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="E-mail"
              variant="standard"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              type="password"
              label="Senha"
              variant="standard"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
          </Grid>

          {/* Nome e Sobrenome */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Nome"
              variant="standard"
              fullWidth
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              {...register("first_name")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Sobrenome"
              variant="standard"
              fullWidth
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
              {...register("last_name")}
            />
          </Grid>

          {/* Telefone e Data de nascimento */}
          {/* Telefone */}
          <Grid size={{ xs: 6, sm: 6 }}>
            <TextField
              label="Telefone"
              variant="standard"
              fullWidth
              error={!!errors.client_profile?.phone}
              helperText={errors.client_profile?.phone?.message}
              {...register("client_profile.phone")}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 6 }}>
            <TextField
              type="date"
              label="Data de Nascimento"
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.client_profile?.birth_date}
              helperText={errors.client_profile?.birth_date?.message}
              {...register("client_profile.birth_date")}
            />
          </Grid>
        </Grid>

        {/* Endereço */}

        <Typography variant="h6" mt={3} mb={1}>
          Endereço
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 4, sm: 4 }}>
            <TextField
              label="CEP"
              variant="standard"
              fullWidth
              error={!!errors.client_profile?.cep}
              helperText={errors.client_profile?.cep?.message}
              {...register("client_profile.cep")}
              onBlur={handleCepBlur}
            />
          </Grid>

          <Grid size={{ xs: 8, sm: 8 }} display={"flex"} alignItems={"flex-end"}>
            <Typography variant="body1" fontSize={12}>
              Preencha o CEP para buscar o endereço automaticamente{" "}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Rua"
              variant="standard"
              fullWidth
              error={!!errors.client_profile?.street}
              helperText={errors.client_profile?.street?.message}
              {...register("client_profile.street")}
            />
          </Grid>

          <Grid size={{ xs: 4, sm: 2 }}>
            <TextField
              label="Número"
              variant="standard"
              fullWidth
              error={!!errors.client_profile?.number}
              helperText={errors.client_profile?.number?.message}
              {...register("client_profile.number")}
            />
          </Grid>

          <Grid size={{ xs: 8, sm: 4 }}>
            <TextField
              label="Complemento"
              variant="standard"
              fullWidth
              {...register("client_profile.complement")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 5 }}>
            <TextField
              label="Bairro"
              variant="standard"
              fullWidth
              error={!!errors.client_profile?.neighborhood}
              helperText={errors.client_profile?.neighborhood?.message}
              {...register("client_profile.neighborhood")}
            />
          </Grid>

          <Grid size={{ xs: 8, sm: 5 }}>
            <TextField
              label="Cidade"
              variant="standard"
              fullWidth
              error={!!errors.client_profile?.city}
              helperText={errors.client_profile?.city?.message}
              {...register("client_profile.city")}
            />
          </Grid>

          <Grid size={{ xs: 4, sm: 2 }}>
            <TextField
              label="UF"
              variant="standard"
              fullWidth
              error={!!errors.client_profile?.state}
              helperText={errors.client_profile?.state?.message}
              {...register("client_profile.state")}
            />
          </Grid>

          {/* Botão */}
          <Grid size={{ xs: 12 }}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Link to="/">
        <Typography variant="body2" my={1} textAlign="center">
          Voltar a tela de login
        </Typography>
      </Link>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success">Cadastro realizado com sucesso!</Alert>
      </Snackbar>
    </Paper>
  );
}
