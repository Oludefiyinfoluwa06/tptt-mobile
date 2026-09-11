import { StyleSheet } from 'react-native';

import { Radius, Spacing, TabScreenInset } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...TabScreenInset,
  },
  header: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  card: {
    flexDirection: 'row',
    gap: Spacing.three,
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
