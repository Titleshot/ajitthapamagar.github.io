import { motion } from 'framer-motion'

type Props = {
  onStart: () => void
  language: 'ne' | 'en'
}

export function TodaysGoalCard({ onStart, language }: Props) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-mig-white">{language === 'ne' ? '🎯 आजको लक्ष्य' : "🎯 Today's goal"}</h3>
      <p className="mt-2 text-sm text-mig-muted">
        {language === 'ne'
          ? 'आज 1 पाठ पूरा गर्नुहोस् र 20 XP तुरुन्त कमाउनुहोस् ⚡'
          : 'Complete 1 lesson today and earn 20 XP instantly ⚡'}
      </p>
      <p className="mt-1 text-xs text-mig-white/80">
        {language === 'ne' ? 'अहिले सुरु गर्नुभयो भने 2 मिनेटमै पूरा हुन्छ' : 'You can finish this in about 2 minutes if you start now'}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-mig-gold/15 px-3 py-1 text-xs font-medium text-mig-gold">+20 XP</span>
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onStart}
          className="rounded-xl bg-mig-gold px-4 py-2 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90 animate-pulse"
        >
          {language === 'ne' ? 'लक्ष्य सुरु गरौँ' : 'Start goal'}
        </motion.button>
      </div>
    </motion.section>
  )
}
