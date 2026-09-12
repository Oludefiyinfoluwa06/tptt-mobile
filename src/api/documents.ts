import { Platform } from 'react-native';

import { apiClient } from '@/api/client';

export type Document = {
  _id: string;
  documentType: string;
  fileUrl: string;
  createdAt: string;
};

export const documentKeys = {
  forVisaRequest: (visaRequestId: string) => ['documents', visaRequestId] as const,
};

export async function getDocuments(visaRequestId: string): Promise<Document[]> {
  const { data } = await apiClient.get<{ documents: Document[] }>(`/documents/${visaRequestId}`);
  return data.documents;
}

export type UploadDocumentPayload = {
  visaRequestId: string;
  documentType: string;
  uri: string;
  name: string;
  mimeType: string;
  webFile?: File;
};

export async function uploadDocument(payload: UploadDocumentPayload): Promise<Document> {
  const formData = new FormData();
  formData.append('visaRequestId', payload.visaRequestId);
  formData.append('documentType', payload.documentType);

  if (Platform.OS === 'web' && payload.webFile) {
    formData.append('file', payload.webFile);
  } else {
    formData.append(
      'file',
      { uri: payload.uri, name: payload.name, type: payload.mimeType } as unknown as Blob
    );
  }

  const { data } = await apiClient.post<{ document: Document }>('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.document;
}
