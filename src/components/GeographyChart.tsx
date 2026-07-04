import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { geography } from '../data/dashboard';
import { compact, grouped } from '../utils/format';
import { ChartTooltip } from './ChartTooltip';
import { Panel } from './Panel';
import styles from './GeographyChart.module.css';

export function GeographyChart() {
  const total = geography.reduce((sum, g) => sum + g.listeners, 0);
  const data = geography.map((g) => ({ name: g.country, value: g.listeners, color: g.color }));

  return (
    <Panel title="Listener geography" subtitle="Active listeners by market" className={styles.panel}>
      <div className={styles.layout}>
        <div className={styles.donutWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="66%"
                outerRadius="94%"
                paddingAngle={2}
                stroke="var(--surface)"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.center}>
            <span className={`numeric ${styles.centerValue}`}>{compact(total)}</span>
            <span className={styles.centerLabel}>listeners</span>
          </div>
        </div>

        <ul className={styles.legend}>
          {geography.map((g) => {
            const pct = ((g.listeners / total) * 100).toFixed(1);
            return (
              <li key={g.code} className={styles.item}>
                <span className={styles.dot} style={{ background: g.color }} />
                <span className={styles.country}>{g.country}</span>
                <span className={`numeric ${styles.pct}`}>{pct}%</span>
                <span className={`numeric ${styles.count}`}>{grouped(g.listeners)}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Panel>
  );
}
