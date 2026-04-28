import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

type Props = {
  completedLessons: number
  targetLessons: number
  language: 'ne' | 'en'
}

export function RewardTeaserCard({ completedLessons, targetLessons, language }: Props) {
  const progress = Math.min(100, Math.round((completedLessons / targetLessons) * 100))
  const lessonsLeft = Math.max(0, targetLessons - completedLessons)
  const reachedTarget = completedLessons >= targetLessons

  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-mig-white">
        {reachedTarget
          ? language === 'ne'
            ? '🎉 पहिलो उपलब्धि अनलक भयो'
            : '🎉 First achievement unlocked'
          : language === 'ne'
            ? '🎁 पहिलो पुरस्कार नजिकै छ'
            : '🎁 First reward is close'}
      </h3>
      {reachedTarget ? (
        <>
          <p className="mt-2 text-sm text-mig-muted">
            {language === 'ne'
              ? `तपाईंले ${targetLessons} पाठ लक्ष्य पूरा गर्नुभयो — उत्कृष्ट प्रगति!`
              : `You completed the ${targetLessons}-lesson goal — excellent progress!`}
          </p>
          <p className="mt-1 text-xs text-mig-gold">
            {language === 'ne' ? 'अब रिवार्ड पेजमा गएर आफ्नो उपलब्धि दाबी गर्नुहोस् 🎁' : 'Now visit rewards page to claim your achievement 🎁'}
          </p>
          <p className="mt-3 text-sm font-medium text-mig-gold">
            {targetLessons}/{targetLessons} {language === 'ne' ? 'लक्ष्य पूरा' : 'goal complete'}
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 text-sm text-mig-muted">
            {language === 'ne'
              ? `🎁 तपाईं पहिलो उपलब्धिबाट केवल ${lessonsLeft} पाठ टाढा हुनुहुन्छ`
              : `🎁 You are only ${lessonsLeft} lessons away from your first achievement`}
          </p>
          <p className="mt-1 text-xs text-mig-white/80">
            {language === 'ne'
              ? 'अहिले सुरु गर्नुभयो भने आजै 1 कदम अगाडि बढ्नुहुन्छ'
              : 'Start now and you can move one step ahead today'}
          </p>
          <p className="mt-1 text-xs text-mig-gold">
            {language === 'ne'
              ? `केवल ${targetLessons} पाठ पूरा गरेपछि तपाईं पहिलो उपलब्धि अनलक गर्नुहुनेछ 🎁`
              : `Complete ${targetLessons} lessons to unlock your first achievement 🎁`}
          </p>
          <p className="mt-3 text-sm font-medium text-mig-gold">
            {completedLessons}/{targetLessons} {language === 'ne' ? 'पाठ पूरा' : 'lessons completed'}
          </p>
        </>
      )}
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="relative h-full rounded-full bg-gradient-to-r from-mig-gold to-mig-blue"
        />
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '220%' }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
          className="relative -mt-2 h-2 w-10 bg-white/30 blur-[1px]"
        />
      </div>
      <Link
        to="/rewards"
        className="mt-4 inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-mig-white hover:border-mig-gold/40"
      >
        {language === 'ne' ? 'पुरस्कार हेर्नुहोस्' : 'View rewards'}
      </Link>
    </motion.section>
  )
}
