import type {
  Artist,
  DateRange,
  Demographic,
  DeviceSlice,
  GeoSlice,
  MonthlyRevenue,
  Payout,
  RevenueSource,
  Stat,
  StreamsPoint,
  Track,
} from './types';

/* -------------------------------------------------------------------------- */
/*  Mock data for "Pulse" — a music streaming analytics dashboard.            */
/*  All numbers are invented but internally consistent and domain-plausible.  */
/* -------------------------------------------------------------------------- */

export const dateRanges: { id: DateRange; label: string }[] = [
  { id: '24h', label: '24h' },
  { id: '7d', label: '7d' },
  { id: '30d', label: '30d' },
  { id: '90d', label: '90d' },
];

export const rangeMeta: Record<DateRange, { caption: string; multiplier: number }> = {
  '24h': { caption: 'Last 24 hours', multiplier: 1 },
  '7d': { caption: 'Last 7 days', multiplier: 6.6 },
  '30d': { caption: 'Last 30 days', multiplier: 27 },
  '90d': { caption: 'Last 90 days', multiplier: 79 },
};

/* ---- Top-line stat cards ---- */
export const stats: Stat[] = [
  {
    id: 'streams',
    label: 'Total streams',
    value: '4.82B',
    rawHint: '4,824,109,552 all-time',
    change: 12.4,
    icon: 'streams',
    series: [42, 48, 45, 55, 61, 58, 67, 72, 70, 81, 88, 96],
  },
  {
    id: 'listeners',
    label: 'Monthly listeners',
    value: '38.6M',
    rawHint: '38,614,200 unique this month',
    change: 8.1,
    icon: 'listeners',
    series: [60, 58, 63, 61, 66, 70, 69, 74, 78, 77, 83, 86],
  },
  {
    id: 'revenue',
    label: 'Revenue (MTD)',
    value: '$9.24M',
    rawHint: 'Subscriptions + ad-supported',
    change: 5.7,
    icon: 'revenue',
    series: [30, 34, 33, 39, 44, 42, 49, 52, 55, 58, 63, 68],
  },
  {
    id: 'countries',
    label: 'Active markets',
    value: '164',
    rawHint: 'Countries with paid tiers',
    change: 2.2,
    icon: 'geo',
    series: [140, 142, 145, 149, 151, 153, 156, 158, 159, 161, 163, 164],
  },
];

/* ---- Streams over time (default = 30d daily buckets) ---- */
function buildSeries(points: number, base: number, spread: number): StreamsPoint[] {
  const out: StreamsPoint[] = [];
  for (let i = 0; i < points; i += 1) {
    const wave = Math.sin(i / 3) * spread + Math.cos(i / 7) * spread * 0.4;
    const growth = (i / points) * spread * 1.4;
    const streams = Math.round(base + wave + growth + (i % 5) * spread * 0.08);
    out.push({
      label: `Day ${i + 1}`,
      streams,
      listeners: Math.round(streams * 0.42),
      premium: Math.round(streams * 0.61),
    });
  }
  return out;
}

const dayLabels30 = [
  'Jun 05', 'Jun 06', 'Jun 07', 'Jun 08', 'Jun 09', 'Jun 10', 'Jun 11',
  'Jun 12', 'Jun 13', 'Jun 14', 'Jun 15', 'Jun 16', 'Jun 17', 'Jun 18',
  'Jun 19', 'Jun 20', 'Jun 21', 'Jun 22', 'Jun 23', 'Jun 24', 'Jun 25',
  'Jun 26', 'Jun 27', 'Jun 28', 'Jun 29', 'Jun 30', 'Jul 01', 'Jul 02',
  'Jul 03', 'Jul 04',
];

export const streamsByRange: Record<DateRange, StreamsPoint[]> = {
  '24h': [
    '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00',
    '16:00', '18:00', '20:00', '22:00',
  ].map((label, i) => {
    const base = 620_000;
    const spread = 210_000;
    const wave = Math.sin((i - 2) / 2.2) * spread + (i > 7 ? spread * 0.9 : 0);
    const streams = Math.round(base + wave + spread * 0.3);
    return {
      label,
      streams,
      listeners: Math.round(streams * 0.4),
      premium: Math.round(streams * 0.63),
    };
  }),
  '7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => {
    const base = 8_900_000;
    const spread = 1_600_000;
    const weekend = i >= 4 ? spread * 1.1 : 0;
    const streams = Math.round(base + Math.sin(i / 1.6) * spread + weekend);
    return {
      label,
      streams,
      listeners: Math.round(streams * 0.41),
      premium: Math.round(streams * 0.6),
    };
  }),
  '30d': buildSeries(30, 9_400_000, 1_300_000).map((p, i) => ({
    ...p,
    label: dayLabels30[i] ?? p.label,
  })),
  '90d': buildSeries(90, 8_600_000, 1_500_000).map((p, i) => ({
    ...p,
    label: i % 3 === 0 ? `W${Math.floor(i / 7) + 1}` : '',
  })),
};

/* ---- Top tracks (also feeds the bar chart + table) ---- */
export const topTracks: Track[] = [
  {
    rank: 1,
    title: 'Neon Tide',
    artist: 'Marlowe Vane',
    streams: 82_401_920,
    change: 14.2,
    popularity: 98,
    trend: [40, 52, 48, 61, 70, 76, 88, 96],
  },
  {
    rank: 2,
    title: 'Paper Cranes',
    artist: 'Isla Fontaine',
    streams: 74_118_004,
    change: 9.6,
    popularity: 91,
    trend: [55, 58, 54, 62, 68, 65, 79, 88],
  },
  {
    rank: 3,
    title: 'Midnight in Lagos',
    artist: 'Kojo Adeyemi',
    streams: 68_902_551,
    change: 22.8,
    popularity: 86,
    trend: [30, 41, 47, 44, 59, 71, 80, 90],
  },
  {
    rank: 4,
    title: 'Static Bloom',
    artist: 'The Violet Hours',
    streams: 61_540_882,
    change: -3.1,
    popularity: 78,
    trend: [72, 70, 66, 64, 60, 58, 55, 52],
  },
  {
    rank: 5,
    title: 'Cassette Summer',
    artist: 'Dovie Marsh',
    streams: 55_209_310,
    change: 6.4,
    popularity: 73,
    trend: [48, 51, 53, 55, 54, 60, 63, 67],
  },
  {
    rank: 6,
    title: 'Gravity, Slowly',
    artist: 'Anouk Reyes',
    streams: 49_882_140,
    change: 11.9,
    popularity: 69,
    trend: [35, 40, 44, 49, 52, 58, 61, 66],
  },
  {
    rank: 7,
    title: 'Copper Skyline',
    artist: 'Bexley Grove',
    streams: 44_017_663,
    change: -1.8,
    popularity: 62,
    trend: [58, 57, 55, 56, 53, 52, 51, 50],
  },
  {
    rank: 8,
    title: 'Halcyon Drive',
    artist: 'Sable & Iron',
    streams: 39_744_209,
    change: 4.7,
    popularity: 57,
    trend: [42, 44, 43, 47, 49, 48, 52, 55],
  },
];

/* ---- Top artists ---- */
export const topArtists: Artist[] = [
  { name: 'Marlowe Vane', monthlyListeners: 24_900_000, genre: 'Alt-Pop' },
  { name: 'Isla Fontaine', monthlyListeners: 19_300_000, genre: 'Indie Folk' },
  { name: 'Kojo Adeyemi', monthlyListeners: 17_800_000, genre: 'Afrobeats' },
  { name: 'The Violet Hours', monthlyListeners: 14_100_000, genre: 'Dream Pop' },
  { name: 'Dovie Marsh', monthlyListeners: 11_600_000, genre: 'Synthwave' },
];

/* ---- Listener geography (donut) ---- */
export const geography: GeoSlice[] = [
  { country: 'United States', code: 'US', listeners: 11_240_000, color: '#F5B14C' },
  { country: 'Brazil', code: 'BR', listeners: 6_820_000, color: '#4CD0C0' },
  { country: 'Germany', code: 'DE', listeners: 4_910_000, color: '#E86AA6' },
  { country: 'Japan', code: 'JP', listeners: 3_770_000, color: '#8C7BF0' },
  { country: 'Nigeria', code: 'NG', listeners: 3_120_000, color: '#5EA0F0' },
  { country: 'Rest of world', code: 'ROW', listeners: 8_744_200, color: '#3A4260' },
];

/* ---- Audience: age demographics ---- */
export const demographics: Demographic[] = [
  { bracket: '18–24', share: 34 },
  { bracket: '25–34', share: 29 },
  { bracket: '35–44', share: 18 },
  { bracket: '45–54', share: 11 },
  { bracket: '55+', share: 8 },
];

/* ---- Audience: listening devices (donut) ---- */
export const devices: DeviceSlice[] = [
  { name: 'Mobile', share: 58, color: '#F5B14C' },
  { name: 'Desktop', share: 21, color: '#4CD0C0' },
  { name: 'Smart speaker', share: 12, color: '#E86AA6' },
  { name: 'TV / console', share: 9, color: '#8C7BF0' },
];

/* ---- Audience-specific stat cards ---- */
export const audienceStats: Stat[] = [
  {
    id: 'mau',
    label: 'Monthly listeners',
    value: '38.6M',
    rawHint: '38,614,200 unique this month',
    change: 8.1,
    icon: 'listeners',
    series: [60, 58, 63, 61, 66, 70, 69, 74, 78, 77, 83, 86],
  },
  {
    id: 'followers',
    label: 'New followers',
    value: '1.24M',
    rawHint: 'Added in the last 30 days',
    change: 15.3,
    icon: 'listeners',
    series: [20, 24, 26, 30, 35, 41, 44, 52, 58, 64, 71, 80],
  },
  {
    id: 'save-rate',
    label: 'Save rate',
    value: '27.4%',
    rawHint: 'Plays that led to a library save',
    change: 3.9,
    icon: 'streams',
    series: [40, 42, 41, 45, 47, 46, 50, 52, 51, 55, 57, 59],
  },
  {
    id: 'markets',
    label: 'Active markets',
    value: '164',
    rawHint: 'Countries with paid tiers',
    change: 2.2,
    icon: 'geo',
    series: [140, 142, 145, 149, 151, 153, 156, 158, 159, 161, 163, 164],
  },
];

/* ---- Content-specific stat cards ---- */
export const contentStats: Stat[] = [
  {
    id: 'catalog',
    label: 'Tracks in catalog',
    value: '1,842',
    rawHint: 'Across 96 releases',
    change: 4.1,
    icon: 'streams',
    series: [50, 52, 55, 58, 60, 63, 67, 70, 74, 78, 82, 88],
  },
  {
    id: 'playlisted',
    label: 'Editorial placements',
    value: '312',
    rawHint: 'Active playlist adds',
    change: 9.8,
    icon: 'listeners',
    series: [30, 33, 36, 40, 44, 48, 53, 58, 62, 67, 72, 78],
  },
  {
    id: 'completion',
    label: 'Avg. completion',
    value: '81.2%',
    rawHint: 'Share of a track played through',
    change: 1.4,
    icon: 'streams',
    series: [70, 71, 72, 74, 73, 76, 77, 78, 79, 80, 80, 81],
  },
  {
    id: 'skip',
    label: 'Skip rate',
    value: '11.6%',
    rawHint: 'Skips within first 30s',
    change: -2.3,
    icon: 'revenue',
    series: [20, 19, 19, 18, 17, 17, 16, 15, 14, 13, 12, 12],
  },
];

/* ---- Revenue-specific stat cards ---- */
export const revenueStats: Stat[] = [
  {
    id: 'gross',
    label: 'Gross revenue (MTD)',
    value: '$9.24M',
    rawHint: 'Before distributor fees',
    change: 5.7,
    icon: 'revenue',
    series: [30, 34, 33, 39, 44, 42, 49, 52, 55, 58, 63, 68],
  },
  {
    id: 'subs',
    label: 'Subscription share',
    value: '$7.01M',
    rawHint: '75.9% of gross revenue',
    change: 6.2,
    icon: 'revenue',
    series: [24, 27, 28, 31, 34, 37, 40, 43, 46, 49, 53, 57],
  },
  {
    id: 'rpm',
    label: 'Avg. revenue / 1k plays',
    value: '$3.91',
    rawHint: 'Blended across tiers',
    change: 1.1,
    icon: 'streams',
    series: [34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 39],
  },
  {
    id: 'pending',
    label: 'Pending payouts',
    value: '$2.18M',
    rawHint: 'Scheduled for next cycle',
    change: -4.5,
    icon: 'geo',
    series: [40, 38, 39, 36, 35, 34, 33, 31, 30, 29, 28, 27],
  },
];

/* ---- Revenue by source (donut) ---- */
export const revenueBySource: RevenueSource[] = [
  { source: 'Premium subscriptions', amount: 7_010_000, color: '#F5B14C' },
  { source: 'Ad-supported', amount: 1_420_000, color: '#4CD0C0' },
  { source: 'Publishing / sync', amount: 540_000, color: '#E86AA6' },
  { source: 'Merch & bundles', amount: 270_000, color: '#8C7BF0' },
];

/* ---- Revenue split over the last 6 months (grouped bars) ---- */
export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Feb', subscriptions: 5.9, ads: 1.1 },
  { month: 'Mar', subscriptions: 6.2, ads: 1.2 },
  { month: 'Apr', subscriptions: 6.4, ads: 1.15 },
  { month: 'May', subscriptions: 6.7, ads: 1.3 },
  { month: 'Jun', subscriptions: 6.9, ads: 1.36 },
  { month: 'Jul', subscriptions: 7.01, ads: 1.42 },
];

/* ---- Recent artist payouts ---- */
export const payouts: Payout[] = [
  { artist: 'Marlowe Vane', period: 'Jun 2026', amount: 412_800, status: 'Paid' },
  { artist: 'Isla Fontaine', period: 'Jun 2026', amount: 318_450, status: 'Paid' },
  { artist: 'Kojo Adeyemi', period: 'Jun 2026', amount: 297_010, status: 'Processing' },
  { artist: 'The Violet Hours', period: 'Jun 2026', amount: 208_900, status: 'Processing' },
  { artist: 'Dovie Marsh', period: 'Jun 2026', amount: 164_220, status: 'Scheduled' },
  { artist: 'Anouk Reyes', period: 'Jun 2026', amount: 121_770, status: 'Scheduled' },
];
