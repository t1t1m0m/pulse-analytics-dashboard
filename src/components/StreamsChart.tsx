import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { rangeMeta, streamsByRange } from '../data/dashboard';
import type { DateRange } from '../data/types';
import { compact } from '../utils/format';
import { ChartTooltip } from './ChartTooltip';
import { Panel } from './Panel';
import styles from './StreamsChart.module.css';

interface SeriesToggle {
  key: 'streams' | 'premium' | 'listeners';
  label: string;
  color: string;
}

const SERIES: SeriesToggle[] = [
  { key: 'streams', label: 'Total streams', color: 'var(--accent)' },
  { key: 'premium', label: 'Premium', color: 'var(--accent-teal)' },
  { key: 'listeners', label: 'Unique listeners', color: 'var(--accent-magenta)' },
];

const HEX: Record<SeriesToggle['key'], string> = {
  streams: '#F5B14C',
  premium: '#4CD0C0',
  listeners: '#E86AA6',
};

interface StreamsChartProps {
  range: DateRange;
}

export function StreamsChart({ range }: StreamsChartProps) {
  const [visible, setVisible] = useState<Record<SeriesToggle['key'], boolean>>({
    streams: true,
    premium: true,
    listeners: false,
  });

  const data = streamsByRange[range];
  const total = useMemo(() => data.reduce((sum, d) => sum + d.streams, 0), [data]);

  const toggle = (key: SeriesToggle['key']) =>
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));

  const legend = (
    <div className={styles.legend} role="group" aria-label="Toggle chart series">
      {SERIES.map(({ key, label, color }) => (
        <button
          key={key}
          className={`${styles.chip} ${visible[key] ? styles.chipOn : ''}`}
          aria-pressed={visible[key]}
          onClick={() => toggle(key)}
        >
          <span className={styles.chipDot} style={{ background: color }} />
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <Panel
      title="Streams over time"
      subtitle={`${rangeMeta[range].caption} · ${compact(total)} plays`}
      action={legend}
      className={styles.panel}
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 6, bottom: 0, left: -8 }}>
            <defs>
              {SERIES.map(({ key }) => (
                <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={HEX[key]} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={HEX[key]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid stroke="var(--border)" strokeDasharray="3 6" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: 'var(--muted-2)', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={24}
              interval="preserveStartEnd"
              dy={6}
            />
            <YAxis
              tick={{ fill: 'var(--muted-2)', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={52}
              tickFormatter={(v: number) => compact(v)}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1 }}
            />

            {SERIES.filter((s) => visible[s.key]).map(({ key, label }) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                name={label}
                stroke={HEX[key]}
                strokeWidth={2.4}
                fill={`url(#grad-${key})`}
                activeDot={{ r: 4, strokeWidth: 2, stroke: 'var(--canvas)' }}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
