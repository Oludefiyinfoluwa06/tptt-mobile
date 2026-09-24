import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import * as authApi from '@/api/auth';
import type { LoginPayload, RegisterPayload, User } from '@/api/auth';
import { authStorage } from '@/lib/auth-storage';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const token = await authStorage.getToken();
      if (!token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const profile = await authApi.getProfile();
        setUser(profile);
      } catch {
        await authStorage.clearToken();
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrap();
  }, []);

  async function login(payload: LoginPayload) {
    const { token, user: loggedInUser } = await authApi.login(payload);
    await authStorage.setToken(token);
    setUser(loggedInUser);
  }

  async function register(payload: RegisterPayload) {
    const { token, user: newUser } = await authApi.register(payload);
    await authStorage.setToken(token);
    setUser(newUser);
  }

  async function logout() {
    await authStorage.clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isBootstrapping, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
