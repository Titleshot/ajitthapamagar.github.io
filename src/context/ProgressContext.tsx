import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { LESSONS } from '../data/lessons'
import { BADGES } from '../data/badges'
import { REWARD_TIERS } from '../data/rewards'
import {
  PASS_MARK,
  computeFinancialScore,
  countChaptersWithPassedQuiz,
  levelFromFinancialScore,
  quizPointsForScore,
} from '../utils/scoring'
import { isLessonUnlocked, nextLessonId } from '../utils/unlock'
import { isServerProgressEnabled, supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

type LessonStatus = 'not_started' | 'in_progress' | 'completed'

export type LessonProgressRow = {
  status: LessonStatus
  completedAt?: string
}

export type QuizLessonState = {
  attempts: number
  bestPassPercent: number | null
  participationPaid: boolean
}

export type ProgressSnapshot = {
  lessonProgress: Record<string, LessonProgressRow>
  quizByLesson: Record<string, QuizLessonState>
  streakDays: number
  lastActiveDate: string
  challengeScore: number
  bonusThreeUnlocked: boolean
  bonusAllUnlocked: boolean
  dailyLoginDates: string[]
  completedChallenges: string[]
  onboardingBonusClaimed: boolean
}

const emptySnapshot = (): ProgressSnapshot => ({
  lessonProgress: {},
  quizByLesson: {},
  streakDays: 1,
  lastActiveDate: '',
  challengeScore: 50,
  bonusThreeUnlocked: false,
  bonusAllUnlocked: false,
  dailyLoginDates: [],
  completedChallenges: [],
  onboardingBonusClaimed: false,
})

function storageKey(memberId: string) {
  return `mig-wa-progress-${memberId}`
}

function loadSnapshot(memberId: string): ProgressSnapshot {
  try {
    const raw = localStorage.getItem(storageKey(memberId))
    if (!raw) return emptySnapshot()
    return { ...emptySnapshot(), ...JSON.parse(raw) } as ProgressSnapshot
  } catch {
    return emptySnapshot()
  }
}

function computeTotals(snapshot: ProgressSnapshot) {
  const passedIds = LESSONS.filter((l) => {
    const q = snapshot.quizByLesson[l.id]
    return q && q.bestPassPercent !== null && q.bestPassPercent >= PASS_MARK
  }).map((l) => l.id)

  const completedIds = LESSONS.filter(
    (l) => snapshot.lessonProgress[l.id]?.status === 'completed',
  ).map((l) => l.id)

  const quizPercents = passedIds
    .map((id) => snapshot.quizByLesson[id]?.bestPassPercent)
    .filter((n): n is number => typeof n === 'number')

  const financialScore = computeFinancialScore({
    quizPercents,
    completedLessonIds: completedIds,
    passedLessonIds: passedIds,
    streakDays: snapshot.streakDays,
    challengeParticipation: snapshot.challengeScore,
  })

  const level = levelFromFinancialScore(financialScore)

  let points = 0
  points += completedIds.length * 20
  for (const l of LESSONS) {
    const q = snapshot.quizByLesson[l.id]
    if (!q) continue
    if (q.bestPassPercent !== null && q.bestPassPercent >= PASS_MARK) {
      points += quizPointsForScore(q.bestPassPercent, true)
    } else if (q.participationPaid) {
      points += 20
    }
  }

  if (snapshot.bonusThreeUnlocked) points += 100
  if (snapshot.bonusAllUnlocked) points += 300
  points += snapshot.dailyLoginDates.length * 10
  if (snapshot.onboardingBonusClaimed) points += 20

  const chaptersPassed = countChaptersWithPassedQuiz(passedIds)
  const completionPct = Math.round((chaptersPassed / LESSONS.length) * 100)

  return {
    points,
    financialScore,
    level,
    passedLessonIds: passedIds,
    completedLessonIds: completedIds,
    chaptersPassed,
    completionPct,
    quizPercents,
  }
}

function deriveEarnedBadgeIds(
  snapshot: ProgressSnapshot,
  points: number,
  chaptersPassed: number,
): string[] {
  const allQuizzesPassed = LESSONS.every((l) => {
    const q = snapshot.quizByLesson[l.id]
    return q?.bestPassPercent != null && q.bestPassPercent >= PASS_MARK
  })
  return BADGES.filter((b) => {
    if (b.id === 'badge-gold') {
      return chaptersPassed >= 10 && allQuizzesPassed && points >= b.requiredPoints
    }
    return chaptersPassed >= b.requiredLessons && points >= b.requiredPoints
  }).map((b) => b.id)
}

type ProgressContextValue = {
  snapshot: ProgressSnapshot
  /** Totals derived from snapshot + user */
  points: number
  totalXp: number
  financialScore: number
  level: string
  passedLessonIds: string[]
  completedLessonIds: string[]
  chaptersPassed: number
  completionPct: number
  isLessonUnlocked: (lessonId: string) => boolean
  nextLessonId: () => string | null
  markLessonComplete: (lessonId: string) => void
  markLessonInProgress: (lessonId: string) => void
  recordQuizAttempt: (lessonId: string, scorePercent: number) => {
    passed: boolean
    pointsEarned: number
    attemptNumber: number
    newlyUnlockedBadgeId: string | null
  }
  registerDailyLogin: () => void
  streakLabel: string
  completeChallenge: (challengeId: string) => { awardedXp: number; alreadyCompleted: boolean }
  registerOnboardingBonus: () => void
  isChallengeCompleted: (challengeId: string) => boolean
  rewardProgress: (tierId: string) => { eligible: boolean; progress: number; label: string }
  allChaptersComplete: boolean
  earnedBadgeIds: string[]
  claimReward: (tierId: string) => void
  rewardClaims: Record<string, 'pending' | 'approved' | 'rejected'>
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [snapshot, setSnapshot] = useState<ProgressSnapshot>(emptySnapshot())
  const [rewardClaims, setRewardClaims] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>({})

  useEffect(() => {
    if (!user) {
      setSnapshot(emptySnapshot())
      setRewardClaims({})
      return
    }
    if (!isServerProgressEnabled() || !supabase) {
      setSnapshot(loadSnapshot(user.memberId))
      try {
        const rc = localStorage.getItem(`mig-wa-claims-${user.memberId}`)
        setRewardClaims(rc ? JSON.parse(rc) : {})
      } catch {
        setRewardClaims({})
      }
      return
    }

    void (async () => {
      const [progressRes, quizRes, rewardRes] = await Promise.all([
        supabase
          .from('user_lesson_progress')
          .select('lesson_id,status,completed_at,points_earned')
          .eq('user_id', user.id ?? ''),
        supabase
          .from('quiz_attempts')
          .select('lesson_id,score,passed,attempt_number')
          .eq('user_id', user.id ?? ''),
        supabase
          .from('reward_claims')
          .select('reward_id,status')
          .eq('user_id', user.id ?? ''),
      ])

      const next = emptySnapshot()
      for (const row of progressRes.data ?? []) {
        next.lessonProgress[row.lesson_id] = {
          status: row.status as LessonStatus,
          completedAt: row.completed_at ?? undefined,
        }
      }
      for (const row of quizRes.data ?? []) {
        const prior = next.quizByLesson[row.lesson_id] ?? {
          attempts: 0,
          bestPassPercent: null,
          participationPaid: false,
        }
        next.quizByLesson[row.lesson_id] = {
          attempts: Math.max(prior.attempts, row.attempt_number ?? 1),
          bestPassPercent: row.passed
            ? Math.max(prior.bestPassPercent ?? 0, row.score ?? 0)
            : prior.bestPassPercent,
          participationPaid: prior.participationPaid || !row.passed,
        }
      }
      setSnapshot(next)

      const claims: Record<string, 'pending' | 'approved' | 'rejected'> = {}
      for (const row of rewardRes.data ?? []) {
        if (row.status === 'pending' || row.status === 'approved' || row.status === 'rejected') {
          claims[row.reward_id] = row.status
        }
      }
      setRewardClaims(claims)
    })()
  }, [user])

  const persist = useCallback(
    (next: ProgressSnapshot) => {
      if (!user) return
      if (isServerProgressEnabled() && supabase) {
        setSnapshot(next)
        return
      }
      localStorage.setItem(storageKey(user.memberId), JSON.stringify(next))
      setSnapshot(next)
    },
    [user],
  )

  const totals = useMemo(() => computeTotals(snapshot), [snapshot])

  const earnedBadgeIds = useMemo(
    () => deriveEarnedBadgeIds(snapshot, totals.points, totals.chaptersPassed),
    [snapshot, totals.points, totals.chaptersPassed],
  )

  const streakLabel = useMemo(() => {
    if (snapshot.streakDays <= 0) return '🔥 आज सुरु गर्नुहोस्'
    return `🔥 ${snapshot.streakDays} दिन लगातार`
  }, [snapshot.streakDays])

  const isUnlocked = useCallback(
    (lessonId: string) => isLessonUnlocked(lessonId, new Set(totals.passedLessonIds)),
    [totals.passedLessonIds],
  )

  const nextId = useCallback(
    () => nextLessonId(new Set(totals.passedLessonIds)),
    [totals.passedLessonIds],
  )

  const markLessonComplete = useCallback(
    (lessonId: string) => {
      if (isServerProgressEnabled() && supabase && user?.id) {
        void supabase.rpc('mark_lesson_complete', { p_lesson_id: lessonId })
        const row: LessonProgressRow = { status: 'completed', completedAt: new Date().toISOString() }
        setSnapshot((curr) => ({
          ...curr,
          lessonProgress: { ...curr.lessonProgress, [lessonId]: row },
        }))
        return
      }
      const row: LessonProgressRow = {
        status: 'completed',
        completedAt: new Date().toISOString(),
      }
      persist({
        ...snapshot,
        lessonProgress: { ...snapshot.lessonProgress, [lessonId]: row },
      })
    },
    [snapshot, persist, user],
  )

  const markLessonInProgress = useCallback(
    (lessonId: string) => {
      const currentStatus = snapshot.lessonProgress[lessonId]?.status
      if (currentStatus === 'completed' || currentStatus === 'in_progress') return
      persist({
        ...snapshot,
        lessonProgress: {
          ...snapshot.lessonProgress,
          [lessonId]: { status: 'in_progress' },
        },
      })
    },
    [snapshot, persist],
  )

  const recordQuizAttempt = useCallback(
    (lessonId: string, scorePercent: number) => {
      if (isServerProgressEnabled() && supabase && user?.id) {
        void (async () => {
          try {
            await supabase.rpc('submit_quiz_attempt', {
              p_lesson_id: lessonId,
              p_score: scorePercent,
              p_total_questions: 3,
              p_correct_answers: Math.round((scorePercent / 100) * 3),
              p_time_taken: null,
              p_device_type: 'web',
            })
          } catch {
            // Local state remains fallback-safe if server call fails.
          }
        })()
      }
      const prev = snapshot.quizByLesson[lessonId] ?? {
        attempts: 0,
        bestPassPercent: null,
        participationPaid: false,
      }
      const attempts = prev.attempts + 1
      const passed = scorePercent >= PASS_MARK
      let bestPassPercent = prev.bestPassPercent
      if (passed) {
        bestPassPercent =
          bestPassPercent === null ? scorePercent : Math.max(bestPassPercent, scorePercent)
      }
      let participationPaid = prev.participationPaid
      let pointsEarned = 0
      if (passed) {
        pointsEarned = quizPointsForScore(scorePercent, true)
      } else if (!participationPaid) {
        participationPaid = true
        pointsEarned = 20
      }

      const previousEarned = deriveEarnedBadgeIds(snapshot, totals.points, totals.chaptersPassed)

      const nextQuizByLesson = {
        ...snapshot.quizByLesson,
        [lessonId]: { attempts, bestPassPercent, participationPaid },
      }
      const passedCount = LESSONS.filter((l) => {
        const q = nextQuizByLesson[l.id]
        return q?.bestPassPercent != null && q.bestPassPercent >= PASS_MARK
      }).length

      let bonusThreeUnlocked = snapshot.bonusThreeUnlocked
      let bonusAllUnlocked = snapshot.bonusAllUnlocked
      if (passedCount >= 3) bonusThreeUnlocked = true
      if (passedCount >= LESSONS.length) bonusAllUnlocked = true

      const nextSnapshot = {
        ...snapshot,
        bonusThreeUnlocked,
        bonusAllUnlocked,
        quizByLesson: nextQuizByLesson,
      }
      persist(nextSnapshot)

      const nextTotals = computeTotals(nextSnapshot)
      const nextEarned = deriveEarnedBadgeIds(nextSnapshot, nextTotals.points, nextTotals.chaptersPassed)
      const newlyUnlockedBadgeId =
        nextEarned.find((id) => !previousEarned.includes(id)) ?? null

      return { passed, pointsEarned, attemptNumber: attempts, newlyUnlockedBadgeId }
    },
    [snapshot, persist, totals.points, totals.chaptersPassed, user],
  )

  const registerDailyLogin = useCallback(() => {
    if (!user) return
    const today = new Date().toISOString().slice(0, 10)
    if (snapshot.dailyLoginDates.includes(today)) return

    const last = snapshot.lastActiveDate
    let streak = snapshot.streakDays
    if (!last) streak = 1
    else {
      const prev = new Date(last)
      const diff = (new Date(today).getTime() - prev.getTime()) / (1000 * 3600 * 24)
      if (diff === 1) streak += 1
      else if (diff > 1) streak = 1
    }

    persist({
      ...snapshot,
      lastActiveDate: today,
      streakDays: streak,
      dailyLoginDates: [...snapshot.dailyLoginDates, today],
    })
  }, [user, snapshot, persist])

  const completeChallenge = useCallback(
    (challengeId: string) => {
      if (snapshot.completedChallenges.includes(challengeId)) {
        return { awardedXp: 0, alreadyCompleted: true }
      }
      const next = {
        ...snapshot,
        completedChallenges: [...snapshot.completedChallenges, challengeId],
      }
      persist(next)
      return { awardedXp: 30, alreadyCompleted: false }
    },
    [snapshot, persist],
  )

  const registerOnboardingBonus = useCallback(() => {
    if (snapshot.onboardingBonusClaimed) return
    persist({
      ...snapshot,
      onboardingBonusClaimed: true,
    })
  }, [snapshot, persist])

  const isChallengeCompleted = useCallback(
    (challengeId: string) => snapshot.completedChallenges.includes(challengeId),
    [snapshot.completedChallenges],
  )

  const rewardProgress = useCallback(
    (tierId: string) => {
      const tier = REWARD_TIERS.find((t) => t.id === tierId)
      if (!tier) return { eligible: false, progress: 0, label: '' }
      const lessonRatio = Math.min(1, totals.chaptersPassed / tier.requiredLessons)
      const pointRatio = Math.min(1, totals.points / tier.requiredPoints)
      const progress = Math.round(Math.min(lessonRatio, pointRatio) * 100)
      const allQuizzesPassed = LESSONS.every((l) => totals.passedLessonIds.includes(l.id))
      const quizOk = !tier.requiresAllQuizzesPassed || allQuizzesPassed
      const eligible =
        totals.chaptersPassed >= tier.requiredLessons &&
        totals.points >= tier.requiredPoints &&
        quizOk
      return { eligible, progress, label: tier.title }
    },
    [totals],
  )

  const claimReward = useCallback(
    (tierId: string) => {
      if (!user) return
      const { eligible } = rewardProgress(tierId)
      if (!eligible) return
      if (isServerProgressEnabled() && supabase && user.id) {
        void supabase.rpc('claim_reward', { p_reward_id: tierId })
      }
      const next = { ...rewardClaims, [tierId]: 'pending' as const }
      setRewardClaims(next)
      if (!isServerProgressEnabled()) {
        localStorage.setItem(`mig-wa-claims-${user.memberId}`, JSON.stringify(next))
      }
    },
    [user, rewardClaims, rewardProgress],
  )

  const allChaptersComplete =
    totals.passedLessonIds.length === LESSONS.length &&
    LESSONS.every((l) => totals.passedLessonIds.includes(l.id))

  const value = useMemo(
    () => ({
      snapshot,
      points: totals.points,
      totalXp: totals.points,
      financialScore: totals.financialScore,
      level: totals.level,
      passedLessonIds: totals.passedLessonIds,
      completedLessonIds: totals.completedLessonIds,
      chaptersPassed: totals.chaptersPassed,
      completionPct: totals.completionPct,
      isLessonUnlocked: isUnlocked,
      nextLessonId: nextId,
      markLessonComplete,
      markLessonInProgress,
      recordQuizAttempt,
      registerDailyLogin,
      streakLabel,
      completeChallenge,
      registerOnboardingBonus,
      isChallengeCompleted,
      rewardProgress,
      allChaptersComplete,
      earnedBadgeIds,
      claimReward,
      rewardClaims,
    }),
    [
      snapshot,
      totals,
      isUnlocked,
      nextId,
      markLessonComplete,
      markLessonInProgress,
      recordQuizAttempt,
      registerDailyLogin,
      streakLabel,
      completeChallenge,
      registerOnboardingBonus,
      isChallengeCompleted,
      rewardProgress,
      allChaptersComplete,
      earnedBadgeIds,
      claimReward,
      rewardClaims,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
