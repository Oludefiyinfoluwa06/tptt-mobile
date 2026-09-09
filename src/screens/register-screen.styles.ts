import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
    gap: Spacing.five,
  },
  header: {
    gap: Spacing.one,
  },
  form: {
    gap: Spacing.three,
  },
  formError: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.one,
  },
});
