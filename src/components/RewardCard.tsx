import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

type Props = {
  language: 'en' | 'ne'
  title: string
  description: string
  requirements: string
  progress: number
  eligible: boolean
  status?: 'none' | 'pending' | 'approved' | 'rejected'
  onClaim?: () => void
  delay?: number
}

export function RewardCard({
  language,
  title,
  description,
  requirements,
  progress,
  eligible,
  status = 'none',
  onClaim,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-mig-gold/15 p-2 ring-1 ring-mig-gold/30">
          <Sparkles className="h-5 w-5 text-mig-gold" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl text-mig-white">{title}</h3>
          <p className="mt-1 text-sm text-mig-muted">{description}</p>
          <p className="mt-3 text-xs text-mig-blue">{requirements}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-mig-muted">
          <span>{language === 'ne' ? 'प्रगति' : 'Progress'}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-mig-gold to-mig-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {status === 'pending' && (
          <span className="rounded-full bg-mig-blue/15 px-3 py-1 text-xs font-medium text-mig-blue">
            {language === 'ne' ? 'दाबी समीक्षा क्रममा' : 'Claim under review'}
          </span>
        )}
        {status === 'approved' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-mig-green/15 px-3 py-1 text-xs font-medium text-mig-green">
            <Check className="h-3.5 w-3.5" /> {language === 'ne' ? 'स्वीकृत' : 'Approved'}
          </span>
        )}
        {status === 'rejected' && (
          <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-300">
            {language === 'ne' ? 'अस्वीकृत' : 'Rejected'}
          </span>
        )}
        {eligible && status === 'none' && (
          <button
            type="button"
            onClick={onClaim}
            className="rounded-xl bg-mig-gold px-4 py-2 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
          >
            {language === 'ne' ? 'रिवार्ड दाबी गर्नुहोस्' : 'Claim reward'}
          </button>
        )}
        {!eligible && status === 'none' && (
          <span className="text-xs text-mig-muted">
            {language === 'ne' ? 'यो तह अनलक गर्न सिकाइ जारी राखौँ।' : 'Keep learning to unlock this tier.'}
          </span>
        )}
      </div>
    </motion.div>
  )
}
