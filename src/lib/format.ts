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
