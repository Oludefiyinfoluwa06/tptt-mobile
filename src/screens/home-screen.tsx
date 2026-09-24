import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getPackages, packageKeys } from '@/api/packages';
import { AppIcon } from '@/components/app-icon';
import { Avatar } from '@/components/avatar';
import { PackageCard } from '@/components/package-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Gradients } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useTheme } from '@/hooks/use-theme';

import { styles } from './home-screen.styles';

const FEATURED_LIMIT = 5;

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function getUniqueDestinations(destinations: string[]): string[] {
  return Array.from(new Set(destinations));
}

export default function HomeScreen() {
  const { user } = useAuth();
  const theme = useTheme();
  const router = useRouter();
  const fullname = user?.fullname ?? '';

  const { data: packages } = useQuery({
    queryKey: packageKeys.all,
    queryFn: getPackages,
  });

  const featuredPackages = packages?.slice(0, FEATURED_LIMIT) ?? [];
  const destinations = packages ? getUniqueDestinations(packages.map((p) => p.destination)) : [];

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.header}>
            <Avatar name={fullname} size={52} />
            <ThemedView style={styles.headerText}>
              <ThemedText themeColor="textSecondary">{getGreeting()}</ThemedText>
              <ThemedText type="subtitle">{fullname.split(' ')[0]}</ThemedText>
            </ThemedView>
          </ThemedView>

          <LinearGradient
            colors={Gradients.sunset}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}>
            <AppIcon sf="airplane.departure" md="flight_takeoff" size={28} color="#ffffff" />
            <ThemedText style={styles.heroTitle} themeColor="onPrimary">
              Ready for your next adventure?
            </ThemedText>
            <ThemedText themeColor="onPrimary">
              Explore curated travel packages picked just for you.
            </ThemedText>
          </LinearGradient>

          {featuredPackages.length > 0 ? (
            <ThemedView style={styles.section}>
              <ThemedView style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>Featured Packages</ThemedText>
                <Pressable onPress={() => router.push('/(tabs)/packages')}>
                  <ThemedText type="linkPrimary">See all</ThemedText>
                </Pressable>
              </ThemedView>
              <FlatList
                data={featuredPackages}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.horizontalListContent}
                renderItem={({ item }) => (
                  <PackageCard
                    pkg={item}
                    style={styles.featuredCard}
                    onPress={() => router.push(`/(tabs)/packages/${item._id}`)}
                  />
                )}
              />
            </ThemedView>
          ) : null}

          {destinations.length > 0 ? (
            <ThemedView style={styles.section}>
              <ThemedView style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>Popular Destinations</ThemedText>
              </ThemedView>
              <FlatList
                data={destinations}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.horizontalListContent}
                renderItem={({ item }) => (
                  <Pressable onPress={() => router.push('/(tabs)/packages')}>
                    <ThemedView type="backgroundElement" style={styles.destinationChip}>
                      <AppIcon sf="mappin.and.ellipse" md="location_on" size={14} color={theme.primary} />
                      <ThemedText>{item}</ThemedText>
                    </ThemedView>
                  </Pressable>
                )}
              />
            </ThemedView>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
