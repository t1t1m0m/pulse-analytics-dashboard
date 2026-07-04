import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { topTracks } from '../data/dashboard';
import { compact } from '../utils/format';
import { ChartTooltip } from './ChartTooltip';
import { Panel } from './Panel';
import styles from './TopTracksChart.module.css';

const BAR_COLORS = ['#F5B14C', '#F0A85A', '#7ED3C6', '#4CD0C0', '#E86AA6', '#D97BAE'];

export function TopTracksChart() {
  const data = topTracks.slice(0, 6).map((t) => ({
    name: t.title,
    artist: t.artist,
    streams: t.streams,
  }));

  return (
    <Panel
      title="Top tracks"
      subtitle="By streams this period"
      className={styles.panel}
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
            barCategoryGap={14}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={128}
              tick={{ fill: 'var(--text)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: 'var(--surface-2)', opacity: 0.5 }}
            />
            <Bar dataKey="streams" name="Streams" radius={[0, 6, 6, 0]} maxBarSize={20}>
              {data.map((_, i) => (
                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className={styles.footnote}>
        Leader <strong>{data[0].name}</strong> · {compact(data[0].streams)} streams
      </p>
    </Panel>
  );
}
