import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import type { Stat } from '../data/types';
import { signedPct } from '../utils/format';
import { ArrowDownIcon, ArrowUpIcon, CoinIcon, GlobeIcon, HeadphonesIcon, PlayIcon } from './icons';
import styles from './StatCard.module.css';

const ICONS = {
  streams: PlayIcon,
  listeners: HeadphonesIcon,
  revenue: CoinIcon,
  geo: GlobeIcon,
} as const;

const ACCENTS: Record<Stat['icon'], string> = {
  streams: 'var(--accent)',
  listeners: 'var(--accent-teal)',
  revenue: 'var(--accent-magenta)',
  geo: '#8C7BF0',
};

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = ICONS[stat.icon];
  const color = ACCENTS[stat.icon];
  const positive = stat.change >= 0;
  const data = stat.series.map((v, i) => ({ i, v }));
  const gradientId = `spark-${stat.id}`;

  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.head}>
        <span className={styles.icon} style={{ color, background: `${color}1c` }}>
          <Icon />
        </span>
        <span
          className={`${styles.change} ${positive ? styles.up : styles.down}`}
          title={`${signedPct(stat.change)} vs. previous period`}
        >
          {positive ? <ArrowUpIcon width={13} height={13} /> : <ArrowDownIcon width={13} height={13} />}
          {signedPct(stat.change)}
        </span>
      </div>

      <p className={styles.label}>{stat.label}</p>
      <p className={`numeric ${styles.value}`}>{stat.value}</p>
      <p className={styles.hint}>{stat.rawHint}</p>

      <div className={styles.spark} aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
