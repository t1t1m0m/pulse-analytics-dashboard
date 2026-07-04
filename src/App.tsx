import { useState } from 'react';
import { Sidebar, type NavKey } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import {
  AudienceView,
  ContentView,
  OverviewView,
  RevenueView,
  SettingsView,
} from './views';
import type { DateRange } from './data/types';
import styles from './App.module.css';

const PAGE_TITLES: Record<NavKey, { title: string; subtitle: string }> = {
  overview: { title: 'Overview', subtitle: 'Real-time performance across your catalog' },
  audience: { title: 'Audience', subtitle: 'Who is listening and where' },
  content: { title: 'Content', subtitle: 'Tracks, albums and playlist reach' },
  revenue: { title: 'Revenue', subtitle: 'Royalties, subscriptions and payouts' },
  settings: { title: 'Settings', subtitle: 'Workspace and reporting preferences' },
};

export default function App() {
  const [nav, setNav] = useState<NavKey>('overview');
  const [range, setRange] = useState<DateRange>('30d');
  const [navOpen, setNavOpen] = useState(false);

  const page = PAGE_TITLES[nav];

  const handleSelect = (key: NavKey) => {
    setNav(key);
    setNavOpen(false);
  };

  const renderView = () => {
    switch (nav) {
      case 'audience':
        return <AudienceView range={range} />;
      case 'content':
        return <ContentView />;
      case 'revenue':
        return <RevenueView />;
      case 'settings':
        return <SettingsView />;
      case 'overview':
      default:
        return <OverviewView range={range} />;
    }
  };

  return (
    <div className={styles.app}>
      <Sidebar
        active={nav}
        onSelect={handleSelect}
        open={navOpen}
        onClose={() => setNavOpen(false)}
      />

      <div className={styles.main}>
        <TopBar
          title={page.title}
          subtitle={page.subtitle}
          range={range}
          onRangeChange={setRange}
          onOpenNav={() => setNavOpen(true)}
        />

        <main className={styles.content}>
          {renderView()}

          <footer className={styles.footer}>
            <span>Pulse Analytics · demo data</span>
            <span>Portfolio project · built with React, TypeScript &amp; Recharts</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
