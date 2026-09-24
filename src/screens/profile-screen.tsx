import type { AndroidSymbol } from 'expo-symbols';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SFSymbol } from 'sf-symbols-typescript';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { IconCircle } from '@/components/icon-circle';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth-context';

import { styles } from './profile-screen.styles';

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: { sf: SFSymbol; md: AndroidSymbol };
  label: string;
  value: string;
}) {
  return (
    <ThemedView style={styles.infoRow}>
      <IconCircle sf={icon.sf} md={icon.md} size={40} iconSize={18} />
      <ThemedView style={styles.infoRowText}>
        <ThemedText style={styles.infoLabel} themeColor="textSecondary">
          {label}
        </ThemedText>
        <ThemedText>{value}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.header}>
          <Avatar name={user?.fullname ?? ''} size={72} />
          <ThemedText type="subtitle">{user?.fullname}</ThemedText>
          {user?.role ? (
            <ThemedView type="primaryMuted" style={styles.roleBadge}>
              <ThemedText style={styles.roleBadgeText} themeColor="primary">
                {user.role}
              </ThemedText>
            </ThemedView>
          ) : null}
        </ThemedView>

        <Card style={styles.infoCard}>
          <InfoRow icon={{ sf: 'envelope', md: 'mail' }} label="Email" value={user?.email ?? ''} />
          <InfoRow
            icon={{ sf: 'phone', md: 'call' }}
            label="Phone"
            value={user?.phone || 'Not provided'}
          />
        </Card>

        <Button label="Log out" variant="danger" onPress={logout} />
      </SafeAreaView>
    </ThemedView>
  );
}
