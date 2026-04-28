export type RewardTier = {
  id: string
  title: string
  description: string
  rewardType: 'recognition' | 'certificate' | 'grand_prize' | 'top100'
  requiredPoints: number
  requiredLessons: number
  requiresAllQuizzesPassed?: boolean
  maxWinners?: number
}

export const REWARD_TIERS: RewardTier[] = [
  {
    id: 'bronze',
    title: 'Bronze Learner',
    description: 'Badge and community recognition for early consistency.',
    rewardType: 'recognition',
    requiredPoints: 200,
    requiredLessons: 3,
  },
  {
    id: 'silver',
    title: 'Silver Learner',
    description: 'Digital certificate for strong progress in the middle stage.',
    rewardType: 'certificate',
    requiredPoints: 500,
    requiredLessons: 6,
  },
  {
    id: 'gold',
    title: 'Gold Financial Champion',
    description: 'Certificate and MIG reward eligibility after completing all chapters and quizzes.',
    rewardType: 'grand_prize',
    requiredPoints: 800,
    requiredLessons: 10,
    requiresAllQuizzesPassed: true,
  },
  {
    id: 'top100',
    title: 'Top 100 Members',
    description: 'Special recognition, gifts, or opportunities for top learners — announced by MIG.',
    rewardType: 'top100',
    requiredPoints: 1200,
    requiredLessons: 10,
    requiresAllQuizzesPassed: true,
    maxWinners: 100,
  },
]

type LocalizedRewardOverrides = {
  title: string
  description: string
}

const NEPALI_REWARD_OVERRIDES: Record<string, LocalizedRewardOverrides> = {
  bronze: {
    title: 'कांस्य सिकाइकर्ता',
    description: 'सुरुआती निरन्तरताका लागि बैज र सामुदायिक मान्यता।',
  },
  silver: {
    title: 'रजत सिकाइकर्ता',
    description: 'कार्यक्रमको मध्यम चरणमा राम्रो प्रगतिका लागि डिजिटल प्रमाणपत्र।',
  },
  gold: {
    title: 'स्वर्ण वित्तीय च्याम्पियन',
    description: 'सबै अध्याय र ज्ञान जाँच पूरा गरेपछि प्रमाणपत्र र MIG रिवार्ड योग्यता।',
  },
  top100: {
    title: 'शीर्ष १०० सदस्य',
    description: 'उत्कृष्ट सिकाइकर्ताका लागि विशेष मान्यता, उपहार वा अवसर — MIG द्वारा घोषणा गरिनेछ।',
  },
}

export function getLocalizedRewardTier(tier: RewardTier, language: 'en' | 'ne'): RewardTier {
  if (language === 'en') return tier
  const override = NEPALI_REWARD_OVERRIDES[tier.id]
  if (!override) return tier
  return {
    ...tier,
    ...override,
  }
}
