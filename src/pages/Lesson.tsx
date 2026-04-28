import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, PlayCircle } from 'lucide-react'
import { LESSONS, getLessonById, getLocalizedLesson } from '../data/lessons'
import { useProgress } from '../context/ProgressContext'
import { useI18n } from '../context/I18nContext'
import { ChallengeCard } from '../components/gamification/ChallengeCard'
import { useXPToast } from '../hooks/useXPToast'

export function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, language } = useI18n()
  const { showXP } = useXPToast()
  const lessonRaw = id ? getLessonById(id) : undefined
  const lesson = lessonRaw ? getLocalizedLesson(lessonRaw, language) : undefined
  const { isLessonUnlocked, markLessonInProgress, markLessonComplete, completeChallenge, isChallengeCompleted, snapshot } = useProgress()
  const challengeId = `challenge-${id ?? 'unknown'}`
  const challengeDone = isChallengeCompleted(challengeId)

  useEffect(() => {
    if (lesson && isLessonUnlocked(lesson.id)) markLessonInProgress(lesson.id)
  }, [lesson, isLessonUnlocked, markLessonInProgress])

  if (!lesson) return <Navigate to="/courses" replace />
  if (!isLessonUnlocked(lesson.id)) return <Navigate to="/courses" replace />

  return (
    <div className="mx-auto max-w-3xl space-y-8">
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

      <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-mig-gold">{language === 'ne' ? 'अध्याय' : 'Chapter'} {lesson.chapterNumber}</p>
        <h1 className="mt-2 font-display text-3xl text-mig-white md:text-4xl">{lesson.title}</h1>
        <p className="mt-2 text-sm text-mig-blue">{lesson.goal}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mig-muted">
            {language === 'ne' ? `पाठ ${lesson.chapterNumber}/${LESSONS.length}` : `Lesson ${lesson.chapterNumber}/${LESSONS.length}`}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mig-muted">
            <Clock className="h-3.5 w-3.5" /> {lesson.estimatedMinutes} {language === 'ne' ? 'मिनेट' : 'min'}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-mig-gold/30 bg-mig-gold/10 px-3 py-1 text-xs font-medium text-mig-gold">
            +{lesson.pointsReward} XP
          </span>
        </div>

        <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <PlayCircle className="h-12 w-12 text-mig-gold/80" />
            <p className="text-sm font-medium text-mig-white">
              {language === 'ne' ? 'भिडियो पाठ चाँडै आउँदैछ' : 'Video lesson coming soon'}
            </p>
            <p className="text-xs text-mig-muted">
              {language === 'ne' ? 'अहिले पाठ पढेर ज्ञान जाँच दिनुहोस्' : 'For now, read the lesson and take the quiz'}
            </p>
          </div>
        </div>

        <div className="prose prose-invert mt-8 max-w-none text-sm leading-relaxed text-mig-muted">
          {lesson.content.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-mig-gold/20 bg-mig-gold/5 p-5">
          <h2 className="text-sm font-semibold text-mig-gold">{language === 'ne' ? 'वास्तविक उदाहरण' : 'Real-life example'}</h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-mig-muted">{lesson.example}</p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-mig-white">{language === 'ne' ? 'मुख्य सिकाइ' : 'Key takeaways'}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-mig-muted">
            {lesson.keyTakeaways.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 rounded-xl border border-mig-blue/30 bg-mig-blue/10 px-4 py-3">
          <p className="text-sm font-medium text-mig-blue">
            {t('lessonUnlockHint')}
          </p>
        </div>

        <div className="mt-8">
          <ChallengeCard
            language={language}
            title={language === 'ne' ? '🎯 अब तपाईंको पालो' : '🎯 Your turn now'}
            description={
              language === 'ne'
                ? 'आज तपाईंले सिकेको कुरा जीवनमा लागू गर्नुहोस्।'
                : 'Apply what you learned today in real life.'
            }
            challenge={
              language === 'ne'
                ? `आजको चुनौती: ${lesson.keyTakeaways[0] ?? 'आजको मुख्य सिकाइको एउटा बुँदा व्यवहारमा लागू गर्नुहोस्।'}`
                : `Today's challenge: ${lesson.keyTakeaways[0] ?? 'Apply one key takeaway from today in practice.'}`
            }
            completed={challengeDone}
            onComplete={() => {
              const result = completeChallenge(challengeId)
              if (!result.alreadyCompleted) {
                showXP(result.awardedXp, language === 'ne' ? 'चुनौती पूरा भयो' : 'Challenge completed')
              }
            }}
            onLater={() => navigate('/dashboard')}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => {
              const alreadyCompleted = snapshot.lessonProgress[lesson.id]?.status === 'completed'
              navigate(`/quiz/${lesson.id}`)
              if (!alreadyCompleted) {
                markLessonComplete(lesson.id)
                showXP(20, language === 'ne' ? 'पाठ पूरा भयो' : 'Lesson completed')
              }
            }}
            className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-mig-gold px-6 py-3 text-base font-semibold text-mig-bg shadow-lg shadow-mig-gold/20 transition hover:-translate-y-0.5 hover:bg-mig-gold/90 hover:shadow-mig-gold/35 active:translate-y-0"
          >
            {t('startQuiz')}
          </button>
        </div>
      </motion.article>
    </div>
  )
}
