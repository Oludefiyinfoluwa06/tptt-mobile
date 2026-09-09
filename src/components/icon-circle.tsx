import type { AndroidSymbol } from 'expo-symbols';
import type { ColorValue } from 'react-native';
import type { SFSymbol } from 'sf-symbols-typescript';

import { AppIcon } from '@/components/app-icon';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

import { styles } from './icon-circle.styles';

export type IconCircleProps = {
  sf: SFSymbol;
  md: AndroidSymbol;
  size?: number;
  iconSize?: number;
  backgroundColor?: ColorValue;
  iconColor?: ColorValue;
};

export function IconCircle({
  sf,
  md,
  size = 56,
  iconSize,
  backgroundColor,
  iconColor,
}: IconCircleProps) {
  const theme = useTheme();

  return (
    <ThemedView
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: (backgroundColor ?? theme.primaryMuted) as string,
        },
      ]}>
      <AppIcon
        sf={sf}
        md={md}
        size={iconSize ?? size * 0.45}
        color={(iconColor ?? theme.primary) as string}
      />
    </ThemedView>
  );
}
