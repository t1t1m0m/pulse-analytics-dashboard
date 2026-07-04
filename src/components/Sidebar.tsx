import type { SVGProps } from 'react';
import {
  AudienceIcon,
  CloseIcon,
  ContentIcon,
  OverviewIcon,
  RevenueIcon,
  SettingsIcon,
} from './icons';
import styles from './Sidebar.module.css';

export type NavKey = 'overview' | 'audience' | 'content' | 'revenue' | 'settings';

interface NavItem {
  key: NavKey;
  label: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

const NAV: NavItem[] = [
  { key: 'overview', label: 'Overview', Icon: OverviewIcon },
  { key: 'audience', label: 'Audience', Icon: AudienceIcon },
  { key: 'content', label: 'Content', Icon: ContentIcon },
  { key: 'revenue', label: 'Revenue', Icon: RevenueIcon },
  { key: 'settings', label: 'Settings', Icon: SettingsIcon },
];

interface SidebarProps {
  active: NavKey;
  onSelect: (key: NavKey) => void;
  /** Mobile drawer open state. */
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ active, onSelect, open, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            <svg viewBox="0 0 32 32" width="26" height="26">
              <path
                d="M3 16h5l2.5-8 4 20 3-12 2 6h7.5"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={styles.wordmark}>Pulse</span>
          <button className={styles.close} onClick={onClose} aria-label="Close navigation">
            <CloseIcon />
          </button>
        </div>

        <p className={styles.sectionLabel}>Analytics</p>
        <nav aria-label="Primary">
          <ul>
            {NAV.map(({ key, label, Icon }) => {
              const isActive = key === active;
              return (
                <li key={key}>
                  <button
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => onSelect(key)}
                  >
                    <span className={styles.navIcon}>
                      <Icon />
                    </span>
                    <span className={styles.navLabel}>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.upsell}>
          <p className={styles.upsellTitle}>Pro insights</p>
          <p className={styles.upsellBody}>
            Predictive royalty forecasting and cohort retention unlock on the Studio plan.
          </p>
          <button className={styles.upsellBtn}>Upgrade</button>
        </div>
      </aside>
    </>
  );
}
