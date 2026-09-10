import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppIcon } from '@/components/app-icon';
import { styles } from '@/components/screen-header.styles';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

export type ScreenHeaderProps = {
  title: string;
};

export function ScreenHeader({ title }: ScreenHeaderProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <ThemedView style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}>
          <AppIcon sf="chevron.left" md="arrow_back" size={22} color={theme.text} />
        </Pressable>
        <ThemedText style={styles.title} numberOfLines={1}>
          {title}
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}
