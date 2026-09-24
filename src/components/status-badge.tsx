import { styles } from '@/components/status-badge.styles';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { ThemeColor } from '@/constants/theme';

export type StatusBadgeProps = {
  status: string;
};

// Covers both booking statuses (pending/approved/rejected) and visa statuses
// (submitted/documents_received/processing/approved/rejected) so it's reusable
// across features without changes.
const STATUS_TONES: Record<string, { background: ThemeColor; text: ThemeColor }> = {
  pending: { background: 'warningMuted', text: 'warning' },
  submitted: { background: 'warningMuted', text: 'warning' },
  documents_received: { background: 'primaryMuted', text: 'primary' },
  processing: { background: 'primaryMuted', text: 'primary' },
  approved: { background: 'successMuted', text: 'success' },
  rejected: { background: 'dangerMuted', text: 'danger' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const tone = STATUS_TONES[status] ?? { background: 'backgroundElement', text: 'textSecondary' };
  const label = status.replace(/_/g, ' ');

  return (
    <ThemedView type={tone.background} style={styles.badge}>
      <ThemedText style={styles.text} themeColor={tone.text}>
        {label}
      </ThemedText>
    </ThemedView>
  );
}
