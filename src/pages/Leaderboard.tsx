import { useState } from 'react'
import { motion } from 'framer-motion'
import { LeaderboardTable } from '../components/LeaderboardTable'
import {
  MOCK_DISTRICT_KASKI,
  MOCK_FEMALE_TOP,
  MOCK_LEADERBOARD,
  MOCK_WEEKLY,
  MOCK_YOUTH_TOP,
} from '../data/users'

const tabs = [
  { id: 'overall', label: 'Overall', rows: MOCK_LEADERBOARD },
  { id: 'weekly', label: 'Weekly top', rows: MOCK_WEEKLY },
  { id: 'district', label: 'Kaski district', rows: MOCK_DISTRICT_KASKI.length ? MOCK_DISTRICT_KASKI : MOCK_LEADERBOARD.slice(0, 4) },
  { id: 'female', label: 'Female top', rows: MOCK_FEMALE_TOP },
  { id: 'youth', label: 'Youth top', rows: MOCK_YOUTH_TOP },
] as const

export function Leaderboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('overall')
  const rows = tabs.find((t) => t.id === tab)?.rows ?? MOCK_LEADERBOARD

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-mig-white md:text-4xl">Leaderboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-mig-muted">
          Mock data for MVP — connect Supabase for live rankings by district, week, and segments.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.id ? 'bg-mig-gold text-mig-bg' : 'border border-white/10 text-mig-muted hover:text-mig-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <LeaderboardTable rows={rows} />
    </div>
  )
}
