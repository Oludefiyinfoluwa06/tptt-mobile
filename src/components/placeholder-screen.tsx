import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '@/components/placeholder-screen.styles';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export type PlaceholderScreenProps = {
  title: string;
  message: string;
};

export function PlaceholderScreen({ title, message }: PlaceholderScreenProps) {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ThemedText type="subtitle">{title}</ThemedText>
        <ThemedText themeColor="textSecondary" style={{ textAlign: 'center' }}>
          {message}
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
