import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth-context';

import { styles } from './home-screen.styles';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ThemedText type="title">Welcome, {user?.fullname.split(' ')[0]}</ThemedText>
        <ThemedText themeColor="textSecondary">
          Featured packages and travel updates are coming soon.
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
