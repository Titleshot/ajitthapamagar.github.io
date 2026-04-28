import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { getLessonById } from '../data/lessons'
import { getQuizForLesson } from '../data/quizzes'
import { useProgress } from '../context/ProgressContext'
import { PASS_MARK } from '../utils/scoring'
import { useI18n } from '../context/I18nContext'
import { useXPToast } from '../hooks/useXPToast'
import { BadgeUnlockModal } from '../components/gamification/BadgeUnlockModal'
import { BADGES, getLocalizedBadge } from '../data/badges'

export function Quiz() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { t, language } = useI18n()
  const { showXP } = useXPToast()
  const lesson = lessonId ? getLessonById(lessonId) : undefined
  const questions = lessonId ? getQuizForLesson(lessonId, language) : []
  const { isLessonUnlocked, recordQuizAttempt, nextLessonId } = useProgress()

  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [picked, setPicked] = useState<number | null>(null)
  const [showExplain, setShowExplain] = useState(false)
  const [finished, setFinished] = useState(false)
  const [result, setResult] = useState<{ percent: number; passed: boolean; points: number; attempt: number } | null>(
    null,
  )
  const [unlockedBadgeName, setUnlockedBadgeName] = useState<string | null>(null)
  const [streak, setStreak] = useState(0)
  const [questionXp, setQuestionXp] = useState(0)

  const q = questions[idx]

  if (!lesson || questions.length === 0) return <Navigate to="/courses" replace />
  if (!isLessonUnlocked(lesson.id)) return <Navigate to="/courses" replace />

  const onPick = (optionIndex: number) => {
    if (showExplain || finished) return
    const selectedCorrect = optionIndex === q.correctIndex
    setPicked(optionIndex)
    setShowExplain(true)
    if (selectedCorrect) {
      setQuestionXp(10)
      window.setTimeout(() => setQuestionXp(0), 900)
      setStreak((s) => s + 1)
    } else {
      setStreak(0)
    }
    setAnswers((prev) => {
      const next = [...prev]
      next[idx] = optionIndex
      return next
    })
  }

  const next = () => {
    if (idx + 1 >= questions.length) {
      const total = questions.length
      const merged = answers.map((a, i) => (i === idx ? picked : a))
      const correct = merged.reduce<number>((acc, sel, i) => {
        const qq = questions[i]
        if (!qq || sel === null) return acc
        return acc + (sel === qq.correctIndex ? 1 : 0)
      }, 0)
      const percent = Math.round((correct / total) * 100)
      const { passed, pointsEarned, attemptNumber, newlyUnlockedBadgeId } = recordQuizAttempt(lesson.id, percent)
      if (pointsEarned > 0) {
        showXP(pointsEarned, passed ? 'ज्ञान जाँच पास भयो' : 'प्रयास XP प्राप्त भयो')
      }
      if (newlyUnlockedBadgeId) {
        const badge = BADGES.find((b) => b.id === newlyUnlockedBadgeId)
        setUnlockedBadgeName(badge ? getLocalizedBadge(badge, language).name : language === 'ne' ? 'स्मार्ट बचतकर्ता' : 'Smart Saver')
      }
      setResult({ percent, passed, points: pointsEarned, attempt: attemptNumber })
      setFinished(true)
      return
    }
    setIdx((i) => i + 1)
    setPicked(null)
    setShowExplain(false)
  }

  const retry = () => {
    setIdx(0)
    setAnswers(questions.map(() => null))
    setPicked(null)
    setShowExplain(false)
    setFinished(false)
    setResult(null)
    setStreak(0)
    setQuestionXp(0)
  }

  if (finished && result) {
    const nextId = nextLessonId()
    return (
      <div className="mx-auto max-w-lg space-y-6 py-6">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-mig-muted hover:border-mig-gold/40 hover:text-mig-white"
          >
            <ArrowLeft className="h-4 w-4" /> {t('back')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/courses', { replace: false })}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-mig-white hover:border-mig-gold/40"
          >
            {t('courseRoadmap')}
          </button>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-mig-muted">{t('quizResult')}</p>
          <p className="mt-2 text-2xl font-semibold text-mig-white">
            {result.passed
              ? language === 'ne'
                ? 'बधाई छ 🎉'
                : 'Great job 🎉'
              : language === 'ne'
                ? 'फेरि प्रयास गरौँ'
                : "Let's try again"}
          </p>
          <p className="mt-3 font-display text-4xl text-mig-white">{result.percent}%</p>
          <p className={`mt-2 text-sm font-medium ${result.passed ? 'text-mig-green' : 'text-mig-gold'}`}>
            {result.passed
              ? language === 'ne'
                ? 'तपाईंले ज्ञान जाँच पास गर्नुभयो।'
                : 'You passed the quiz.'
              : language === 'ne'
                ? `पास हुन ${PASS_MARK}% चाहिन्छ।`
                : `${PASS_MARK}% is required to pass.`}
          </p>
          <p className="mt-4 text-sm text-mig-muted">
            {language === 'ne'
              ? `+${result.points} XP कमाउनुभयो · प्रयास #${result.attempt}`
              : `You earned +${result.points} XP · Attempt #${result.attempt}`}
          </p>
          <p className="mt-2 text-sm text-mig-gold">{language === 'ne' ? '🏅 नयाँ स्तर नजिक!' : '🏅 Close to next level!'}</p>
          <p className="mt-2 text-xs text-mig-muted">
            {language === 'ne' ? 'ब्याज प्रगति: सिकाइ जारी राख्दा छिट्टै अनलक हुन्छ।' : 'Badge progress updates as you continue.'}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {!result.passed && (
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium hover:border-mig-gold/40"
              >
                <RefreshCw className="h-4 w-4" /> {t('retryQuiz')}
              </button>
            )}
            <Link
              to={result.passed ? (nextId ? `/lesson/${nextId}` : '/dashboard') : `/lesson/${lesson.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-mig-gold px-5 py-2.5 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
            >
              {result.passed
                ? nextId
                  ? language === 'ne'
                    ? 'अर्को पाठ खोल्नुहोस्'
                    : 'Open next lesson'
                  : language === 'ne'
                    ? 'ड्यासबोर्डमा फर्कनुहोस्'
                    : 'Go to dashboard'
                : t('reviewLesson')}
            </Link>
          </div>
        </motion.div>
        <BadgeUnlockModal
          open={Boolean(unlockedBadgeName)}
          badgeName={unlockedBadgeName ?? 'Smart Saver'}
          onClose={() => setUnlockedBadgeName(null)}
        />
      </div>
    )
  }

  const isCorrect = picked !== null && q && picked === q.correctIndex

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-4">
      <div className="flex items-center justify-between text-xs text-mig-muted">
        <span>
          प्रश्न {idx + 1} / {questions.length}
        </span>
        <span className="tabular-nums">🔥 Streak: {streak} सही</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-mig-gold to-mig-blue"
          initial={false}
          animate={{ width: `${((idx + (showExplain ? 1 : 0)) / questions.length) * 100}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
      <p className="text-right text-xs text-mig-muted">प्रगति: {Math.round(((idx + (showExplain ? 1 : 0)) / questions.length) * 100)}%</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          className="glass rounded-3xl p-6 md:p-8"
        >
          <AnimatePresence>
            {questionXp > 0 && (
              <motion.div
                key={`${idx}-xp`}
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: -16, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.96 }}
                className="pointer-events-none mb-2 text-center text-sm font-semibold text-mig-gold drop-shadow-[0_0_8px_rgba(245,197,66,0.45)]"
              >
                +10 XP
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-lg font-medium text-mig-white">{q.question}</p>
          <div className="mt-6 grid gap-3">
            {q.options.map((opt, i) => {
              const selected = picked === i
              const correct = i === q.correctIndex
              const reveal = showExplain
              const tone = reveal
                ? correct
                  ? 'border-mig-green/50 bg-mig-green/15 text-mig-white'
                  : selected
                    ? 'border-red-400/40 bg-red-500/10 text-mig-white'
                    : 'border-white/10 bg-white/[0.03] text-mig-muted'
                : 'border-white/10 bg-white/[0.03] hover:border-mig-gold/40 text-mig-white'
              return (
                <motion.button
                  key={opt}
                  type="button"
                  disabled={showExplain}
                  onClick={() => onPick(i as 0 | 1 | 2 | 3)}
                  whileHover={!showExplain ? { y: -1, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' } : undefined}
                  whileTap={!showExplain ? { scale: 0.98 } : undefined}
                  animate={
                    showExplain && selected && !correct
                      ? { x: [0, -5, 5, -4, 4, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.28 }}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all ${tone} ${
                    selected ? 'ring-1 ring-mig-gold/30' : ''
                  }`}
                >
                  <span className="font-semibold text-mig-gold">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              )
            })}
          </div>
          {showExplain && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-sm text-mig-muted">
              <span className={isCorrect ? 'text-mig-green' : 'text-red-300'}>
                {isCorrect ? '✅ सही! ' : `❌ गलत — सही उत्तर: ${q.options[q.correctIndex]} `}
              </span>
              {q.explanation}
            </motion.p>
          )}
          {showExplain && (
            <button
              type="button"
              onClick={next}
              className="mt-6 w-full rounded-2xl bg-mig-gold py-3 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
            >
              {idx + 1 >= questions.length ? (language === 'ne' ? 'समाप्त गर्नुहोस्' : 'Finish') : language === 'ne' ? 'अर्को प्रश्न' : 'Next question'}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
