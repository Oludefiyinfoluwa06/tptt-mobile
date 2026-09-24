import { StyleSheet } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
    gap: Spacing.five,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  headerText: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  subtitle: {
    textAlign: 'center',
  },
  card: {
    gap: Spacing.three,
  },
  errorBanner: {
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  errorText: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.one,
  },
});
