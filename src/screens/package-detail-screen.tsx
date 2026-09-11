import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { getPackage, packageKeys } from '@/api/packages';
import { AppIcon } from '@/components/app-icon';
import { Button } from '@/components/button';
import { IconCircle } from '@/components/icon-circle';
import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { formatPrice } from '@/lib/format';

import { styles } from './package-detail-screen.styles';

export default function PackageDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const {
    data: pkg,
    isPending,
    isError,
  } = useQuery({
    queryKey: packageKeys.detail(id),
    queryFn: () => getPackage(id),
    enabled: !!id,
  });

  if (isPending) {
    return (
      <ThemedView style={styles.container}>
        <ScreenHeader title="Package" />
        <View style={styles.centered}>
          <ThemedText themeColor="textSecondary">Loading package…</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (isError || !pkg) {
    return (
      <ThemedView style={styles.container}>
        <ScreenHeader title="Package" />
        <View style={styles.centered}>
          <IconCircle
            sf="exclamationmark.triangle"
            md="error_outline"
            size={72}
            backgroundColor={theme.dangerMuted}
            iconColor={theme.danger}
          />
          <ThemedText type="subtitle">Package not found</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centeredMessage}>
            This package may have been removed.
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title={pkg.title} />
      <ScrollView>
        {pkg.image ? (
          <Image source={{ uri: pkg.image }} style={styles.image} contentFit="cover" />
        ) : null}

        <View style={styles.content}>
          <ThemedText type="title">{pkg.title}</ThemedText>
          <View style={styles.destinationRow}>
            <AppIcon sf="mappin.and.ellipse" md="location_on" size={16} color={theme.textSecondary} />
            <ThemedText themeColor="textSecondary">{pkg.destination}</ThemedText>
          </View>

          <View style={styles.metaRow}>
            <ThemedView type="backgroundElement" style={styles.metaCard}>
              <ThemedText style={styles.metaLabel} themeColor="textSecondary">
                Duration
              </ThemedText>
              <ThemedText style={styles.metaValue}>{pkg.duration}</ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.metaCard}>
              <ThemedText style={styles.metaLabel} themeColor="textSecondary">
                Price
              </ThemedText>
              <ThemedText style={styles.metaValue}>{formatPrice(pkg.price)}</ThemedText>
            </ThemedView>
          </View>

          <ThemedText style={styles.sectionTitle}>About this trip</ThemedText>
          <ThemedText style={styles.description} themeColor="textSecondary">
            {pkg.description}
          </ThemedText>

          <Button
            label="Request Booking"
            onPress={() =>
              router.push({ pathname: '/(tabs)/packages/book', params: { packageId: pkg._id } })
            }
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}
