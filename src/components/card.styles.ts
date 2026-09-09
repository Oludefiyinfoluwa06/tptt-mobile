import { StyleSheet } from 'react-native';

import { CardShadow, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.four,
    ...CardShadow,
  },
});
