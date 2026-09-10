import type { AndroidSymbol } from 'expo-symbols';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SFSymbol } from 'sf-symbols-typescript';

import { IconCircle } from '@/components/icon-circle';
import { styles } from '@/components/placeholder-screen.styles';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export type PlaceholderScreenProps = {
  icon: { sf: SFSymbol; md: AndroidSymbol };
  title: string;
  message: string;
};

export function PlaceholderScreen({ icon, title, message }: PlaceholderScreenProps) {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <IconCircle sf={icon.sf} md={icon.md} size={80} />
        <ThemedText type="subtitle">{title}</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.message}>
          {message}
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
