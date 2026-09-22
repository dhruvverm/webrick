/** Minimal, consistent line glyphs for the tech stack (24px grid, 1.6 stroke). */
const common = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const Text = ({ children, size = 7, y = 15 }) => (
  <text
    x="12"
    y={y}
    textAnchor="middle"
    fontFamily="Geist Mono, JetBrains Mono, ui-monospace, monospace"
    fontWeight="600"
    fontSize={size}
    fill="currentColor"
    stroke="none"
  >
    {children}
  </text>
)

const Box = ({ children }) => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    {children}
  </>
)

const Cylinder = ({ children }) => (
  <>
    <ellipse cx="12" cy="6" rx="7" ry="2.6" />
    <path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
    {children}
  </>
)

const glyphs = {
  // Frontend
  react: (
    <svg {...common}>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(120 12 12)" />
    </svg>
  ),
  nextjs: (
    <svg {...common}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M9 16V8l6.5 8.5M15 8v5" />
    </svg>
  ),
  typescript: (
    <svg {...common}>
      <Box><Text size={7.5} y={15}>TS</Text></Box>
    </svg>
  ),
  javascript: (
    <svg {...common}>
      <Box><Text size={7.5} y={15}>JS</Text></Box>
    </svg>
  ),
  tailwind: (
    <svg {...common}>
      <path d="M3 10c1.5-3 3.5-4 6-3s3 3 4.5 3.5S17 10 18 8.5" />
      <path d="M3 16c1.5-3 3.5-4 6-3s3 3 4.5 3.5S17 16 18 14.5" />
    </svg>
  ),
  html: (
    <svg {...common}>
      <path d="m8.5 6.5-5.5 5.5 5.5 5.5M15.5 6.5l5.5 5.5-5.5 5.5M13.5 4l-3 16" />
    </svg>
  ),

  // Backend
  node: (
    <svg {...common}>
      <path d="M12 2.5 20.2 7.25v9.5L12 21.5 3.8 16.75v-9.5L12 2.5Z" />
      <path d="M12 7.5v9M8.2 9.7 12 12l3.8-2.3" />
    </svg>
  ),
  express: (
    <svg {...common}>
      <Box><Text size={7} y={14.5}>ex</Text></Box>
    </svg>
  ),
  php: (
    <svg {...common}>
      <ellipse cx="12" cy="12" rx="10" ry="6" />
      <Text size={6} y={14}>php</Text>
    </svg>
  ),
  laravel: (
    <svg {...common}>
      <path d="M4 5.5 8 3l4 2.5v5L8 13l-4-2.5v-5Z" />
      <path d="M12 10.5 16 8l4 2.5v5L16 18l-4-2.5v-5ZM8 13v5.5l4 2.5 4-2.5" />
    </svg>
  ),
  python: (
    <svg {...common}>
      <path d="M12 3c-3 0-4.5 1-4.5 3v3h9V6c0-2-1.5-3-4.5-3Z" />
      <path d="M12 21c3 0 4.5-1 4.5-3v-3h-9v3c0 2 1.5 3 4.5 3Z" />
      <path d="M7.5 9H5.5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2M16.5 15h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2" />
      <circle cx="10" cy="5.6" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14" cy="18.4" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  ),

  // Databases
  postgresql: (
    <svg {...common}>
      <Cylinder><path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" /></Cylinder>
    </svg>
  ),
  mysql: (
    <svg {...common}>
      <Cylinder><Text size={5.5} y={16}>SQL</Text></Cylinder>
    </svg>
  ),
  mongodb: (
    <svg {...common}>
      <path d="M12 2.5c-4 4.2-5.3 8-4.2 11.5.9 2.8 2.9 4.3 4.2 7.5 1.3-3.2 3.3-4.7 4.2-7.5 1.1-3.5-.2-7.3-4.2-11.5Z" />
      <path d="M12 8v13.5" />
    </svg>
  ),
  redis: (
    <svg {...common}>
      <path d="m12 3.5 8 3.5-8 3.5-8-3.5 8-3.5Z" />
      <path d="m4 12 8 3.5 8-3.5M4 17l8 3.5 8-3.5" />
    </svg>
  ),
  firebase: (
    <svg {...common}>
      <path d="M5.5 16.5 8.5 4l3.2 5.2L13.5 6l5 10.5a6.5 6.5 0 0 1-13 0Z" />
    </svg>
  ),

  // Platforms
  shopify: (
    <svg {...common}>
      <path d="M6.5 8h11l1 12h-13l1-12Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      <path d="M10 12.5c.5.8 1.2 1.2 2 1.2s1.5-.4 2-1.2" />
    </svg>
  ),
  wordpress: (
    <svg {...common}>
      <circle cx="12" cy="12" r="9.5" />
      <Text size={9} y={15.5}>W</Text>
    </svg>
  ),
  woocommerce: (
    <svg {...common}>
      <path d="M3 4.5h2.2l2.3 10.5h10l2-7H6.4" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="16" cy="19" r="1.4" />
    </svg>
  ),

  // Mobile
  flutter: (
    <svg {...common}>
      <path d="M14 3h6L7.5 15.5 4.5 12.5 14 3Z" />
      <path d="M20 21h-6l-4.2-4.2 3-3L20 21Z" />
    </svg>
  ),
  reactnative: (
    <svg {...common}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="4.2" ry="1.6" />
      <ellipse cx="12" cy="12" rx="4.2" ry="1.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="4.2" ry="1.6" transform="rotate(120 12 12)" />
    </svg>
  ),
  swift: (
    <svg {...common}>
      <path d="M4.5 5.5c3.5 3 7 5.5 9.5 6.8-.7-2-2.2-4.7-4-7.5 3.8 3 6.5 6.4 8 9.7 1 2.2.7 3.8.2 4.5-1.2-1.5-2.8-2-4.8-1.5-2.6.7-5.6.3-8.5-2.5 2.6 1.5 5.2 1.8 7.4 1-2.8-1.7-5.8-5-7.8-10.5Z" />
    </svg>
  ),
  kotlin: (
    <svg {...common}>
      <path d="M4 4h16L4 20V4Z" />
      <path d="m4 20 8-8 8 8H4Z" />
    </svg>
  ),

  // Infrastructure
  aws: (
    <svg {...common}>
      <path d="M17.5 18H9a6 6 0 1 1 5.7-7.8h2.8a3.9 3.9 0 1 1 0 7.8Z" />
      <path d="M8 21c2.5 1 5.5 1 8 0" />
    </svg>
  ),
  docker: (
    <svg {...common}>
      <rect x="4" y="11" width="3.4" height="3.4" rx="0.5" />
      <rect x="8.3" y="11" width="3.4" height="3.4" rx="0.5" />
      <rect x="12.6" y="11" width="3.4" height="3.4" rx="0.5" />
      <rect x="8.3" y="6.7" width="3.4" height="3.4" rx="0.5" />
      <rect x="12.6" y="6.7" width="3.4" height="3.4" rx="0.5" />
      <path d="M2.5 15.5c0 3 2.5 4.5 6 4.5 5 0 9.5-2.5 11-7 1.2 0 2.2-.5 2.5-1.3-.8-.6-2-.6-2.8-.3" />
    </svg>
  ),
  vercel: (
    <svg {...common}>
      <path d="M12 4.5 20.5 19h-17L12 4.5Z" />
    </svg>
  ),
  nginx: (
    <svg {...common}>
      <path d="M12 2.5 20.2 7.25v9.5L12 21.5 3.8 16.75v-9.5L12 2.5Z" />
      <path d="M9 15.5v-7l6 7v-7" />
    </svg>
  ),
  git: (
    <svg {...common}>
      <circle cx="6" cy="4.5" r="2" />
      <circle cx="18" cy="7.5" r="2" />
      <circle cx="6" cy="19.5" r="2" />
      <path d="M6 6.5v11" />
      <path d="M18 9.5a6 6 0 0 1-6 6H8" />
    </svg>
  ),
}

export default function TechGlyph({ name, className = '' }) {
  return <span className={`inline-flex ${className}`}>{glyphs[name] || glyphs.javascript}</span>
}
