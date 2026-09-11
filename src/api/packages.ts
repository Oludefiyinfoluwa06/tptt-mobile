import { apiClient } from '@/api/client';

export type Package = {
  _id: string;
  title: string;
  destination: string;
  description: string;
  duration: string;
  price: number;
  image?: string;
};

export const packageKeys = {
  all: ['packages'] as const,
  detail: (id: string) => ['packages', id] as const,
};

export async function getPackages(): Promise<Package[]> {
  const { data } = await apiClient.get<{ packages: Package[] }>('/packages');
  return data.packages;
}

export async function getPackage(id: string): Promise<Package> {
  const { data } = await apiClient.get<{ package: Package }>(`/packages/${id}`);
  return data.package;
}
