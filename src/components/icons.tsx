import type { ReactNode, SVGProps } from 'react';

/**
 * Lightweight inline SVG icon set (no icon-library dependency).
 * All icons inherit `currentColor` and use a 24x24 viewBox with a 2px stroke.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const OverviewIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </Base>
);

export const AudienceIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.2a3.2 3.2 0 0 1 0 6" />
    <path d="M17 14.6A5.5 5.5 0 0 1 20.5 20" />
  </Base>
);

export const ContentIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="7" cy="17" r="2.6" />
    <circle cx="18" cy="15" r="2.6" />
    <path d="M9.6 17V6l11-2v11" />
    <path d="M9.6 9.2 20.6 7.2" />
  </Base>
);

export const RevenueIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 15.5 9 10l4 3.5L20 6" />
    <path d="M20 10V6h-4" />
    <path d="M3.5 20.5h17" />
  </Base>
);

export const SettingsIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v2.4M12 19.1v2.4M4.2 7l2.1 1.2M17.7 15.8l2.1 1.2M4.2 17l2.1-1.2M17.7 8.2l2.1-1.2" />
  </Base>
);

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </Base>
);

export const BellIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10.5 20a2 2 0 0 0 3 0" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6 18 18M18 6 6 18" />
  </Base>
);

export const ArrowUpIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Base>
);

export const ArrowDownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Base>
);

export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 5.5v13l11-6.5-11-6.5Z" />
  </Base>
);

export const HeadphonesIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="3" y="13" width="4" height="7" rx="1.6" />
    <rect x="17" y="13" width="4" height="7" rx="1.6" />
  </Base>
);

export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" />
  </Base>
);

export const CoinIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v9M14.4 9.4c-.6-.9-1.5-1.3-2.6-1.3-1.5 0-2.5.8-2.5 2s.9 1.7 2.5 2 2.6.8 2.6 2.1-1 2-2.6 2c-1.2 0-2.1-.5-2.7-1.4" />
  </Base>
);

export const SortIcon = (p: IconProps) => (
  <Base {...p} width="14" height="14">
    <path d="M8 4v16M8 4 4.5 7.5M8 4l3.5 3.5" opacity="0.9" />
    <path d="M16 20V4M16 20l3.5-3.5M16 20l-3.5-3.5" opacity="0.4" />
  </Base>
);
