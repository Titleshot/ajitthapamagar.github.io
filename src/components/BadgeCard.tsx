import { motion } from 'framer-motion'
import { Award, Medal, Trophy } from 'lucide-react'

const icons = { medal: Medal, award: Award, trophy: Trophy } as const

type Props = {
  name: string
  description: string
  icon: string
  earned: boolean
  delay?: number
}

export function BadgeCard({ name, description, icon, earned, delay = 0 }: Props) {
  const Icon = icons[icon as keyof typeof icons] ?? Award
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }}
      className={`rounded-2xl border p-4 ${
        earned
          ? 'border-mig-gold/40 bg-mig-gold/10 gold-glow'
          : 'border-white/10 bg-white/[0.03] opacity-70'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-8 w-8 ${earned ? 'text-mig-gold' : 'text-mig-muted'}`} />
        <div>
          <p className="font-semibold text-mig-white">{name}</p>
          <p className="text-xs text-mig-muted">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
