import { Platform, StyleSheet, type TextStyle } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';

// react-native-web supports CSS `outline-style`, but it's not in RN's TextStyle typings.
export const webNoOutline =
  Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : undefined;

export const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  icon: {
    opacity: 0.8,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.two + Spacing.half,
    fontSize: 16,
  },
  error: {
    fontSize: 13,
  },
});
