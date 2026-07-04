import { Panel } from '../components/Panel';
import { StatCard } from '../components/StatCard';
import { TopTracksChart } from '../components/TopTracksChart';
import { TracksTable } from '../components/TracksTable';
import { contentStats, topArtists } from '../data/dashboard';
import { compact } from '../utils/format';
import styles from './views.module.css';

const BAR_COLORS = ['#F5B14C', '#4CD0C0', '#E86AA6', '#8C7BF0', '#5EA0F0'];

export function ContentView() {
  const maxListeners = topArtists[0]?.monthlyListeners ?? 1;

  return (
    <div className={styles.stack}>
      <div className={styles.statsGrid}>
        {contentStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className={styles.twoCol}>
        <TopTracksChart />

        <Panel title="Top artists" subtitle="Catalog leaders by reach">
          <div className={styles.rows}>
            {topArtists.map((artist, i) => (
              <div key={artist.name} className={styles.row}>
                <span className={styles.rank}>{i + 1}</span>
                <div className={styles.rowMain}>
                  <div className={styles.rowName}>{artist.name}</div>
                  <div className={styles.rowMeta}>{artist.genre}</div>
                  <span className={styles.barTrack}>
                    <span
                      className={styles.barFill}
                      style={{
                        width: `${(artist.monthlyListeners / maxListeners) * 100}%`,
                        background: BAR_COLORS[i % BAR_COLORS.length],
                      }}
                    />
                  </span>
                </div>
                <span className={styles.rowValue}>{compact(artist.monthlyListeners)}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <TracksTable />
    </div>
  );
}
