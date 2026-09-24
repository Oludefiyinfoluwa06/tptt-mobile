import { StyleSheet } from 'react-native';

import { Spacing, TabScreenInset } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    ...TabScreenInset,
  },
  message: {
    textAlign: 'center',
  },
});
