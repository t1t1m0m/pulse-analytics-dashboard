import type { TooltipProps } from 'recharts';
import { compact } from '../utils/format';
import styles from './ChartTooltip.module.css';

interface ChartTooltipProps extends TooltipProps<number, string> {
  /** Optional formatter override; defaults to compact notation. */
  format?: (value: number) => string;
}

export function ChartTooltip({ active, payload, label, format = compact }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={styles.tooltip} role="status">
      {label != null && label !== '' && <p className={styles.label}>{label}</p>}
      <ul className={styles.rows}>
        {payload.map((entry) => (
          <li key={entry.dataKey as string} className={styles.row}>
            <span className={styles.swatch} style={{ background: entry.color }} />
            <span className={styles.name}>{entry.name}</span>
            <span className={`numeric ${styles.value}`}>
              {typeof entry.value === 'number' ? format(entry.value) : entry.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
