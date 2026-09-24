import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { bookingKeys, getMyBookings } from '@/api/bookings';
import { getMyVisaRequests, visaKeys } from '@/api/visa';
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
  const router = useRouter();

  const bookingsQuery = useQuery({ queryKey: bookingKeys.mine, queryFn: getMyBookings });
  const visaQuery = useQuery({ queryKey: visaKeys.mine, queryFn: getMyVisaRequests });

  const bothPending = bookingsQuery.isPending && visaQuery.isPending;
  const bothErrored = bookingsQuery.isError && visaQuery.isError;
  const isRefreshing = bookingsQuery.isRefetching || visaQuery.isRefetching;

  function handleRefresh() {
    bookingsQuery.refetch();
    visaQuery.refetch();
  }

  if (bothPending) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ThemedText themeColor="textSecondary">Loading your requests…</ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (bothErrored) {
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
          <Button label="Retry" onPress={handleRefresh} loading={isRefreshing} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  const bookings = bookingsQuery.data ?? [];
  const visaRequests = visaQuery.data ?? [];
  const hasNoRequests =
    bookingsQuery.isSuccess && visaQuery.isSuccess && bookings.length === 0 && visaRequests.length === 0;

  if (hasNoRequests) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <IconCircle sf="doc.text" md="assignment" size={72} />
          <ThemedText type="subtitle">No requests yet</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centeredMessage}>
            Book a package or apply for a visa to track its status here.
          </ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
          <ThemedView style={styles.header}>
            <ThemedText style={styles.title}>My Requests</ThemedText>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Bookings</ThemedText>
            {bookingsQuery.isError ? (
              <ThemedText style={styles.sectionEmptyText} themeColor="danger">
                Couldn&apos;t load your bookings.
              </ThemedText>
            ) : bookings.length === 0 ? (
              <ThemedText style={styles.sectionEmptyText} themeColor="textSecondary">
                No bookings yet.
              </ThemedText>
            ) : (
              bookings.map((item) => (
                <Card key={item._id} style={styles.bookingCard}>
                  {item.packageId.image ? (
                    <Image
                      source={{ uri: item.packageId.image }}
                      style={styles.image}
                      contentFit="cover"
                    />
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
              ))
            )}
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedView style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Visa Requests</ThemedText>
              <Pressable
                style={styles.newButton}
                onPress={() => router.push('/(tabs)/my-requests/apply-visa')}>
                <AppIcon sf="plus" md="add" size={16} color={theme.primary} />
                <ThemedText type="linkPrimary">New</ThemedText>
              </Pressable>
            </ThemedView>
            {visaQuery.isError ? (
              <ThemedText style={styles.sectionEmptyText} themeColor="danger">
                Couldn&apos;t load your visa requests.
              </ThemedText>
            ) : visaRequests.length === 0 ? (
              <ThemedText style={styles.sectionEmptyText} themeColor="textSecondary">
                No visa requests yet.
              </ThemedText>
            ) : (
              visaRequests.map((item) => (
                <Pressable
                  key={item._id}
                  onPress={() => router.push(`/(tabs)/my-requests/visa/${item._id}`)}>
                  <Card style={styles.visaCard}>
                    <ThemedText style={styles.cardTitle}>
                      {item.visaType} visa · {item.country}
                    </ThemedText>
                    <ThemedText themeColor="textSecondary" numberOfLines={2}>
                      {item.purpose}
                    </ThemedText>
                    <StatusBadge status={item.status} />
                  </Card>
                </Pressable>
              ))
            )}
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
