import { StyleSheet } from 'react-native';

import { Radius, Spacing, TabScreenInset } from '@/constants/theme';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.five,
    ...TabScreenInset,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  headerText: {
    flex: 1,
    gap: Spacing.half,
  },
  heroCard: {
    marginHorizontal: Spacing.four,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  section: {
    gap: Spacing.three,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  horizontalListContent: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  featuredCard: {
    width: 240,
  },
  destinationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
});
