import { create, isAxiosError } from 'axios';

import { API_URL } from '@/constants/env';
import { authStorage } from '@/lib/auth-storage';

export const apiClient = create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  return fallback;
}
