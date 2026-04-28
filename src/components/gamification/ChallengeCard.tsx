import { motion } from 'framer-motion'

type Props = {
  language: 'en' | 'ne'
  title: string
  description: string
  challenge: string
  completed: boolean
  onComplete: () => void
  onLater: () => void
}

export function ChallengeCard({ language, title, description, challenge, completed, onComplete, onLater }: Props) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-mig-gold/25 bg-mig-gold/5 p-5">
      <h3 className="text-lg font-semibold text-mig-white">{title}</h3>
      <p className="mt-2 text-sm text-mig-muted">{description}</p>
      <p className="mt-3 rounded-xl bg-black/20 p-3 text-sm text-mig-white">{challenge}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-mig-gold/15 px-3 py-1 text-xs font-medium text-mig-gold">
          {language === 'ne' ? 'चुनौती पूरा गरेपछि +30 XP' : '+30 XP after challenge completion'}
        </span>
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onComplete}
          disabled={completed}
          className="rounded-xl bg-mig-gold px-4 py-2 text-sm font-semibold text-mig-bg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {completed ? (language === 'ne' ? 'पूरा भयो' : 'Completed') : language === 'ne' ? 'चुनौती पूरा गर्छु' : 'Complete challenge'}
        </motion.button>
        {!completed && (
          <button
            type="button"
            onClick={onLater}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-mig-white hover:border-mig-gold/40"
          >
            {language === 'ne' ? 'पछि गर्छु' : 'Do later'}
          </button>
        )}
      </div>
    </motion.section>
  )
}
