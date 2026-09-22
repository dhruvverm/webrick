/** Minimal, consistent line glyphs for the tech stack. */
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
    fontFamily="JetBrains Mono, ui-monospace, monospace"
    fontWeight="600"
    fontSize={size}
    fill="currentColor"
    stroke="none"
  >
    {children}
  </text>
)

const glyphs = {
  react: (
    <svg {...common}>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(120 12 12)" />
    </svg>
  ),
  javascript: (
    <svg {...common}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <Text size={7.5} y={15}>JS</Text>
    </svg>
  ),
  node: (
    <svg {...common}>
      <path d="M12 2.5 20.2 7.25v9.5L12 21.5 3.8 16.75v-9.5L12 2.5Z" />
      <path d="M12 7.5v9M8.2 9.7 12 12l3.8-2.3" />
    </svg>
  ),
  php: (
    <svg {...common}>
      <ellipse cx="12" cy="12" rx="10" ry="6" />
      <Text size={6} y={14}>php</Text>
    </svg>
  ),
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
  flutter: (
    <svg {...common}>
      <path d="M14 3h6L7.5 15.5 4.5 12.5 14 3Z" />
      <path d="M20 21h-6l-4.2-4.2 3-3L20 21Z" />
    </svg>
  ),
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
