import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { bookingKeys, getMyBookings } from '@/api/bookings';
import { AppIcon } from '@/components/app-icon';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { IconCircle } from '@/components/icon-circle';
import { StatusBadge } from '@/components/status-badge';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { formatDisplayDate } from '@/lib/format';

import { styles } from './my-requests-screen.styles';

export default function MyRequestsScreen() {
  const theme = useTheme();
  const {
    data: bookings,
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: bookingKeys.mine,
    queryFn: getMyBookings,
  });

  if (isPending) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ThemedText themeColor="textSecondary">Loading your requests…</ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <IconCircle
            sf="exclamationmark.triangle"
            md="error_outline"
            size={72}
            backgroundColor={theme.dangerMuted}
            iconColor={theme.danger}
          />
          <ThemedText type="subtitle">Couldn&apos;t load your requests</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centeredMessage}>
            Check your connection and try again.
          </ThemedText>
          <Button label="Retry" onPress={() => refetch()} loading={isRefetching} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (bookings.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <IconCircle sf="doc.text" md="assignment" size={72} />
          <ThemedText type="subtitle">No requests yet</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centeredMessage}>
            Book a package and track its status here.
          </ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          onRefresh={refetch}
          refreshing={isRefetching}
          ListHeaderComponent={
            <ThemedView style={styles.header}>
              <ThemedText style={styles.title}>My Requests</ThemedText>
            </ThemedView>
          }
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              {item.packageId.image ? (
                <Image source={{ uri: item.packageId.image }} style={styles.image} contentFit="cover" />
              ) : (
                <ThemedView type="primaryMuted" style={styles.image} />
              )}

              <ThemedView style={styles.cardBody}>
                <ThemedText style={styles.cardTitle} numberOfLines={1}>
                  {item.packageId.title}
                </ThemedText>
                <ThemedView style={styles.metaRow}>
                  <AppIcon sf="calendar" md="calendar_today" size={13} color={theme.textSecondary} />
                  <ThemedText themeColor="textSecondary">
                    {formatDisplayDate(new Date(item.travelDate))}
                  </ThemedText>
                </ThemedView>
                <ThemedView style={styles.metaRow}>
                  <AppIcon sf="person.2" md="groups" size={13} color={theme.textSecondary} />
                  <ThemedText themeColor="textSecondary">
                    {item.travelers} {item.travelers === 1 ? 'traveler' : 'travelers'}
                  </ThemedText>
                </ThemedView>
                <StatusBadge status={item.status} />
              </ThemedView>
            </Card>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}
