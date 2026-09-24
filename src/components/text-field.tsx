import type { AndroidSymbol } from 'expo-symbols';
import { useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import type { SFSymbol } from 'sf-symbols-typescript';

import { AppIcon } from '@/components/app-icon';
import { styles, webNoOutline } from '@/components/text-field.styles';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
  icon?: { sf: SFSymbol; md: AndroidSymbol };
};

export function TextField({ label, error, icon, onFocus, onBlur, ...rest }: TextFieldProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error ? theme.danger : isFocused ? theme.primary : theme.border;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={[styles.inputWrapper, { borderColor }]}>
        {icon ? (
          <View style={styles.icon}>
            <AppIcon sf={icon.sf} md={icon.md} size={18} color={theme.textSecondary} />
          </View>
        ) : null}
        <TextInput
          style={[styles.input, { color: theme.text }, webNoOutline]}
          placeholderTextColor={theme.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
      </View>
      {error ? (
        <ThemedText style={styles.error} themeColor="danger">
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}
