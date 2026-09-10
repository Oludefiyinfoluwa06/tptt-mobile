import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getPackages, packageKeys } from '@/api/packages';
import { Button } from '@/components/button';
import { IconCircle } from '@/components/icon-circle';
import { PackageCard } from '@/components/package-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

import { styles } from './packages-list-screen.styles';

export default function PackagesListScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { data: packages, isPending, isError, refetch, isRefetching } = useQuery({
    queryKey: packageKeys.all,
    queryFn: getPackages,
  });

  if (isPending) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ThemedText themeColor="textSecondary">Loading packages…</ThemedText>
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
          <ThemedText type="subtitle">Couldn&apos;t load packages</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centeredMessage}>
            Check your connection and try again.
          </ThemedText>
          <Button label="Retry" onPress={() => refetch()} loading={isRefetching} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (packages.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <IconCircle sf="airplane" md="flight" size={72} />
          <ThemedText type="subtitle">No packages yet</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centeredMessage}>
            Check back soon for new travel packages.
          </ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <FlatList
          data={packages}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          onRefresh={refetch}
          refreshing={isRefetching}
          renderItem={({ item }) => (
            <PackageCard pkg={item} onPress={() => router.push(`/(tabs)/packages/${item._id}`)} />
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}
