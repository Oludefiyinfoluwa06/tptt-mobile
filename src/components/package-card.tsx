import { Image } from 'expo-image';
import { Pressable, type StyleProp, View, type ViewStyle } from 'react-native';

import type { Package } from '@/api/packages';
import { AppIcon } from '@/components/app-icon';
import { styles } from '@/components/package-card.styles';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { formatPrice } from '@/lib/format';

export type PackageCardProps = {
  pkg: Package;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PackageCard({ pkg, onPress, style }: PackageCardProps) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }, style]}>
      <ThemedView type="backgroundElement" style={styles.card}>
        {pkg.image ? (
          <Image source={{ uri: pkg.image }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={[styles.image, { backgroundColor: theme.primaryMuted }]} />
        )}

        <View style={styles.body}>
          <ThemedText style={styles.title} numberOfLines={1}>
            {pkg.title}
          </ThemedText>
          <View style={styles.destinationRow}>
            <AppIcon sf="mappin.and.ellipse" md="location_on" size={14} color={theme.textSecondary} />
            <ThemedText themeColor="textSecondary" numberOfLines={1}>
              {pkg.destination}
            </ThemedText>
          </View>

          <View style={styles.footerRow}>
            <ThemedView type="primaryMuted" style={styles.durationBadge}>
              <ThemedText style={styles.durationText} themeColor="primary">
                {pkg.duration}
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.price}>{formatPrice(pkg.price)}</ThemedText>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}
