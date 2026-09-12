import { StyleSheet } from 'react-native';

import { Spacing, TabScreenInset } from '@/constants/theme';

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
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: Spacing.one,
  },
  cardBody: {
    flex: 1,
    gap: Spacing.half,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  cardMessage: {
    fontSize: 14,
  },
  cardTime: {
    fontSize: 12,
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
