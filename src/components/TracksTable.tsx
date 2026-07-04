import { useMemo, useState } from 'react';
import { topTracks } from '../data/dashboard';
import type { Track } from '../data/types';
import { compact, grouped, signedPct } from '../utils/format';
import { Panel } from './Panel';
import { Sparkline } from './Sparkline';
import { ArrowDownIcon, ArrowUpIcon, SortIcon } from './icons';
import styles from './TracksTable.module.css';

type SortKey = 'rank' | 'streams' | 'change' | 'popularity';
type SortDir = 'asc' | 'desc';

interface Column {
  key: SortKey;
  label: string;
  align?: 'right';
  numeric?: boolean;
}

const COLUMNS: Column[] = [
  { key: 'rank', label: '#' },
  { key: 'streams', label: 'Streams', align: 'right', numeric: true },
  { key: 'change', label: 'Change', align: 'right', numeric: true },
  { key: 'popularity', label: 'Popularity', align: 'right', numeric: true },
];

export function TracksTable() {
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: 'streams', dir: 'desc' });

  const rows = useMemo(() => {
    const sorted = [...topTracks].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      return sort.dir === 'asc' ? av - bv : bv - av;
    });
    return sorted;
  }, [sort]);

  const onSort = (key: SortKey) =>
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: key === 'rank' ? 'asc' : 'desc' },
    );

  const ariaSort = (key: SortKey): 'ascending' | 'descending' | 'none' =>
    sort.key === key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none';

  return (
    <Panel
      title="Track performance"
      subtitle="Sortable leaderboard · top 8 tracks"
      className={styles.panel}
    >
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.thTrack}>
                Track
              </th>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort(col.key)}
                  className={col.align === 'right' ? styles.thRight : undefined}
                >
                  <button
                    className={`${styles.sortBtn} ${sort.key === col.key ? styles.sortActive : ''}`}
                    onClick={() => onSort(col.key)}
                  >
                    {col.label}
                    <SortIcon className={styles.sortIcon} />
                  </button>
                </th>
              ))}
              <th scope="col" className={styles.thRight}>
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((track) => (
              <TrackRow key={track.title} track={track} />
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function TrackRow({ track }: { track: Track }) {
  const positive = track.change >= 0;
  const trendColor = positive ? '#58D6A0' : '#F0748A';

  return (
    <tr className={styles.row}>
      <td>
        <div className={styles.track}>
          <span className={`numeric ${styles.rank}`}>{String(track.rank).padStart(2, '0')}</span>
          <span className={styles.cover} aria-hidden="true">
            {track.title.charAt(0)}
          </span>
          <span className={styles.meta}>
            <span className={styles.title}>{track.title}</span>
            <span className={styles.artist}>{track.artist}</span>
          </span>
        </div>
      </td>
      <td className={styles.cellRight}>
        <span className={`numeric ${styles.streams}`} title={`${grouped(track.streams)} streams`}>
          {compact(track.streams)}
        </span>
      </td>
      <td className={styles.cellRight}>
        <span className={`numeric ${styles.change} ${positive ? styles.up : styles.down}`}>
          {positive ? <ArrowUpIcon width={12} height={12} /> : <ArrowDownIcon width={12} height={12} />}
          {signedPct(track.change).replace('-', '').replace('+', '')}
        </span>
      </td>
      <td className={styles.cellRight}>
        <div className={styles.popWrap}>
          <span className={styles.popBar}>
            <span className={styles.popFill} style={{ width: `${track.popularity}%` }} />
          </span>
          <span className={`numeric ${styles.popVal}`}>{track.popularity}</span>
        </div>
      </td>
      <td className={styles.cellRight}>
        <span className={styles.trend}>
          <Sparkline data={track.trend} color={trendColor} />
        </span>
      </td>
    </tr>
  );
}
