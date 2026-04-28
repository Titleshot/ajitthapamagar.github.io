import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  title: string
  value: string | number
  hint?: string
  delay?: number
}

export function StatCard({ icon: Icon, title, value, hint, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="glass gold-glow rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-mig-muted">{title}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-mig-white">{value}</p>
          {hint && <p className="mt-1 text-xs text-mig-muted">{hint}</p>}
        </div>
        <div className="rounded-xl bg-mig-gold/10 p-2 ring-1 ring-mig-gold/25">
          <Icon className="h-5 w-5 text-mig-gold" />
        </div>
      </div>
    </motion.div>
  )
}
