import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { CertificateCard } from '../components/CertificateCard'

export function Certificate() {
  const { user } = useAuth()
  const { allChaptersComplete } = useProgress()

  const completedAt = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const onDownload = () => {
    window.print()
  }

  const onShare = () => {
    const url = encodeURIComponent(window.location.origin)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer')
  }

  if (!user) return null

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-mig-white md:text-4xl">Certificate</h1>
        <p className="mt-2 max-w-2xl text-sm text-mig-muted">
          Your certificate unlocks when all ten chapter quizzes are passed — keep going, you&apos;re building real
          strength.
        </p>
      </motion.div>

      {allChaptersComplete ? (
        <CertificateCard fullName={user.fullName} completedAt={completedAt} onDownload={onDownload} onShare={onShare} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-10 text-center">
          <p className="text-sm text-mig-muted">
            Complete every chapter quiz to unlock your official <span className="text-mig-white">MIG Wealth Academy</span>{' '}
            certificate.
          </p>
        </motion.div>
      )}
    </div>
  )
}
