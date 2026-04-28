import { useEffect, useState } from 'react'

type Props = {
  value: number
  max?: number
  size?: number
  stroke?: number
  title?: string
  showFraction?: boolean
  label?: string
  sublabel?: string
}

export function ProgressRing({
  value,
  max = 100,
  size = 160,
  stroke = 10,
  title,
  showFraction = false,
  label,
  sublabel,
}: Props) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const id = window.setTimeout(() => setAnimatedValue(value), 80)
    return () => window.clearTimeout(id)
  }, [value])

  const pct = Math.min(100, Math.max(0, (animatedValue / max) * 100))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * (1 - pct / 100)

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="pointer-events-none absolute inset-6 rounded-full border border-mig-gold/10 animate-[spin_10s_linear_infinite]" />
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#migRing)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={dash}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
        <defs>
          <linearGradient id="migRing" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#F5C542" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        {title && <span className="text-[11px] font-medium text-mig-muted">{title}</span>}
        <span className="text-3xl font-semibold tabular-nums text-mig-white">
          {showFraction ? `${Math.round(animatedValue)}/${max}` : Math.round(animatedValue)}
        </span>
        {label && <span className="text-xs text-mig-muted">{label}</span>}
      </div>
      {sublabel && <p className="mt-2 max-w-[12rem] text-center text-xs text-mig-muted">{sublabel}</p>}
    </div>
  )
}
