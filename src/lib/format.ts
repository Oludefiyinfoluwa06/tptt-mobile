const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return currencyFormatter.format(amount);
}

const displayDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function formatDisplayDate(date: Date): string {
  return displayDateFormatter.format(date);
}

export function formatISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// Hermes (React Native's JS engine) doesn't reliably implement Intl.RelativeTimeFormat,
// so this is hand-rolled instead of relying on it.
const RELATIVE_TIME_UNITS: { label: string; seconds: number }[] = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'week', seconds: 604800 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
];

export function formatRelativeTime(date: Date): string {
  const diffSeconds = (date.getTime() - Date.now()) / 1000;
  const isPast = diffSeconds <= 0;
  const absSeconds = Math.abs(diffSeconds);

  if (absSeconds < 60) {
    return 'just now';
  }

  for (const { label, seconds } of RELATIVE_TIME_UNITS) {
    if (absSeconds >= seconds) {
      const count = Math.round(absSeconds / seconds);
      const plural = `${label}${count === 1 ? '' : 's'}`;
      return isPast ? `${count} ${plural} ago` : `in ${count} ${plural}`;
    }
  }

  return 'just now';
}
