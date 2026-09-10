import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppIcon } from '@/components/app-icon';
import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Gradients } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';

import { styles } from './home-screen.styles';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const { user } = useAuth();
  const fullname = user?.fullname ?? '';

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
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
            Your next trip starts here
          </ThemedText>
          <ThemedText themeColor="onPrimary">
            Featured packages, popular destinations, and travel updates are coming soon.
          </ThemedText>
        </LinearGradient>
      </SafeAreaView>
    </ThemedView>
  );
}
