export type BadgeDef = {
  id: string
  name: string
  description: string
  icon: string
  requiredPoints: number
  requiredLessons: number
}

export const BADGES: BadgeDef[] = [
  {
    id: 'badge-starter',
    name: 'Bronze Learner',
    description: 'Complete 3 chapters and reach 200 XP.',
    icon: 'medal',
    requiredPoints: 200,
    requiredLessons: 3,
  },
  {
    id: 'badge-silver',
    name: 'Silver Learner',
    description: 'Complete 6 chapters and reach 500 XP.',
    icon: 'award',
    requiredPoints: 500,
    requiredLessons: 6,
  },
  {
    id: 'badge-gold',
    name: 'Gold Financial Champion',
    description: 'Complete all 10 chapters and pass every quiz.',
    icon: 'trophy',
    requiredPoints: 800,
    requiredLessons: 10,
  },
]

type LocalizedBadgeOverrides = {
  name: string
  description: string
}

const NEPALI_BADGE_OVERRIDES: Record<string, LocalizedBadgeOverrides> = {
  'badge-starter': {
    name: 'कांस्य सिकाइकर्ता',
    description: '३ अध्याय पूरा गरी २०० XP पुरा गर्नुहोस्।',
  },
  'badge-silver': {
    name: 'रजत सिकाइकर्ता',
    description: '६ अध्याय पूरा गरी ५०० XP पुरा गर्नुहोस्।',
  },
  'badge-gold': {
    name: 'स्वर्ण वित्तीय च्याम्पियन',
    description: 'सबै १० अध्याय पूरा गरी प्रत्येक ज्ञान जाँच पास गर्नुहोस्।',
  },
}

export function getLocalizedBadge(badge: BadgeDef, language: 'en' | 'ne'): BadgeDef {
  if (language === 'en') return badge
  const override = NEPALI_BADGE_OVERRIDES[badge.id]
  if (!override) return badge
  return {
    ...badge,
    ...override,
  }
}
