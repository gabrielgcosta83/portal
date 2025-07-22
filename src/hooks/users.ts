import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios"
import type { AdminUser } from "@/types/user";


// -------------------------
// GET LIST
// -------------------------

export const useGetAdmins = () =>
  useQuery<AdminUser[]>({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await api.get("/admin/users/?role=ADMIN");
      return res.data;
    },
  });

export const useGetClients = () =>
  useQuery<AdminUser[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await api.get("/admin/users/?role=CLIENT");
      return res.data;
    },
  });

export const useGetProfessors = () =>
  useQuery<AdminUser[]>({
    queryKey: ["professors"],
    queryFn: async () => {
      const res = await api.get("/admin/users/?role=PROFESSOR");
      return res.data;
    },
  });

// -------------------------
// GET BY ID
// -------------------------

// export const useGetAdminById = (id: number | string) =>
//   useQuery<AdminUser>({
//     queryKey: ["admin", id],
//     queryFn: async () => {
//       const res = await api.get(`/admin/users/${id}/`);
//       return res.data;
//     },
//     enabled: !!id,
//   });

// export const useGetClientById = (id: number | string) =>
//   useQuery<AdminUser>({
//     queryKey: ["client", id],
//     queryFn: async () => {
//       const res = await api.get(`/admin/users/${id}/`);
//       return res.data;
//     },
//     enabled: !!id,
//   });

// export const useGetProfessorById = (id: number | string) =>
//   useQuery<AdminUser>({
//     queryKey: ["professor", id],
//     queryFn: async () => {
//       const res = await api.get(`/admin/users/${id}/`);
//       return res.data;
//     },
//     enabled: !!id,
//   });

// // -------------------------
// // CREATE
// // -------------------------

// export const useCreateAdmin = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (data: Partial<AdminUser>) => {
//       const res = await api.post("/admin/users/", data);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["admins"]);
//     },
//   });
// };

// export const useCreateClient = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (data: Partial<AdminUser>) => {
//       const res = await api.post("/admin/users/", data);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["clients"]);
//     },
//   });
// };

// export const useCreateProfessor = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (data: Partial<AdminUser>) => {
//       const res = await api.post("/admin/users/", data);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["professors"]);
//     },
//   });
// };

// // -------------------------
// // UPDATE
// // -------------------------

// export const useUpdateAdmin = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({
//       id,
//       data,
//     }: {
//       id: number | string;
//       data: Partial<AdminUser>;
//     }) => {
//       const res = await api.put(`/admin/users/${id}/`, data);
//       return res.data;
//     },
//     onSuccess: (_, { id }) => {
//       queryClient.invalidateQueries(["admin", id]);
//       queryClient.invalidateQueries(["admins"]);
//     },
//   });
// };

// export const useUpdateClient = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({
//       id,
//       data,
//     }: {
//       id: number | string;
//       data: Partial<AdminUser>;
//     }) => {
//       const res = await api.put(`/admin/users/${id}/`, data);
//       return res.data;
//     },
//     onSuccess: (_, { id }) => {
//       queryClient.invalidateQueries(["client", id]);
//       queryClient.invalidateQueries(["clients"]);
//     },
//   });
// };

// export const useUpdateProfessor = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({
//       id,
//       data,
//     }: {
//       id: number | string;
//       data: Partial<AdminUser>;
//     }) => {
//       const res = await api.put(`/admin/users/${id}/`, data);
//       return res.data;
//     },
//     onSuccess: (_, { id }) => {
//       queryClient.invalidateQueries(["professor", id]);
//       queryClient.invalidateQueries(["professors"]);
//     },
//   });
// };
