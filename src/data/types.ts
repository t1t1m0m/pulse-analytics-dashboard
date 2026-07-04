export type DateRange = '24h' | '7d' | '30d' | '90d';

export interface StreamsPoint {
  /** Bucket label (hour / day depending on range). */
  label: string;
  streams: number;
  listeners: number;
  premium: number;
}

export interface Track {
  rank: number;
  title: string;
  artist: string;
  streams: number;
  /** Percentage change vs. previous period. */
  change: number;
  /** 0–100 popularity index used for the bar chart. */
  popularity: number;
  /** Tiny normalized series (0–100) rendered as an inline sparkline. */
  trend: number[];
}

export interface Artist {
  name: string;
  monthlyListeners: number;
  genre: string;
}

export interface GeoSlice {
  country: string;
  code: string;
  listeners: number;
  color: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  rawHint: string;
  change: number;
  /** Which icon to render (keyed in StatCard). */
  icon: 'streams' | 'listeners' | 'revenue' | 'geo';
  /** Mini area series for the card background. */
  series: number[];
}

export interface RevenueSource {
  source: string;
  amount: number;
  color: string;
}

export interface Payout {
  artist: string;
  period: string;
  amount: number;
  status: 'Paid' | 'Processing' | 'Scheduled';
}

export interface MonthlyRevenue {
  month: string;
  subscriptions: number;
  ads: number;
}

export interface Demographic {
  bracket: string;
  share: number;
}

export interface DeviceSlice {
  name: string;
  share: number;
  color: string;
}
