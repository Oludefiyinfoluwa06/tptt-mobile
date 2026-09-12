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

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });

const RELATIVE_TIME_UNITS: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
  { unit: 'year', seconds: 31536000 },
  { unit: 'month', seconds: 2592000 },
  { unit: 'week', seconds: 604800 },
  { unit: 'day', seconds: 86400 },
  { unit: 'hour', seconds: 3600 },
  { unit: 'minute', seconds: 60 },
];

export function formatRelativeTime(date: Date): string {
  const diffSeconds = (date.getTime() - Date.now()) / 1000;

  for (const { unit, seconds } of RELATIVE_TIME_UNITS) {
    if (Math.abs(diffSeconds) >= seconds) {
      return relativeTimeFormatter.format(Math.round(diffSeconds / seconds), unit);
    }
  }

  return relativeTimeFormatter.format(Math.round(diffSeconds), 'second');
}
