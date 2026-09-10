import { StyleSheet } from 'react-native';

import { Radius, Spacing, TabScreenInset } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.five,
    ...TabScreenInset,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  roleBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.half,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCard: {
    gap: Spacing.four,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  infoRowText: {
    flex: 1,
    gap: Spacing.half,
  },
  infoLabel: {
    fontSize: 13,
  },
});
