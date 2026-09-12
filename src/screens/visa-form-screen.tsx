import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { getErrorMessage } from '@/api/client';
import { createVisaRequest, visaKeys } from '@/api/visa';
import { Button } from '@/components/button';
import { ScreenHeader } from '@/components/screen-header';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { styles } from './visa-form-screen.styles';

export default function VisaFormScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [country, setCountry] = useState('');
  const [visaType, setVisaType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createVisaRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: visaKeys.mine });
      // Navigate immediately rather than from an alert's button callback —
      // react-native-web's Alert.alert is a no-op there (see booking-form-screen).
      router.replace('/(tabs)/my-requests');
      Alert.alert('Request submitted', 'Your visa request has been sent for review.');
    },
    onError: (err) => setError(getErrorMessage(err, 'Unable to submit your request.')),
  });

  function handleSubmit() {
    setError(null);
    mutation.mutate({ country: country.trim(), visaType: visaType.trim(), purpose: purpose.trim() });
  }

  const canSubmit = !!country.trim() && !!visaType.trim() && !!purpose.trim();

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Apply for Visa" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextField
          label="Country"
          value={country}
          onChangeText={setCountry}
          placeholder="e.g. Canada"
          icon={{ sf: 'globe', md: 'public' }}
        />
        <TextField
          label="Visa type"
          value={visaType}
          onChangeText={setVisaType}
          placeholder="e.g. Tourist, Business, Student"
          icon={{ sf: 'doc.text', md: 'description' }}
        />
        <TextField
          label="Purpose of travel"
          value={purpose}
          onChangeText={setPurpose}
          placeholder="Tell us about your trip"
          icon={{ sf: 'text.alignleft', md: 'notes' }}
          multiline
          numberOfLines={4}
        />

        {error ? (
          <ThemedView type="dangerMuted" style={styles.errorBanner}>
            <ThemedText style={styles.errorText} themeColor="danger">
              {error}
            </ThemedText>
          </ThemedView>
        ) : null}

        <Button
          label="Submit Request"
          onPress={handleSubmit}
          loading={mutation.isPending}
          disabled={!canSubmit}
        />
      </ScrollView>
    </ThemedView>
  );
}
