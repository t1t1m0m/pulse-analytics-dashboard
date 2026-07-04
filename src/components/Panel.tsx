import type { ReactNode } from 'react';
import styles from './Panel.module.css';

interface PanelProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Panel({ title, subtitle, action, className, children }: PanelProps) {
  return (
    <section className={`card ${styles.panel} ${className ?? ''}`}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
