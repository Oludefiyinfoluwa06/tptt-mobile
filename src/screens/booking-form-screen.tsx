import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

import { bookingKeys, createBooking } from '@/api/bookings';
import { getErrorMessage } from '@/api/client';
import { getPackage, packageKeys } from '@/api/packages';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { DateField } from '@/components/date-field';
import { ScreenHeader } from '@/components/screen-header';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { formatPrice } from '@/lib/format';

import { styles } from './booking-form-screen.styles';

function tomorrow(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

export default function BookingFormScreen() {
  const { packageId } = useLocalSearchParams<{ packageId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [travelers, setTravelers] = useState('1');
  const [travelDate, setTravelDate] = useState(tomorrow);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { data: pkg, isPending: isPackagePending } = useQuery({
    queryKey: packageKeys.detail(packageId),
    queryFn: () => getPackage(packageId),
    enabled: !!packageId,
  });

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.mine });
      // Navigate immediately rather than from the alert's button callback —
      // react-native-web's Alert.alert is a no-op on web (no dialog, no
      // callback), which would otherwise strand the user on this form there.
      router.replace('/(tabs)/my-requests');
      Alert.alert('Request submitted', 'Your booking request has been sent for review.');
    },
    onError: (err) => setError(getErrorMessage(err, 'Unable to submit your request.')),
  });

  function handleSubmit() {
    setError(null);
    const travelersCount = parseInt(travelers, 10);

    if (!travelersCount || travelersCount < 1) {
      setError('Enter a valid number of travelers.');
      return;
    }

    mutation.mutate({
      packageId,
      travelers: travelersCount,
      travelDate: travelDate.toISOString(),
      notes: notes.trim() || undefined,
    });
  }

  if (isPackagePending) {
    return (
      <ThemedView style={styles.container}>
        <ScreenHeader title="Request Booking" />
        <View style={styles.centered}>
          <ThemedText themeColor="textSecondary">Loading…</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Request Booking" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {pkg ? (
          <Card style={styles.summaryCard}>
            <ThemedText style={styles.summaryTitle}>{pkg.title}</ThemedText>
            <ThemedText themeColor="textSecondary">{pkg.destination}</ThemedText>
            <ThemedText themeColor="textSecondary">
              {pkg.duration} · {formatPrice(pkg.price)} per person
            </ThemedText>
          </Card>
        ) : null}

        <ThemedView style={styles.form}>
          <TextField
            label="Number of travelers"
            value={travelers}
            onChangeText={setTravelers}
            keyboardType="number-pad"
            placeholder="1"
          />
          <DateField label="Travel date" value={travelDate} onChange={setTravelDate} minimumDate={tomorrow()} />
          <TextField
            label="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            placeholder="Any special requests?"
            multiline
            numberOfLines={3}
          />

          {error ? (
            <ThemedView type="dangerMuted" style={styles.errorBanner}>
              <ThemedText style={styles.errorText} themeColor="danger">
                {error}
              </ThemedText>
            </ThemedView>
          ) : null}

          <Button label="Submit Request" onPress={handleSubmit} loading={mutation.isPending} />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
