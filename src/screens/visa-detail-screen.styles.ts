import { StyleSheet } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.four,
  },
  infoCard: {
    gap: Spacing.two,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    gap: Spacing.three,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentBody: {
    flex: 1,
    gap: Spacing.half,
  },
  documentType: {
    fontSize: 15,
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 14,
  },
  uploadForm: {
    gap: Spacing.three,
  },
  errorBanner: {
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  errorText: {
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
