/** Compact number: 82_401_920 -> "82.4M". */
export function compact(n: number, digits = 1): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: digits,
  }).format(n);
}

/** Grouped integer: 1234567 -> "1,234,567". */
export function grouped(n: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

/** Signed percentage: 12.4 -> "+12.4%", -3.1 -> "-3.1%". */
export function signedPct(n: number): string {
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(1)}%`;
}
