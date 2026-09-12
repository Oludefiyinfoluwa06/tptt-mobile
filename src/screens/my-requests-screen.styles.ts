import { StyleSheet } from 'react-native';

import { Radius, Spacing, TabScreenInset } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...TabScreenInset,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
  },
  header: {
    paddingBottom: Spacing.four,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  section: {
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  bookingCard: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  visaCard: {
    gap: Spacing.one,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: Radius.md,
  },
  cardBody: {
    flex: 1,
    gap: Spacing.half,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  sectionEmptyText: {
    fontSize: 14,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  centeredMessage: {
    textAlign: 'center',
  },
});
