import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type Language = 'en' | 'ne'

type Dictionary = Record<string, { en: string; ne: string }>

const DICT: Dictionary = {
  navDashboard: { en: 'Dashboard', ne: 'ड्यासबोर्ड' },
  navCourses: { en: 'Courses', ne: 'कोर्सहरू' },
  navRewards: { en: 'Rewards', ne: 'रिवार्डहरू' },
  navLeaderboard: { en: 'Leaderboard', ne: 'लीडरबोर्ड' },
  navCertificate: { en: 'Certificate', ne: 'प्रमाणपत्र' },
  navAdmin: { en: 'Admin', ne: 'एडमिन' },
  navLogout: { en: 'Log out', ne: 'लगआउट' },
  back: { en: 'Back', ne: 'फर्कनुहोस्' },
  courseRoadmap: { en: 'Course roadmap', ne: 'कोर्स रोडम्याप' },
  startQuiz: { en: 'Start quiz', ne: 'ज्ञान जाँच सुरु गर्नुहोस्' },
  lessonUnlockHint: {
    en: "To unlock the next chapter, complete and pass this chapter's quiz.",
    ne: 'अर्को अध्याय अनलक गर्न, यो अध्यायको ज्ञान जाँच पूरा गरेर पास गर्नुहोस्।',
  },
  welcomeBack: { en: 'Welcome back', ne: 'फेरि स्वागत छ' },
  financialScore: { en: 'MIG financial score', ne: 'MIG वित्तीय स्कोर' },
  currentLevel: { en: 'Current level', ne: 'हालको स्तर' },
  chaptersWithPassingQuiz: { en: 'Chapters with passing quiz', ne: 'पास गरिएको ज्ञान जाँच भएका अध्यायहरू' },
  totalPoints: { en: 'Total XP', ne: 'कुल XP' },
  courseCompletion: { en: 'Course completion', ne: 'कोर्स प्रगति' },
  continueLearning: { en: 'Continue learning', ne: 'सिकाइ जारी राख्नुहोस्' },
  openLesson: { en: 'Open lesson', ne: 'पाठ खोल्नुहोस्' },
  viewRoadmap: { en: 'View roadmap', ne: 'रोडम्याप हेर्नुहोस्' },
  badges: { en: 'Badges', ne: 'बैजहरू' },
  recentQuiz: { en: 'Recent quiz', ne: 'हालको ज्ञान जाँच' },
  leaderboardPreview: { en: 'Leaderboard preview', ne: 'लीडरबोर्ड पूर्वावलोकन' },
  rewardEligibility: { en: 'Reward eligibility', ne: 'रिवार्ड योग्यता' },
  viewRewards: { en: 'View rewards', ne: 'रिवार्ड हेर्नुहोस्' },
  fullBoard: { en: 'Full board', ne: 'पूरा सूची' },
  passed: { en: 'Passed', ne: 'पास' },
  quizResult: { en: 'Quiz result', ne: 'ज्ञान जाँच नतिजा' },
  retryQuiz: { en: 'Retry quiz', ne: 'फेरि ज्ञान जाँच दिनुहोस्' },
  continueProgram: { en: 'Continue program', ne: 'कार्यक्रम जारी राख्नुहोस्' },
  reviewLesson: { en: 'Review lesson', ne: 'पाठ पुनरावलोकन गर्नुहोस्' },
}

type I18nContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof DICT) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'mig-lang'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' ? 'en' : 'ne'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: keyof typeof DICT) => DICT[key][language],
    }),
    [language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
