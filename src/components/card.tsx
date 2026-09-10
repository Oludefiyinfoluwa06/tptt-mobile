import { ThemedView, type ThemedViewProps } from '@/components/themed-view';

import { styles } from './card.styles';

export function Card({ style, type = 'backgroundElement', ...rest }: ThemedViewProps) {
  return <ThemedView type={type} style={[styles.card, style]} {...rest} />;
}
