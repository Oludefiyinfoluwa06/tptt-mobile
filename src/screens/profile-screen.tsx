import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth-context';

import { styles } from './profile-screen.styles';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <ThemedView style={styles.infoRow}>
      <ThemedText style={styles.infoLabel} themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText>{value}</ThemedText>
    </ThemedView>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Profile</ThemedText>
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.infoCard}>
          <InfoRow label="Full name" value={user?.fullname ?? ''} />
          <InfoRow label="Email" value={user?.email ?? ''} />
          <InfoRow label="Phone" value={user?.phone || 'Not provided'} />
          <InfoRow label="Role" value={user?.role ?? ''} />
        </ThemedView>

        <Button label="Log out" variant="secondary" onPress={logout} />
      </SafeAreaView>
    </ThemedView>
  );
}
