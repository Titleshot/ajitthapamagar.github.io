import { LESSONS } from '../data/lessons'

/** Chapter N unlocks when N === 1 or chapter N−1 quiz is passed. */
export function isLessonUnlocked(
  lessonId: string,
  passedLessonIds: Set<string>,
): boolean {
  const lesson = LESSONS.find((l) => l.id === lessonId)
  if (!lesson) return false
  if (lesson.chapterNumber === 1) return true
  const prev = LESSONS.find((l) => l.chapterNumber === lesson.chapterNumber - 1)
  return prev ? passedLessonIds.has(prev.id) : false
}

export function nextLessonId(passedLessonIds: Set<string>): string | null {
  const firstIncomplete = LESSONS.find((l) => !passedLessonIds.has(l.id))
  if (!firstIncomplete) return null
  return isLessonUnlocked(firstIncomplete.id, passedLessonIds) ? firstIncomplete.id : null
}
