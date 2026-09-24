import { StyleSheet } from 'react-native';

import { HeaderTopInset, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingTop: HeaderTopInset,
    paddingBottom: Spacing.three,
  },
  backButton: {
    padding: Spacing.one,
    marginLeft: -Spacing.one,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
  },
});
