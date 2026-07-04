import { useState, type FormEvent } from 'react';
import { Panel } from '../components/Panel';
import styles from './views.module.css';

interface ToggleState {
  weeklyDigest: boolean;
  payoutAlerts: boolean;
  anomalyAlerts: boolean;
}

const TOGGLES: { key: keyof ToggleState; title: string; hint: string }[] = [
  {
    key: 'weeklyDigest',
    title: 'Weekly email digest',
    hint: 'A Monday summary of streams, listeners and revenue.',
  },
  {
    key: 'payoutAlerts',
    title: 'Payout notifications',
    hint: 'Email me when a royalty payout changes status.',
  },
  {
    key: 'anomalyAlerts',
    title: 'Anomaly detection',
    hint: 'Flag unusual spikes or drops in daily streams.',
  },
];

export function SettingsView() {
  const [workspace, setWorkspace] = useState('Marlowe Vane — Label');
  const [timezone, setTimezone] = useState('Europe/Berlin');
  const [currency, setCurrency] = useState('USD');
  const [toggles, setToggles] = useState<ToggleState>({
    weeklyDigest: true,
    payoutAlerts: true,
    anomalyAlerts: false,
  });
  const [saved, setSaved] = useState(false);

  const flip = (key: keyof ToggleState) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div className={styles.stack}>
      <div className={styles.twoCol}>
        <Panel title="Workspace" subtitle="How this reporting space is configured">
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="ws-name">
                Workspace name
              </label>
              <input
                id="ws-name"
                className={styles.input}
                value={workspace}
                onChange={(e) => {
                  setWorkspace(e.target.value);
                  setSaved(false);
                }}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="ws-tz">
                Reporting timezone
              </label>
              <select
                id="ws-tz"
                className={styles.select}
                value={timezone}
                onChange={(e) => {
                  setTimezone(e.target.value);
                  setSaved(false);
                }}
              >
                <option>Europe/Berlin</option>
                <option>Europe/London</option>
                <option>America/New_York</option>
                <option>Asia/Tokyo</option>
                <option>UTC</option>
              </select>
              <span className={styles.fieldHint}>
                All charts and daily buckets align to this timezone.
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="ws-cur">
                Payout currency
              </label>
              <select
                id="ws-cur"
                className={styles.select}
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  setSaved(false);
                }}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveBtn}>
                Save changes
              </button>
              {saved && <span className={styles.saved}>Saved ✓</span>}
            </div>
          </form>
        </Panel>

        <Panel title="Notifications" subtitle="What lands in your inbox">
          <div>
            {TOGGLES.map((t) => (
              <div key={t.key} className={styles.toggleRow}>
                <span className={styles.toggleText}>
                  <span className={styles.toggleTitle}>{t.title}</span>
                  <span className={styles.fieldHint}>{t.hint}</span>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={toggles[t.key]}
                  aria-label={t.title}
                  className={styles.switch}
                  onClick={() => flip(t.key)}
                >
                  <span className={styles.switchKnob} />
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
