import { useLivePulse } from '../hooks/useLivePulse';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { grouped } from '../utils/format';
import styles from './LivePulse.module.css';

const CITIES = [
  { city: 'São Paulo', track: 'Midnight in Lagos' },
  { city: 'Berlin', track: 'Neon Tide' },
  { city: 'Osaka', track: 'Paper Cranes' },
  { city: 'Lagos', track: 'Gravity, Slowly' },
];

export function LivePulse() {
  const reducedMotion = usePrefersReducedMotion();
  const { streamsNow, beat } = useLivePulse({ base: 18420, intervalMs: 2000 });

  return (
    <section
      className={`card ${styles.panel}`}
      aria-label="Live streaming activity"
    >
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.left}>
        <div className={styles.status}>
          <span className={`${styles.indicator} ${reducedMotion ? styles.still : ''}`} aria-hidden="true">
            <span className={styles.ring} />
            <span className={styles.core} />
          </span>
          <span className={styles.liveLabel}>Live now</span>
          <span className={styles.divider} />
          <span className={styles.sub}>Streams starting per second, globally</span>
        </div>

        <p
          className={`numeric ${styles.count} ${beat ? styles.beat : ''}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {grouped(streamsNow)}
          <span className={styles.unit}>/sec</span>
        </p>

        <p className={styles.meta}>
          Peaking in <strong>North America</strong> · 62% on Premium tier
        </p>
      </div>

      <ul className={styles.feed} aria-label="Recent plays">
        {CITIES.map(({ city, track }) => (
          <li key={city} className={styles.feedItem}>
            <span className={styles.feedDot} aria-hidden="true" />
            <span className={styles.feedCity}>{city}</span>
            <span className={styles.feedTrack}>{track}</span>
          </li>
        ))}
      </ul>

      <div className={styles.equalizer} aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
    </section>
  );
}
