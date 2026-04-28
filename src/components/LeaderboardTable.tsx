import { motion } from 'framer-motion'
import type { MockMember } from '../data/users'

type Props = {
  rows: MockMember[]
  delay?: number
}

export function LeaderboardTable({ rows, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="glass overflow-hidden rounded-2xl"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-mig-muted">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">XP</th>
              <th className="px-4 py-3">Badge</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.rank}-${r.name}`} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-semibold text-mig-gold">#{r.rank}</td>
                <td className="px-4 py-3 text-mig-white">{r.name}</td>
                <td className="px-4 py-3 text-mig-muted">{r.district}</td>
                <td className="px-4 py-3 tabular-nums text-mig-white">{r.points.toLocaleString()}</td>
                <td className="px-4 py-3 text-xs text-mig-blue">{r.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
