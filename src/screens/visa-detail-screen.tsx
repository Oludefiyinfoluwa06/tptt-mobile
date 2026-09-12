import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as DocumentPicker from 'expo-document-picker';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';

import { getErrorMessage } from '@/api/client';
import { documentKeys, getDocuments, uploadDocument } from '@/api/documents';
import { visaKeys, type VisaRequest } from '@/api/visa';
import { AppIcon } from '@/components/app-icon';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { ScreenHeader } from '@/components/screen-header';
import { StatusBadge } from '@/components/status-badge';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

import { styles } from './visa-detail-screen.styles';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export default function VisaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [documentType, setDocumentType] = useState('');
  const [error, setError] = useState<string | null>(null);

  const visaRequest = queryClient
    .getQueryData<VisaRequest[]>(visaKeys.mine)
    ?.find((item) => item._id === id);

  const {
    data: documents,
    isPending: isDocumentsPending,
    isError: isDocumentsError,
  } = useQuery({
    queryKey: documentKeys.forVisaRequest(id),
    queryFn: () => getDocuments(id),
    enabled: !!id,
  });

  const uploadMutation = useMutation({
    mutationFn: uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.forVisaRequest(id) });
      setDocumentType('');
    },
    onError: (err) => setError(getErrorMessage(err, 'Unable to upload document.')),
  });

  async function handlePickAndUpload() {
    setError(null);
    if (!documentType.trim()) {
      setError('Enter a document type first (e.g. Passport).');
      return;
    }

    const result = await DocumentPicker.getDocumentAsync({ type: ACCEPTED_TYPES });
    const asset = result.assets?.[0];
    if (result.canceled || !asset) return;

    uploadMutation.mutate({
      visaRequestId: id,
      documentType: documentType.trim(),
      uri: asset.uri,
      name: asset.name,
      mimeType: asset.mimeType ?? 'application/octet-stream',
      webFile: result.output?.[0],
    });
  }

  if (!visaRequest) {
    return (
      <ThemedView style={styles.container}>
        <ScreenHeader title="Visa Request" />
        <View style={styles.centered}>
          <ThemedText type="subtitle">Visa request not found</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centeredMessage}>
            Go back to My Requests and try again.
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title={`${visaRequest.visaType} Visa`} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.infoCard}>
          <ThemedText style={styles.infoTitle}>
            {visaRequest.visaType} visa · {visaRequest.country}
          </ThemedText>
          <ThemedText themeColor="textSecondary">{visaRequest.purpose}</ThemedText>
          <StatusBadge status={visaRequest.status} />
        </Card>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Documents</ThemedText>

          {isDocumentsPending ? (
            <ThemedText themeColor="textSecondary">Loading documents…</ThemedText>
          ) : isDocumentsError ? (
            <ThemedText style={styles.emptyText} themeColor="danger">
              Couldn&apos;t load documents.
            </ThemedText>
          ) : documents.length === 0 ? (
            <ThemedText style={styles.emptyText} themeColor="textSecondary">
              No documents uploaded yet.
            </ThemedText>
          ) : (
            documents.map((doc) => (
              <Pressable key={doc._id} onPress={() => Linking.openURL(doc.fileUrl)}>
                <Card style={styles.documentRow}>
                  <ThemedView type="primaryMuted" style={styles.documentIcon}>
                    <AppIcon sf="doc.fill" md="description" size={18} color={theme.primary} />
                  </ThemedView>
                  <ThemedView style={styles.documentBody}>
                    <ThemedText style={styles.documentType}>{doc.documentType}</ThemedText>
                    <ThemedText themeColor="textSecondary">Tap to view</ThemedText>
                  </ThemedView>
                </Card>
              </Pressable>
            ))
          )}
        </ThemedView>

        <ThemedView style={styles.uploadForm}>
          <TextField
            label="Document type"
            value={documentType}
            onChangeText={setDocumentType}
            placeholder="e.g. Passport, Photo, Bank Statement"
            icon={{ sf: 'doc.badge.plus', md: 'note_add' }}
          />

          {error ? (
            <ThemedView type="dangerMuted" style={styles.errorBanner}>
              <ThemedText style={styles.errorText} themeColor="danger">
                {error}
              </ThemedText>
            </ThemedView>
          ) : null}

          <Button
            label="Choose File & Upload"
            onPress={handlePickAndUpload}
            loading={uploadMutation.isPending}
          />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
