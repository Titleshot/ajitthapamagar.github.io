import { LESSONS } from '../data/lessons'

const PASS_MARK = 70

export function quizPointsForScore(percent: number, passed: boolean): number {
  if (!passed) return 20
  if (percent >= 100) return 100
  if (percent >= 80) return 80
  if (percent >= PASS_MARK) return 60
  return 20
}

export function levelFromFinancialScore(score: number): string {
  if (score <= 20) return 'Beginner'
  if (score <= 40) return 'Saver'
  if (score <= 60) return 'Smart Planner'
  if (score <= 80) return 'Wealth Builder'
  return 'MIG Financial Champion'
}

export type ProgressInputs = {
  /** Best quiz percent per lesson (0–100), only for lessons with at least one attempt */
  quizPercents: number[]
  /** Lessons marked content-complete */
  completedLessonIds: string[]
  /** Lessons with quiz passed */
  passedLessonIds: string[]
  streakDays: number
  /** 0–100 placeholder for future challenges */
  challengeParticipation: number
}

export function computeFinancialScore(input: ProgressInputs): number {
  const total = LESSONS.length
  // New users should start at a true baseline until they engage with lessons/quizzes.
  if (input.quizPercents.length === 0 && input.passedLessonIds.length === 0) {
    return 0
  }
  const quizAvg =
    input.quizPercents.length > 0
      ? input.quizPercents.reduce((a, b) => a + b, 0) / input.quizPercents.length
      : 0
  const completionRatio = input.passedLessonIds.length / total
  const completion = completionRatio * 100
  const streakScore = Math.min(100, input.streakDays * 15)
  const challenge = Math.max(0, Math.min(100, input.challengeParticipation))

  const raw = quizAvg * 0.4 + completion * 0.3 + streakScore * 0.2 + challenge * 0.1
  return Math.round(Math.min(100, Math.max(0, raw)))
}

export function countChaptersWithPassedQuiz(passedLessonIds: string[]): number {
  return passedLessonIds.length
}

export { PASS_MARK }
