import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, Lock, PlayCircle } from 'lucide-react'
import type { Lesson } from '../data/lessons'

type Props = {
  lesson: Lesson
  unlocked: boolean
  completed: boolean
  passedQuiz: boolean
  quizPercent: number | null
  index: number
  isCurrent: boolean
}

export function LessonCard({ lesson, unlocked, completed, passedQuiz, quizPercent, index, isCurrent }: Props) {
  const statusLabel = !unlocked ? 'लक छ' : passedQuiz ? 'पूरा भयो' : isCurrent ? 'अहिले सिक्दै' : completed ? 'ज्ञान जाँच बाँकी' : 'सुरु गर्नुहोस्'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`glass relative overflow-hidden rounded-2xl p-5 ${!unlocked ? 'opacity-70' : ''} ${isCurrent ? 'ring-1 ring-mig-gold/40' : ''}`}
    >
      {!unlocked && (
        <div className="absolute right-4 top-4 rounded-full bg-black/50 p-2 ring-1 ring-white/10">
          <Lock className="h-4 w-4 text-mig-muted" />
        </div>
      )}
      <p className="text-xs font-semibold text-mig-gold">अध्याय {lesson.chapterNumber}</p>
      <h3 className="mt-1 font-display text-xl text-mig-white">{lesson.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-mig-muted">{lesson.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-mig-muted">
        <span className="rounded-lg bg-white/5 px-2 py-1">{lesson.estimatedMinutes} मिनेट</span>
        <span className="rounded-lg bg-white/5 px-2 py-1">+{lesson.pointsReward} पाठ XP</span>
        {quizPercent !== null && (
          <span className="rounded-lg bg-mig-green/10 px-2 py-1 text-mig-green">ज्ञान जाँच {quizPercent}%</span>
        )}
        <span className="rounded-lg bg-white/5 px-2 py-1">{statusLabel}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {unlocked ? (
          <>
            <Link
              to={`/lesson/${lesson.id}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-mig-gold/90 px-4 py-2.5 text-sm font-semibold text-mig-bg hover:bg-mig-gold min-[400px]:flex-none"
            >
              <PlayCircle className="h-4 w-4" /> {completed || passedQuiz ? 'पुनरावलोकन' : 'पाठ सुरु गरौँ'}
            </Link>
            <Link
              to={`/quiz/${lesson.id}`}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold min-[400px]:flex-none ${
                passedQuiz
                  ? 'border-mig-green/40 text-mig-green hover:bg-mig-green/10'
                  : 'border-white/15 text-mig-white hover:border-mig-gold/40 hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" /> ज्ञान जाँच
            </Link>
          </>
        ) : (
          <span className="text-sm text-mig-muted">अघिल्लो अध्यायको ज्ञान जाँच पास गरेपछि अनलक हुन्छ।</span>
        )}
      </div>
    </motion.div>
  )
}
