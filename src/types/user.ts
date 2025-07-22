
export interface ClientProfile {
  phone: string;
  birth_date: string | null;
  health_insurance: string;
  lesions: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ProfessorProfile {
  id: number;
  bio: string;
  specialties: string[];
  // adicione outros campos conforme seu serializer
}

export type UserRole = "ADMIN" | "CLIENT" | "PROFESSOR"; // ajuste conforme seu enum real no backend

export interface AdminUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  client_profile: ClientProfile | null;
  professor_profile: ProfessorProfile | null;
}

