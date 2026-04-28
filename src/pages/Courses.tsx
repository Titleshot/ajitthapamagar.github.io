import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import { LESSONS } from '../data/lessons'
import { LessonCard } from '../components/LessonCard'
export function Courses() {
  const { isLessonUnlocked, completedLessonIds, passedLessonIds, snapshot, nextLessonId } = useProgress()
  const passedSet = new Set(passedLessonIds)
  const currentLessonId = nextLessonId()

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-mig-white md:text-4xl">कोर्स रोडम्याप</h1>
        <p className="mt-2 max-w-2xl text-sm text-mig-muted">
          सोचबाट सम्पत्ति निर्माणसम्म १० अध्याय। अघिल्लो ज्ञान जाँच पास गरेपछि अर्को अध्याय अनलक हुन्छ।
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2">
        {LESSONS.map((lesson, index) => {
          const unlocked = isLessonUnlocked(lesson.id)
          const completed = completedLessonIds.includes(lesson.id)
          const q = snapshot.quizByLesson[lesson.id]
          const passedQuiz = passedSet.has(lesson.id)
          const quizPercent =
            q?.bestPassPercent !== null && q?.bestPassPercent !== undefined
              ? Math.round(q.bestPassPercent)
              : null
          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              unlocked={unlocked}
              completed={completed}
              passedQuiz={passedQuiz}
              quizPercent={passedQuiz && quizPercent !== null ? quizPercent : null}
              index={index}
              isCurrent={currentLessonId === lesson.id}
            />
          )
        })}
      </div>
    </div>
  )
}
