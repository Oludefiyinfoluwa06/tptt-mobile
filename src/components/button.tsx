import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import { styles } from '@/components/button.styles';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export type ButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
};

const VARIANT_COLORS = {
  primary: (theme: ReturnType<typeof useTheme>) => ({
    backgroundColor: theme.primary,
    labelColor: theme.onPrimary,
  }),
  secondary: (theme: ReturnType<typeof useTheme>) => ({
    backgroundColor: theme.backgroundElement,
    labelColor: theme.text,
  }),
  danger: (theme: ReturnType<typeof useTheme>) => ({
    backgroundColor: theme.dangerMuted,
    labelColor: theme.danger,
  }),
};

export function Button({ label, variant = 'primary', loading, disabled, ...rest }: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const { backgroundColor, labelColor } = VARIANT_COLORS[variant](theme);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor },
        variant === 'primary' && !isDisabled && styles.primaryShadow,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={labelColor} />
      ) : (
        <ThemedText style={[styles.label, { color: labelColor }]}>{label}</ThemedText>
      )}
    </Pressable>
  );
}
