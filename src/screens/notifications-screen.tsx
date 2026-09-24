import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getNotifications, markNotificationAsRead, notificationKeys } from '@/api/notifications';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { IconCircle } from '@/components/icon-circle';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { formatRelativeTime } from '@/lib/format';

import { styles } from './notifications-screen.styles';

export default function NotificationsScreen() {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useQuery({ queryKey: notificationKeys.mine, queryFn: getNotifications });

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.mine });
    },
  });

  if (isPending) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ThemedText themeColor="textSecondary">Loading notifications…</ThemedText>
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
          <ThemedText type="subtitle">Couldn&apos;t load notifications</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centeredMessage}>
            Check your connection and try again.
          </ThemedText>
          <Button label="Retry" onPress={() => refetch()} loading={isRefetching} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (notifications.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <IconCircle sf="bell" md="notifications" size={72} />
          <ThemedText type="subtitle">No notifications yet</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centeredMessage}>
            Updates from the agency will show up here.
          </ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          onRefresh={refetch}
          refreshing={isRefetching}
          ListHeaderComponent={
            <ThemedView style={styles.header}>
              <ThemedText style={styles.title}>Notifications</ThemedText>
            </ThemedView>
          }
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              disabled={item.isRead}
              onPress={() => markAsReadMutation.mutate(item._id)}>
              <Card style={styles.card}>
                <ThemedView
                  style={[
                    styles.unreadDot,
                    { backgroundColor: item.isRead ? 'transparent' : theme.primary },
                  ]}
                />
                <ThemedView style={styles.cardBody}>
                  <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.cardMessage} themeColor="textSecondary" numberOfLines={2}>
                    {item.message}
                  </ThemedText>
                  <ThemedText style={styles.cardTime} themeColor="textSecondary">
                    {formatRelativeTime(new Date(item.createdAt))}
                  </ThemedText>
                </ThemedView>
              </Card>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}
