import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Trophy } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { LESSONS } from '../data/lessons'
import { BadgeCard } from '../components/BadgeCard'
import { BADGES, getLocalizedBadge } from '../data/badges'
import { MOCK_LEADERBOARD } from '../data/users'
import { PASS_MARK } from '../utils/scoring'
import { useI18n } from '../context/I18nContext'
import { getLocalizedLesson } from '../data/lessons'
import { JourneyCard } from '../components/gamification/JourneyCard'
import { TodaysGoalCard } from '../components/gamification/TodaysGoalCard'
import { RewardTeaserCard } from '../components/gamification/RewardTeaserCard'
import { useXPToast } from '../hooks/useXPToast'
import { sanitizeDisplayFirstName } from '../utils/displayName'

export function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t, language } = useI18n()
  const { showXP } = useXPToast()
  const {
    registerDailyLogin,
    level,
    chaptersPassed,
    nextLessonId,
    snapshot,
    earnedBadgeIds,
    totalXp,
  } = useProgress()
  const [activePanel, setActivePanel] = useState<'badges' | 'recent' | 'leaderboard' | 'rewards'>('recent')
  const healthScore = useMemo(() => {
    try {
      const raw = localStorage.getItem('mig_health_score_result')
      return raw ? (JSON.parse(raw) as { totalScore: number }) : null
    } catch {
      return null
    }
  }, [])
  const localizedLevel =
    language === 'ne'
      ? level === 'Beginner'
        ? 'सुरुआती'
        : level === 'Saver'
          ? 'बचतकर्ता'
          : level === 'Smart Planner'
            ? 'स्मार्ट योजनाकार'
            : level === 'Wealth Builder'
              ? 'सम्पत्ति निर्माता'
              : level === 'MIG Financial Champion'
                ? 'MIG वित्तीय च्याम्पियन'
                : level
      : level

  useEffect(() => {
    registerDailyLogin()
  }, [registerDailyLogin])

  useEffect(() => {
    if (!user) return
    const flagKey = `mig-wa-login-xp-shown-${user.memberId}`
    if (localStorage.getItem(flagKey)) return
    showXP(10, language === 'ne' ? 'लगइन बोनस' : 'Login bonus')
    localStorage.setItem(flagKey, '1')
  }, [user, showXP, language])

  const nextId = nextLessonId()
  const nextLessonRaw = nextId ? LESSONS.find((l) => l.id === nextId) : null
  const nextLesson = nextLessonRaw ? getLocalizedLesson(nextLessonRaw, language) : null
  const memberFallback = language === 'ne' ? 'सदस्य' : 'Member'
  const firstName = sanitizeDisplayFirstName(user?.fullName, memberFallback)
  const allChaptersComplete = chaptersPassed >= LESSONS.length
  const nextGoal = allChaptersComplete
    ? language === 'ne'
      ? 'सबै अध्याय पूरा भयो — अब रिवार्ड र लिडरबोर्डमा ध्यान दिनुहोस्'
      : 'All chapters complete — now focus on rewards and leaderboard.'
    : nextLesson
      ? language === 'ne'
        ? `अर्को पाठ पूरा गर्नुहोस्: ${nextLesson.title}`
        : `Complete next lesson: ${nextLesson.title}`
      : language === 'ne'
        ? 'सम्पूर्ण पाठ पूरा गरेर Gold लक्ष्य भेट्टाउनुहोस्'
        : 'Complete all chapters to unlock Gold goals.'
  const xpToNextLevel = Math.max(0, 100 - (totalXp % 100))
  const firstRewardTarget = 3
  const rewardLessonsLeft = Math.max(0, firstRewardTarget - chaptersPassed)
  const startBanner =
    language === 'ne' ? '🔥 आजबाट आफ्नो आर्थिक यात्रा सुरु गर्नुहोस्' : '🔥 Start your financial journey today'
  const localizedStreakLabel =
    snapshot.streakDays <= 0
      ? language === 'ne'
        ? '🔥 आज सुरु गर्नुहोस्'
        : '🔥 Start today'
      : language === 'ne'
        ? `🔥 ${snapshot.streakDays} दिन लगातार`
        : `🔥 ${snapshot.streakDays} day streak`

  const recent = useMemo(() => {
    const rev = [...LESSONS].reverse()
    const hit = rev.find((l) => (snapshot.quizByLesson[l.id]?.attempts ?? 0) > 0)
    if (!hit) return null
    const localizedHit = getLocalizedLesson(hit, language)
    const q = snapshot.quizByLesson[hit.id]
    const pct = q?.bestPassPercent
    return {
      title: localizedHit.title,
      passed: pct !== null && pct !== undefined && pct >= PASS_MARK,
      pct: pct ?? null,
    }
  }, [snapshot, language])

  if (!user) return null

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0 flex-1 space-y-6">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-5 md:pb-6">
              <p className="text-xs font-medium uppercase tracking-wide text-mig-muted">{t('welcomeBack')}</p>
              <p className="inline-flex max-w-full items-center rounded-full border border-mig-gold/25 bg-mig-gold/5 px-3 py-1.5 text-sm font-medium text-mig-gold">
                {startBanner}
              </p>
              <p className="text-sm font-medium text-mig-gold">{localizedStreakLabel}</p>
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-3xl leading-tight text-mig-white md:text-4xl md:leading-tight">
                {language === 'ne' ? '🔥 स्वागत छ,' : '🔥 Welcome back,'}{' '}
                <span className="text-gradient-gold">{firstName}</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-mig-muted md:text-lg md:leading-relaxed">
                {language === 'ne'
                  ? 'तपाईं केवल 1 पाठ टाढा हुनुहुन्छ आफ्नो पहिलो XP कमाउनबाट ⚡'
                  : 'You are 1 lesson away from your first XP.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 md:pb-1">
            <button
              type="button"
              onClick={() => {
                showXP(20, 'पाठ सुरु गरिएको')
                navigate(nextLesson ? `/lesson/${nextLesson.id}` : '/courses')
              }}
              className="w-full rounded-2xl bg-mig-gold px-8 py-3.5 text-base font-semibold text-mig-bg shadow-lg shadow-mig-gold/20 transition hover:bg-mig-gold/90 hover:shadow-mig-gold/35 md:w-auto md:min-w-[200px] animate-[pulse_2.6s_ease-in-out_infinite]"
            >
              {language === 'ne' ? 'अहिले सुरु गरौँ →' : 'Start now →'}
            </button>
          </div>
        </div>
      </motion.div>

      <JourneyCard
        language={language}
        level={localizedLevel === 'सुरुआती' ? 'सुरुवाती सिकाइकर्ता' : localizedLevel}
        chaptersPassed={chaptersPassed}
        chapterTotal={LESSONS.length}
        totalXp={totalXp}
        xpToNextLevel={xpToNextLevel}
        allChaptersComplete={allChaptersComplete}
        nextGoal={nextGoal}
        rewardText={
          allChaptersComplete
            ? language === 'ne'
              ? '🎉 सबै पुरस्कार प्रगतिमा — दाबी गर्न रिवार्ड पेज हेर्नुहोस्'
              : '🎉 Rewards completed in progress — check rewards page to claim'
            : language === 'ne'
              ? '३ अध्याय पूरा गरेपछि पहिलो पुरस्कार'
              : 'First reward after 3 chapters'
        }
        streakText={localizedStreakLabel}
        rewardProgress={Math.min(100, Math.round((chaptersPassed / 3) * 100))}
      />

      <TodaysGoalCard
        language={language}
        onStart={() => {
          showXP(20, 'आजको लक्ष्य सुरु भयो')
          navigate(nextLesson ? `/lesson/${nextLesson.id}` : '/courses')
        }}
      />

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-mig-white">🧠 MIG वित्तीय स्वास्थ्य जाँच</h3>
        <p className="mt-2 text-sm text-mig-muted">आफ्नो आर्थिक अवस्था २ मिनेटमा बुझ्नुहोस्।</p>
        {healthScore ? (
          <div className="mt-3 space-y-2">
            <p className="text-sm text-mig-white">तपाईंको स्कोर: {healthScore.totalScore}/100</p>
            <p className="text-xs text-mig-muted">अर्को लक्ष्य: 75+</p>
            <Link
              to="/health-score/result"
              className="inline-flex rounded-xl bg-mig-gold px-4 py-2 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
            >
              Roadmap हेर्नुहोस्
            </Link>
          </div>
        ) : (
          <Link
            to="/health-score"
            className="mt-4 inline-flex rounded-xl bg-mig-gold px-4 py-2 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
          >
            स्कोर जाँच गरौँ
          </Link>
        )}
      </motion.section>

      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-mig-white">{t('continueLearning')}</h2>
              <p className="mt-1 text-sm text-mig-muted">
                {nextLesson
                  ? `${language === 'ne' ? 'अर्को पाठ:' : 'Up next:'} ${nextLesson.title}`
                  : language === 'ne'
                    ? 'उत्कृष्ट — तपाईंले सबै अध्यायको ज्ञान जाँच पास गर्नुभयो।'
                    : 'Outstanding — you cleared all chapter quizzes.'}
              </p>
            </div>
            <BookOpen className="h-6 w-6 text-mig-gold" />
          </div>
          <Link
            to={nextLesson ? `/lesson/${nextLesson.id}` : '/courses'}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-mig-gold px-4 py-2.5 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
          >
            {nextLesson ? 'अहिले सुरु गरौँ' : 'रोडम्याप हेर्नुहोस्'} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <RewardTeaserCard language={language} completedLessons={chaptersPassed} targetLessons={3} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-2xl border border-mig-gold/25 bg-mig-gold/10 px-4 py-3 text-sm font-medium text-mig-gold"
      >
        {language === 'ne'
          ? `🔥 तपाईं आफ्नो पहिलो पुरस्कारबाट केवल ${rewardLessonsLeft} पाठ टाढा हुनुहुन्छ`
          : `🔥 You are only ${rewardLessonsLeft} lessons away from your first reward`}
      </motion.div>

      <p className="text-center text-sm text-mig-muted">
        {language === 'ne' ? 'तपाईं जहाँ छोड्नुभयो त्यहीँबाट सुरु गर्नुहोस्' : 'Start from where you left off'}
      </p>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActivePanel('badges')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activePanel === 'badges'
                ? 'bg-mig-gold text-mig-bg'
                : 'border border-white/10 text-mig-muted hover:text-mig-white'
            }`}
          >
            {t('badges')}
          </button>
          <button
            type="button"
            onClick={() => setActivePanel('recent')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activePanel === 'recent'
                ? 'bg-mig-gold text-mig-bg'
                : 'border border-white/10 text-mig-muted hover:text-mig-white'
            }`}
          >
            {t('recentQuiz')}
          </button>
          <button
            type="button"
            onClick={() => setActivePanel('leaderboard')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activePanel === 'leaderboard'
                ? 'bg-mig-gold text-mig-bg'
                : 'border border-white/10 text-mig-muted hover:text-mig-white'
            }`}
          >
            {t('leaderboardPreview')}
          </button>
          <button
            type="button"
            onClick={() => setActivePanel('rewards')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activePanel === 'rewards'
                ? 'bg-mig-gold text-mig-bg'
                : 'border border-white/10 text-mig-muted hover:text-mig-white'
            }`}
          >
            {t('rewardEligibility')}
          </button>
        </div>

        {activePanel === 'badges' && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {BADGES.map((b, i) => {
              const localizedBadge = getLocalizedBadge(b, language)
              return (
              <BadgeCard
                key={b.id}
                name={localizedBadge.name}
                description={localizedBadge.description}
                icon={b.icon}
                earned={earnedBadgeIds.includes(b.id)}
                delay={i * 0.05}
              />
              )
            })}
          </div>
        )}

        {activePanel === 'recent' && (
          <div className="mt-4">
            {recent ? (
              <p className="text-sm text-mig-muted">
                <span className="text-mig-white">{recent.title}</span> —{' '}
                {recent.pct !== null ? `${recent.pct}% ${language === 'ne' ? 'उत्कृष्ट' : 'best'}` : language === 'ne' ? 'प्रयास रेकर्ड गरियो' : 'Attempt recorded'}
                {recent.passed ? (
                  <span className="text-mig-green"> · {language === 'ne' ? 'पास' : 'Passed'}</span>
                ) : (
                  <span className="text-mig-gold">
                    {' '}
                    · {language === 'ne' ? 'अझै अभ्यास गर्नुहोस् (पास हुन ७०%)' : 'Keep practicing (70% to pass)'}
                  </span>
                )}
              </p>
            ) : (
              <p className="text-sm text-mig-muted">
                {language === 'ne' ? 'आजबाट सुरु गरौँ। पहिलो ज्ञान जाँच पूरा गरेपछि नतिजा यहाँ देखिन्छ।' : 'Complete your first quiz to see results here.'}
              </p>
            )}
          </div>
        )}

        {activePanel === 'leaderboard' && (
          <div className="mt-4">
            <p className="mb-2 text-sm text-mig-muted">
              {language === 'ne' ? 'तपाईं आज 12 स्थान माथि जान सक्नुहुन्छ।' : 'You can move up 12 ranks today.'}
            </p>
            <div className="mb-2">
              <Link to="/leaderboard" className="text-xs font-medium text-mig-blue hover:underline">
                {t('fullBoard')}
              </Link>
            </div>
            <ul className="space-y-2 text-sm">
              {MOCK_LEADERBOARD.slice(0, 5).map((r) => (
                <li key={r.rank} className="flex justify-between border-b border-white/5 py-2 text-mig-muted last:border-0">
                  <span>
                    <span className="font-semibold text-mig-gold">#{r.rank}</span> {r.name}
                  </span>
                  <span className="tabular-nums text-mig-white">{r.points} XP</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activePanel === 'rewards' && (
          <div className="mt-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-mig-white">{t('rewardEligibility')}</h3>
                <p className="mt-1 text-sm text-mig-muted">
                  {language === 'ne'
                    ? 'Bronze ३ अध्याय + आवश्यक XP मा अनलक हुन्छ। Gold का लागि सबै ज्ञान जाँच पास गर्नुपर्छ।'
                    : 'Bronze unlocks at 3 chapters + enough XP. Gold requires all quizzes passed.'}
                </p>
              </div>
              <Trophy className="h-6 w-6 text-mig-gold" />
            </div>
            <Link
              to="/rewards"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-mig-blue hover:underline"
            >
              {t('viewRewards')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}
