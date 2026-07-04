import { GeographyChart } from '../components/GeographyChart';
import { LivePulse } from '../components/LivePulse';
import { StatCard } from '../components/StatCard';
import { StreamsChart } from '../components/StreamsChart';
import { TopTracksChart } from '../components/TopTracksChart';
import { TracksTable } from '../components/TracksTable';
import { stats } from '../data/dashboard';
import type { DateRange } from '../data/types';
import styles from './views.module.css';

export function OverviewView({ range }: { range: DateRange }) {
  return (
    <div className={styles.stack}>
      <LivePulse />

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <StreamsChart range={range} />

      <div className={styles.twoCol}>
        <TopTracksChart />
        <GeographyChart />
      </div>

      <TracksTable />
    </div>
  );
}
