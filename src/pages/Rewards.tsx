import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import { REWARD_TIERS, getLocalizedRewardTier } from '../data/rewards'
import { RewardCard } from '../components/RewardCard'
import { useI18n } from '../context/I18nContext'

export function Rewards() {
  const { rewardProgress, claimReward, rewardClaims } = useProgress()
  const { language } = useI18n()

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-mig-white md:text-4xl">{language === 'ne' ? 'रिवार्डहरू' : 'Rewards'}</h1>
        <p className="mt-2 max-w-2xl text-sm text-mig-muted">
          {language === 'ne'
            ? 'XP कमाउनुहोस्, अध्याय पूरा गर्नुहोस्, र आफ्नो उपलब्धि अनलक गर्नुहोस्।'
            : 'Earn XP, complete chapters, and unlock your achievements.'}
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {REWARD_TIERS.map((tier, i) => {
          const localizedTier = getLocalizedRewardTier(tier, language)
          const { eligible, progress } = rewardProgress(tier.id)
          const status = rewardClaims[tier.id]
          const requirements = `${tier.requiredLessons}+ ${language === 'ne' ? 'अध्याय पूरा' : 'chapters completed'} · ${tier.requiredPoints}+ XP${
            tier.requiresAllQuizzesPassed ? ` · ${language === 'ne' ? 'सबै ज्ञान जाँच पास' : 'all quizzes passed'}` : ''
          }`
          return (
            <RewardCard
              language={language}
              key={tier.id}
              title={localizedTier.title}
              description={localizedTier.description}
              requirements={requirements}
              progress={eligible ? 100 : progress}
              eligible={eligible}
              status={status ?? 'none'}
              onClaim={() => claimReward(tier.id)}
              delay={i * 0.06}
            />
          )
        })}
      </div>
    </div>
  )
}
