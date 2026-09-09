import { TextInput, View, type TextInputProps } from 'react-native';

import { styles } from '@/components/text-field.styles';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export function TextField({ label, error, ...rest }: TextFieldProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        style={[
          styles.input,
          { color: theme.text, borderColor: error ? theme.danger : theme.border },
        ]}
        placeholderTextColor={theme.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />
      {error ? (
        <ThemedText style={styles.error} themeColor="danger">
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}
