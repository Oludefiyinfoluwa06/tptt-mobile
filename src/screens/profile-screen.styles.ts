import { StyleSheet } from 'react-native';

import { Spacing, TabScreenInset } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.five,
    ...TabScreenInset,
  },
  header: {
    gap: Spacing.one,
  },
  infoCard: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  infoRow: {
    gap: Spacing.half,
  },
  infoLabel: {
    fontSize: 13,
  },
});
