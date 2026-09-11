type IconProps = { className?: string }

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const base = (className?: string) => ({
  viewBox: '0 0 24 24',
  className,
  'aria-hidden': true as const,
  focusable: 'false' as const,
})

/** Line icons drawn for this project — one per "profil działalności" entry. */
export const icons = {
  snowflake: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M12 2v20M4.2 6.5l15.6 9M19.8 6.5l-15.6 9" />
      <path d="M12 6.2 9.5 4M12 6.2 14.5 4M12 17.8 9.5 20M12 17.8 14.5 20" />
    </svg>
  ),
  panel: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9.3h18M3 14.7h18" />
      <path d="M7 4v16" opacity=".45" />
    </svg>
  ),
  door: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M4 21V4.6a.6.6 0 0 1 .5-.6l12-2a.6.6 0 0 1 .7.6V21" />
      <path d="M2.5 21h19" />
      <circle cx="14" cy="12" r="1" />
    </svg>
  ),
  floor: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M2 20h20" />
      <path d="M5 20V9.5l7-4.5 7 4.5V20" />
      <path d="M5 14.5h14M12 5v15" opacity=".5" />
    </svg>
  ),
  blueprint: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M3 8h18M8 8v13" />
      <path d="M12 12h5M12 16h5" opacity=".6" />
    </svg>
  ),
  stairs: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M3 20h4v-4h4v-4h4V8h6" />
      <path d="M3 20V17" opacity=".5" />
    </svg>
  ),
  hall: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M2 11 12 4l10 7" />
      <path d="M4 11v9h16v-9" />
      <path d="M9 20v-5h6v5" />
    </svg>
  ),
  factory: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M2 20h20" />
      <path d="M3 20v-9l5 3V11l5 3V11l5 3v6" />
      <path d="M18 8V3h3v5" />
    </svg>
  ),
  refresh: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
      <path d="M20.8 4.5v4.8H16" />
    </svg>
  ),
  tools: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.6L21 20l-1.4 1.4-8.9-1.9" />
      <path d="M9.5 3 3 9.5l3 3L12.5 6z" />
      <path d="m5.5 15.5-2.6 2.6a1.7 1.7 0 0 0 2.4 2.4l2.6-2.6z" />
    </svg>
  ),
  move: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <rect x="2" y="8" width="13" height="9" rx="1" />
      <path d="M15 11h3.4l2.6 3v3h-6" />
      <circle cx="7" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
    </svg>
  ),
  phone: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3 12.6 11.4 21 19.4 21A1.5 1.5 0 0 0 21 19.5v-2a1.3 1.3 0 0 0-1-1.3l-3-.7a1.3 1.3 0 0 0-1.3.5l-1 1.3a14.6 14.6 0 0 1-6-6l1.3-1a1.3 1.3 0 0 0 .5-1.3l-.7-3A1.3 1.3 0 0 0 6.5 3z" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  pin: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  arrowRight: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  ),
  arrowDown: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  ),
  expand: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M9 3H3v6M15 21h6v-6M21 9V3h-6M3 15v6h6" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  ),
  clock: (p: IconProps) => (
    <svg {...base(p.className)} {...S}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  ),
} satisfies Record<string, (p: IconProps) => JSX.Element>

export type IconName = keyof typeof icons

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name]
  return <Component className={className} />
}
