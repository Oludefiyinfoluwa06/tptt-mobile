import { apiClient } from '@/api/client';

export type Role = 'customer' | 'admin';

export type User = {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  role: Role;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type RegisterPayload = {
  fullname: string;
  email: string;
  phone?: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
  return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
  return data;
}

export async function getProfile(): Promise<User> {
  const { data } = await apiClient.get<{ user: User }>('/auth/profile');
  return data.user;
}
