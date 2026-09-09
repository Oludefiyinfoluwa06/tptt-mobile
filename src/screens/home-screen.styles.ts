import { StyleSheet } from 'react-native';

import { Spacing, TabScreenInset } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.one,
    ...TabScreenInset,
  },
});
