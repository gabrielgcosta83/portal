import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useGetClients } from "@/hooks/users";
import AddIcon from "@mui/icons-material/Add";
import type { AdminUser } from "@/types/user";

export default function ClientsPage() {
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [search, setSearch] = useState("");
  const { data: users = [], isLoading } = useGetClients();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  console.log(users);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.client_profile?.city?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      valueGetter: (_value, row) =>
        `${row?.first_name || ""} ${row?.last_name || ""}`,
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "phone",
      headerName: "Telefone",
      flex: 1,
      valueGetter: (_value, row) => row?.client_profile?.phone || "-",
    },
    {
      field: "city",
      headerName: "Cidade",
      flex: 1,
      valueGetter: (_value, row) => row?.client_profile?.city || "-",
    },
    {
      field: "health_insurance",
      headerName: "Plano de Saúde",
      flex: 1,
      valueGetter: (_value, row) =>
        row?.client_profile?.health_insurance || "-",
    },
  ];

  return (
    <Grid container spacing={2}>
      {/* Filtros */}
      {/* <Grid size={{ xs: 12, md: 2 }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6">Filtros</Typography>
        </Paper>
      </Grid> */}

      {/* Lista com DataGrid */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper
          elevation={2}
          sx={{
            height: "70vh",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4">Alunos cadastrados</Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
              Novo Aluno
            </Button>
          </Box>
          <TextField
            fullWidth
            label="Buscar por nome, email ou cidade"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Divider sx={{ mb: 2 }} />
          <DataGrid
            rows={filteredUsers ?? []}
            getRowId={(row) => row.id}
            columns={columns}
            pageSizeOptions={[1, 25, 50]}
            loading={isLoading}
            onRowClick={(params: GridRowParams) => setSelectedUser(params.row)}
            sx={{ flex: 1 }}
          />
        </Paper>
      </Grid>

      {/* Detalhes do aluno selecionado */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6">Detalhes do aluno</Typography>
          <Divider sx={{ my: 1 }} />
          {selectedUser ? (
            <>
              <Typography>
                Nome: {selectedUser.first_name} {selectedUser.last_name}
              </Typography>
              <Typography>Email: {selectedUser.email}</Typography>
              <Typography>
                Telefone: {selectedUser.client_profile?.phone}
              </Typography>
              <Typography>
                Plano de Saúde: {selectedUser.client_profile?.health_insurance}
              </Typography>
              <Typography>
                Lesões: {selectedUser.client_profile?.lesions}
              </Typography>
              <Typography>
                Cidade: {selectedUser.client_profile?.city}
              </Typography>
              <Typography>CEP: {selectedUser.client_profile?.cep}</Typography>
              <Typography>
                Endereço: {selectedUser.client_profile?.street},{" "}
                {selectedUser.client_profile?.number}
              </Typography>
            </>
          ) : (
            <Typography>Selecione um aluno para ver os detalhes</Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

// import { Grid, Paper, Typography, List, ListItemButton, Divider } from "@mui/material";
// import { useState } from "react";
// // tipo contendo client_profile
// import { useGetClients } from "@/hooks/users"; // hook para listar alunos
// import type { AdminUser } from "@/types/user";

// export default function ClientsPage() {
//   const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
//   const { data: users = [], isLoading } = useGetClients();

//   return (
//     <Grid container spacing={2}>
//       {/* Filtros */}
//       <Grid size={{ xs:3 }} >
//         <Paper elevation={2} sx={{ p: 2 }}>
//           <Typography variant="h6">Filtros</Typography>
//           {/* Aqui vão os campos de filtro - TextField, Select etc. */}
//         </Paper>
//       </Grid>

//       {/* Lista de Alunos */}
//       <Grid size={{ xs:5 }} >
//         <Paper elevation={2} sx={{ p: 2 }}>
//           <Typography variant="h6">Alunos cadastrados</Typography>
//           <Divider sx={{ my: 1 }} />
//           <List>
//             {isLoading ? (
//               <Typography>Carregando...</Typography>
//             ) : (
//               users.map((user) => (
//                 <ListItemButton
//                   key={user.id}
//                   selected={selectedUser?.id === user.id}
//                   onClick={() => setSelectedUser(user)}
//                 >
//                   <Typography>
//                     {user.first_name} {user.last_name} - {user.client_profile?.city}
//                   </Typography>
//                 </ListItemButton>
//               ))
//             )}
//           </List>
//         </Paper>
//       </Grid>

//       {/* Detalhes do Aluno Selecionado */}
//       <Grid size={{ xs:4 }} >
//         <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
//           <Typography variant="h6">Detalhes do aluno</Typography>
//           <Divider sx={{ my: 1 }} />
//           {selectedUser ? (
//             <>
//               <Typography>Nome: {selectedUser.first_name} {selectedUser.last_name}</Typography>
//               <Typography>Email: {selectedUser.email}</Typography>
//               <Typography>Telefone: {selectedUser.client_profile?.phone}</Typography>
//               <Typography>Plano de Saúde: {selectedUser.client_profile?.health_insurance}</Typography>
//               <Typography>Lesões: {selectedUser.client_profile?.lesions}</Typography>
//               <Typography>Cidade: {selectedUser.client_profile?.city}</Typography>
//               {/* etc. */}
//             </>
//           ) : (
//             <Typography>Selecione um aluno para ver os detalhes</Typography>
//           )}
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }
