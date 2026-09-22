/**
 * Stylised, image-free project previews. Each variant is a small abstract UI
 * composition tinted by the project's hue. Swap for real screenshots by
 * setting `image` on the project.
 */

const Line = ({ w = '60%', className = '', style }) => (
  <div className={`h-1.5 rounded-[2px] bg-text/[0.12] ${className}`} style={{ width: w, ...style }} />
)

const Tint = ({ hue, className = '', style, children }) => (
  <div
    className={`rounded-[4px] ${className}`}
    style={{
      background: `linear-gradient(135deg, hsl(${hue} 20% 46% / 0.5), hsl(${hue + 40} 16% 38% / 0.22))`,
      ...style,
    }}
  >
    {children}
  </div>
)

const Solid = ({ hue, className = '', style }) => (
  <div className={`rounded-[3px] ${className}`} style={{ background: '#e4632f', ...style }} />
)

function Nav({ hue }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-text/[0.06]">
      <Solid hue={hue} className="h-2.5 w-2.5 rounded-[2px]" />
      <div className="ml-auto flex gap-2">
        <Line w="14px" className="bg-text/20" />
        <Line w="14px" />
        <Line w="14px" />
        <Line w="14px" />
      </div>
      <Solid hue={hue} className="ml-2 h-3.5 w-9 rounded-[3px] opacity-90" />
    </div>
  )
}

function Storefront({ hue }) {
  return (
    <>
      <Nav hue={hue} />
      <div className="p-3 space-y-3">
        <Tint hue={hue} className="h-[42%] flex flex-col justify-center gap-1.5 px-3 py-4">
          <Line w="45%" className="h-2 bg-text/40" />
          <Line w="30%" className="bg-text/25" />
          <div className="mt-1.5 h-3.5 w-12 rounded-[3px] bg-text/80" />
        </Tint>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-[4px] border border-text/[0.07] bg-text/[0.03] p-1.5 space-y-1.5">
              <Tint hue={hue + i * 12} className="h-9 opacity-70" />
              <Line w="70%" />
              <div className="flex items-center justify-between">
                <Line w="30%" className="bg-text/25" />
                <Solid hue={hue} className="h-2 w-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function Business({ hue }) {
  return (
    <>
      <Nav hue={hue} />
      <div className="p-3 grid grid-cols-[1.1fr_0.9fr] gap-3 items-center">
        <div className="space-y-2">
          <Line w="90%" className="h-2.5 bg-text/45" />
          <Line w="70%" className="h-2.5 bg-text/45" />
          <Line w="55%" className="h-2.5 bg-text/30" />
          <div className="pt-1 space-y-1.5">
            <Line w="95%" />
            <Line w="80%" />
          </div>
          <div className="flex gap-2 pt-1.5">
            <Solid hue={hue} className="h-4 w-12" />
            <div className="h-4 w-12 rounded-[3px] border border-text/20" />
          </div>
        </div>
        <Tint hue={hue} className="h-24" />
      </div>
      <div className="px-3 pb-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 rounded-[4px] border border-text/[0.06] p-2">
            <Solid hue={hue} className="h-3 w-3 rounded-[2px] opacity-80" />
            <Line w="70%" className="bg-text/25" />
            <Line w="90%" />
          </div>
        ))}
      </div>
    </>
  )
}

function Dashboard({ hue }) {
  const bars = [40, 65, 50, 80, 58, 92, 70, 85]
  return (
    <div className="flex h-full">
      <div className="w-[22%] border-r border-text/[0.06] p-2.5 space-y-2.5">
        <Solid hue={hue} className="h-3 w-3 rounded-[2px]" />
        <div className="pt-1 space-y-2">
          <Line w="85%" className="bg-text/30" />
          <Line w="70%" />
          <Line w="75%" />
          <Line w="60%" />
          <Line w="80%" />
        </div>
      </div>
      <div className="flex-1 p-2.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <Line w="30%" className="h-2 bg-text/35" />
          <Solid hue={hue} className="h-3.5 w-10" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-[4px] border border-text/[0.07] bg-text/[0.03] p-2 space-y-1.5">
              <Line w="50%" />
              <Line w="70%" className="h-2.5 bg-text/45" />
            </div>
          ))}
        </div>
        <div className="rounded-[4px] border border-text/[0.07] bg-text/[0.02] p-2 h-[44%] flex items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-[2px]"
              style={{
                height: `${h}%`,
                background: i === 5 ? '#e4632f' : `hsl(${hue} 18% 55% / 0.35)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function AppBoard({ hue }) {
  const cols = [3, 2, 3]
  return (
    <div className="flex h-full">
      <div className="w-[18%] border-r border-text/[0.06] p-2.5 space-y-2.5">
        <Solid hue={hue} className="h-3 w-3 rounded-[2px]" />
        <div className="pt-1 space-y-2">
          <Line w="85%" className="bg-text/30" />
          <Line w="70%" />
          <Line w="75%" />
        </div>
      </div>
      <div className="flex-1 p-2.5 grid grid-cols-3 gap-2">
        {cols.map((n, ci) => (
          <div key={ci} className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Solid hue={hue + ci * 30} className="h-1.5 w-1.5 rounded-full" />
              <Line w="55%" className="bg-text/30" />
            </div>
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} className="rounded-[4px] border border-text/[0.07] bg-text/[0.03] p-1.5 space-y-1.5">
                <Line w="90%" />
                <Line w="60%" />
                <div className="flex items-center justify-between pt-0.5">
                  <div className="h-2 w-7 rounded-full" style={{ background: `hsl(${hue + ci * 30} 20% 60% / 0.4)` }} />
                  <div className="h-2.5 w-2.5 rounded-full bg-text/20" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Mobile({ hue }) {
  return (
    <div className="h-full flex items-end justify-center gap-4 px-6 pt-4">
      {[0, 1].map((k) => (
        <div
          key={k}
          className={`w-[44%] max-w-[150px] rounded-t-[14px] border border-b-0 border-text/[0.12] bg-bg-1 overflow-hidden ${k === 1 ? 'hidden sm:block translate-y-3' : ''}`}
        >
          <div className="flex items-center justify-between px-3 pt-2">
            <Line w="14px" className="h-1 bg-text/30" />
            <div className="h-1.5 w-8 rounded-full bg-text/15" />
            <Line w="10px" className="h-1 bg-text/30" />
          </div>
          <div className="p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <Line w="45%" className="h-2 bg-text/40" />
              <Solid hue={hue} className="h-3 w-3 rounded-full" />
            </div>
            <div className="h-4 rounded-full bg-text/[0.06]" />
            {k === 0 ? (
              <>
                <Tint hue={hue} className="h-16" />
                {[0, 1].map((i) => (
                  <div key={i} className="flex gap-2 rounded-[4px] border border-text/[0.07] p-1.5">
                    <Tint hue={hue + 30 * i} className="h-7 w-7 shrink-0" />
                    <div className="flex-1 space-y-1.5 pt-0.5">
                      <Line w="80%" />
                      <Line w="50%" className="bg-text/25" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-2 rounded-[4px] border border-text/[0.07] p-1.5">
                    <Tint hue={hue + 20 * i} className="h-7 w-7 shrink-0" />
                    <div className="flex-1 space-y-1.5 pt-0.5">
                      <Line w="80%" />
                      <Line w="50%" className="bg-text/25" />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function Gallery({ hue }) {
  const heights = ['h-16', 'h-10', 'h-12', 'h-10', 'h-16', 'h-12']
  return (
    <>
      <Nav hue={hue} />
      <div className="p-3">
        <div className="flex items-center justify-between mb-2.5">
          <Line w="35%" className="h-2 bg-text/35" />
          <div className="flex gap-1.5">
            <Solid hue={hue} className="h-2.5 w-7" />
            <div className="h-2.5 w-7 rounded-[3px] bg-text/10" />
            <div className="h-2.5 w-7 rounded-[3px] bg-text/10" />
          </div>
        </div>
        <div className="columns-3 gap-2 [&>*]:mb-2">
          {heights.map((h, i) => (
            <Tint key={i} hue={hue + i * 8} className={`${h} w-full break-inside-avoid`} style={{ opacity: 0.55 + (i % 3) * 0.15 }} />
          ))}
        </div>
      </div>
    </>
  )
}

const VARIANTS = {
  storefront: Storefront,
  business: Business,
  dashboard: Dashboard,
  app: AppBoard,
  mobile: Mobile,
  gallery: Gallery,
}

export default function ProjectMockup({ variant = 'business', hue = 210, image = null, name = '', className = '' }) {
  const Variant = VARIANTS[variant] || Business
  const isMobile = variant === 'mobile'

  if (image) {
    return (
      <div className={`overflow-hidden rounded-t-[6px] border border-b-0 border-text/[0.12] bg-bg-1 ${className}`}>
        <img src={image} alt={`${name} preview`} className="w-full h-full object-cover object-top" loading="lazy" />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className={`h-full ${className}`}>
        <Variant hue={hue} />
      </div>
    )
  }

  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-t-[6px] border border-b-0 border-text/[0.12] bg-bg-1 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-text/[0.06] bg-text/[0.02] px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-text/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-text/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-text/20" />
        <span className="ml-2 h-2.5 flex-1 max-w-[46%] rounded-[3px] bg-text/[0.06]" />
      </div>
      <div className="flex-1 min-h-0">
        <Variant hue={hue} />
      </div>
    </div>
  )
}
