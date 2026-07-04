import { GeographyChart } from '../components/GeographyChart';
import { Panel } from '../components/Panel';
import { StatCard } from '../components/StatCard';
import { StreamsChart } from '../components/StreamsChart';
import { audienceStats, demographics, devices, topArtists } from '../data/dashboard';
import type { DateRange } from '../data/types';
import { compact } from '../utils/format';
import styles from './views.module.css';

const BAR_COLORS = ['#F5B14C', '#4CD0C0', '#E86AA6', '#8C7BF0', '#5EA0F0'];

export function AudienceView({ range }: { range: DateRange }) {
  const maxListeners = topArtists[0]?.monthlyListeners ?? 1;

  return (
    <div className={styles.stack}>
      <div className={styles.statsGrid}>
        {audienceStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className={styles.twoCol}>
        <Panel title="Top artists" subtitle="By monthly listeners">
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

        <GeographyChart />
      </div>

      <div className={styles.twoCol}>
        <Panel title="Age distribution" subtitle="Share of active listeners">
          <div className={styles.rows}>
            {demographics.map((d) => (
              <div key={d.bracket} className={styles.demoRow}>
                <span className={styles.demoLabel}>{d.bracket}</span>
                <span className={styles.barTrack} style={{ marginTop: 0 }}>
                  <span
                    className={styles.barFill}
                    style={{ width: `${d.share}%`, background: 'var(--accent-teal)' }}
                  />
                </span>
                <span className={styles.demoPct}>{d.share}%</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Listening devices" subtitle="Where playback happens">
          <div className={styles.rows}>
            {devices.map((dev) => (
              <div key={dev.name} className={styles.demoRow}>
                <span className={styles.demoLabel}>{dev.name}</span>
                <span className={styles.barTrack} style={{ marginTop: 0 }}>
                  <span
                    className={styles.barFill}
                    style={{ width: `${dev.share}%`, background: dev.color }}
                  />
                </span>
                <span className={styles.demoPct}>{dev.share}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <StreamsChart range={range} />
    </div>
  );
}
