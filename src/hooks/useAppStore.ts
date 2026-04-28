import { create } from 'zustand'

type AppStore = {
  lastUnlockedLessonId: string | null
  setLastUnlockedLessonId: (id: string | null) => void
  streakFlameVisible: boolean
  setStreakFlameVisible: (visible: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
  lastUnlockedLessonId: null,
  setLastUnlockedLessonId: (id) => set({ lastUnlockedLessonId: id }),
  streakFlameVisible: true,
  setStreakFlameVisible: (visible) => set({ streakFlameVisible: visible }),
}))
