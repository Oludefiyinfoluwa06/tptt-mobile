import { StyleSheet } from 'react-native';

import { CardShadow, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...CardShadow,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 10,
  },
  body: {
    padding: Spacing.three,
    gap: Spacing.half,
  },
  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  durationBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
});
