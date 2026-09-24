import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/themed-text';
import { Gradients } from '@/constants/theme';

import { styles } from './avatar.styles';

export type AvatarProps = {
  name: string;
  size?: number;
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const initials = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
  return initials || '?';
}

export function Avatar({ name, size = 56 }: AvatarProps) {
  return (
    <LinearGradient
      colors={Gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <ThemedText style={[styles.initials, { fontSize: size * 0.38 }]} themeColor="onPrimary">
        {getInitials(name)}
      </ThemedText>
    </LinearGradient>
  );
}
