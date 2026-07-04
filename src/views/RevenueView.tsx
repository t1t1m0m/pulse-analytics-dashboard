import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Panel } from '../components/Panel';
import { StatCard } from '../components/StatCard';
import { monthlyRevenue, payouts, revenueBySource, revenueStats } from '../data/dashboard';
import { compact, grouped } from '../utils/format';
import type { Payout } from '../data/types';
import styles from './views.module.css';

const STATUS_CLASS: Record<Payout['status'], string> = {
  Paid: styles.paid,
  Processing: styles.processing,
  Scheduled: styles.scheduled,
};

export function RevenueView() {
  const sourceTotal = revenueBySource.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className={styles.stack}>
      <div className={styles.statsGrid}>
        {revenueStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <Panel title="Revenue by month" subtitle="Subscriptions vs. ad-supported ($M)">
        <div className={styles.revChart}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue} margin={{ top: 8, right: 6, bottom: 0, left: -12 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 6" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: 'var(--muted-2)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                dy={6}
              />
              <YAxis
                tick={{ fill: 'var(--muted-2)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={52}
                tickFormatter={(v: number) => `$${v}M`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                contentStyle={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 10,
                  color: 'var(--text)',
                  fontSize: 12,
                }}
                formatter={(value: number, name: string) => [`$${value}M`, name]}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: 'var(--muted)' }}
              />
              <Bar
                dataKey="subscriptions"
                name="Subscriptions"
                stackId="rev"
                fill="#F5B14C"
                radius={[0, 0, 0, 0]}
                isAnimationActive={false}
              />
              <Bar
                dataKey="ads"
                name="Ad-supported"
                stackId="rev"
                fill="#4CD0C0"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className={styles.twoCol}>
        <Panel title="Revenue by source" subtitle="Month to date">
          <div className={styles.rows}>
            {revenueBySource.map((s) => (
              <div key={s.source} className={styles.row}>
                <span className={styles.rank} style={{ visibility: 'hidden' }}>
                  •
                </span>
                <div className={styles.rowMain}>
                  <div className={styles.rowName}>{s.source}</div>
                  <div className={styles.rowMeta}>
                    {((s.amount / sourceTotal) * 100).toFixed(1)}% of gross
                  </div>
                  <span className={styles.barTrack}>
                    <span
                      className={styles.barFill}
                      style={{ width: `${(s.amount / sourceTotal) * 100}%`, background: s.color }}
                    />
                  </span>
                </div>
                <span className={styles.rowValue}>${compact(s.amount)}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recent payouts" subtitle="Artist royalty cycle">
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Artist</th>
                <th>Period</th>
                <th className={styles.num}>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.artist}>
                  <td>{p.artist}</td>
                  <td>{p.period}</td>
                  <td className={styles.num}>${grouped(p.amount)}</td>
                  <td>
                    <span className={`${styles.badge} ${STATUS_CLASS[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  );
}
