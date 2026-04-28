import { motion } from 'framer-motion'

type Props = {
  language: 'ne' | 'en'
  level: string
  chaptersPassed: number
  chapterTotal: number
  totalXp: number
  xpToNextLevel: number
  allChaptersComplete: boolean
  nextGoal: string
  rewardText: string
  streakText: string
  rewardProgress: number
}

export function JourneyCard({
  language,
  level,
  chaptersPassed,
  chapterTotal,
  totalXp,
  xpToNextLevel,
  allChaptersComplete,
  nextGoal,
  rewardText,
  streakText,
  rewardProgress,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass relative overflow-hidden rounded-3xl border border-mig-gold/35 p-6"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-mig-gold/10 blur-3xl" />
      <h2 className="font-display text-2xl text-mig-white">{language === 'ne' ? 'तपाईंको सिकाइ यात्रा' : 'Your learning journey'}</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2 md:items-start">
        <div className="space-y-2 text-sm">
          <p className="text-mig-muted">{language === 'ne' ? 'हालको स्तर' : 'Current level'}</p>
          <p className="text-lg font-semibold text-mig-white">{level}</p>
          <p className="text-mig-muted">{language === 'ne' ? 'अर्को लक्ष्य' : 'Next goal'}</p>
          <p className="font-medium text-mig-white">{nextGoal}</p>
          <p className="text-mig-muted">{language === 'ne' ? 'लगातार सिकाइ' : 'Learning streak'}</p>
          <p className="font-medium text-mig-gold">{streakText}</p>
        </div>
        <div className="flex flex-col items-center gap-5 md:items-end">
          <div className="w-full max-w-[280px] rounded-2xl border border-white/10 bg-black/25 p-5 text-center md:text-right">
            <p className="text-xs text-mig-muted">
              {language === 'ne' ? 'पाठ प्रगति' : 'Lesson progress'}
            </p>
            <p className="mt-1 font-display text-4xl tabular-nums text-mig-white">
              {chaptersPassed}
              <span className="text-xl text-mig-muted">/{chapterTotal}</span>
            </p>
            <p className="mt-1 text-xs text-mig-muted">{language === 'ne' ? 'पाठ पूरा' : 'lessons completed'}</p>
            <div className="my-4 border-t border-white/10" />
            <p className="text-xs text-mig-muted">{language === 'ne' ? 'कमाइएको XP' : 'XP earned'}</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-mig-gold">XP: {totalXp}</p>
            {allChaptersComplete ? (
              <p className="mt-2 text-xs font-medium text-mig-green">
                {language === 'ne' ? '✅ सबै अध्याय पूरा भयो — उत्कृष्ट प्रगति!' : '✅ All chapters completed — excellent progress!'}
              </p>
            ) : (
              <>
                <p className="mt-2 text-xs text-mig-white/90">
                  {language === 'ne' ? `अर्को स्तरसम्म: ${xpToNextLevel} XP` : `${xpToNextLevel} XP to next level`}
                </p>
                <p className="mt-1 text-[11px] text-mig-muted">
                  {language === 'ne'
                    ? 'XP बढाउन: पाठ पूरा गर्नुहोस् • ज्ञान जाँच पास गर्नुहोस्'
                    : 'Gain XP: complete lessons • pass quizzes'}
                </p>
              </>
            )}
            <p className="mt-2 text-[11px] leading-snug text-mig-muted">
              {language === 'ne'
                ? 'यो रुपैयाँ होइन — पाठ, ज्ञान जाँच र दैनिक लगइनबाट XP बढ्छ।'
                : 'Not money — XP comes from lessons, quizzes, and check-ins.'}
            </p>
          </div>
          <div className="w-full max-w-[280px] space-y-2 text-center md:text-right">
            <p className="text-sm text-mig-muted">{language === 'ne' ? 'पुरस्कार' : 'Rewards'}</p>
            <p className="text-sm font-medium text-mig-white">{rewardText}</p>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rewardProgress}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-gradient-to-r from-mig-gold to-mig-blue"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
