import { dateRanges } from '../data/dashboard';
import type { DateRange } from '../data/types';
import { BellIcon, MenuIcon, SearchIcon } from './icons';
import styles from './TopBar.module.css';

interface TopBarProps {
  title: string;
  subtitle: string;
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
  onOpenNav: () => void;
}

export function TopBar({ title, subtitle, range, onRangeChange, onOpenNav }: TopBarProps) {
  return (
    <header className={styles.topbar}>
      <button className={styles.menu} onClick={onOpenNav} aria-label="Open navigation">
        <MenuIcon />
      </button>

      <div className={styles.heading}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.search} role="search">
          <SearchIcon className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search tracks, artists…"
            aria-label="Search tracks and artists"
          />
          <kbd className={styles.kbd}>/</kbd>
        </div>

        <div className={styles.pills} role="group" aria-label="Date range">
          {dateRanges.map(({ id, label }) => (
            <button
              key={id}
              className={`${styles.pill} ${range === id ? styles.pillActive : ''}`}
              aria-pressed={range === id}
              onClick={() => onRangeChange(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <button className={styles.iconBtn} aria-label="Notifications">
          <BellIcon />
          <span className={styles.dot} aria-hidden="true" />
        </button>

        <button className={styles.avatar} aria-label="Account: Priya Nkemelu">
          <span aria-hidden="true">PN</span>
        </button>
      </div>
    </header>
  );
}
