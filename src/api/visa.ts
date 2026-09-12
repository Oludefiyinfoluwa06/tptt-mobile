import { apiClient } from '@/api/client';

export type VisaStatus = 'submitted' | 'documents_received' | 'processing' | 'approved' | 'rejected';

export type VisaRequest = {
  _id: string;
  country: string;
  visaType: string;
  purpose: string;
  status: VisaStatus;
  createdAt: string;
};

export type CreateVisaRequestPayload = {
  country: string;
  visaType: string;
  purpose: string;
};

export const visaKeys = {
  mine: ['visa-requests', 'mine'] as const,
};

export async function createVisaRequest(payload: CreateVisaRequestPayload): Promise<VisaRequest> {
  const { data } = await apiClient.post<{ visaRequest: VisaRequest }>('/visa', payload);
  return data.visaRequest;
}

export async function getMyVisaRequests(): Promise<VisaRequest[]> {
  const { data } = await apiClient.get<{ visaRequests: VisaRequest[] }>('/visa/my-requests');
  return data.visaRequests;
}
