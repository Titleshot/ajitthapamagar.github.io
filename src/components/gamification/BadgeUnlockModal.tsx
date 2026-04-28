import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  open: boolean
  badgeName: string
  onClose: () => void
}

export function BadgeUnlockModal({ open, badgeName, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="glass relative w-full max-w-md rounded-3xl border border-mig-gold/40 p-6 text-center"
          >
            <div className="pointer-events-none absolute -top-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-mig-gold/20 blur-2xl" />
            <p className="text-sm font-semibold text-mig-gold">🎖 नयाँ ब्याज अनलक भयो</p>
            <h3 className="mt-3 text-2xl font-semibold text-mig-white">{badgeName}</h3>
            <p className="mt-2 text-sm text-mig-muted">
              तपाईंले आफ्नो वित्तीय सिकाइ यात्रामा नयाँ उपलब्धि हासिल गर्नुभयो।
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-mig-gold px-4 py-2 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
            >
              अगाडि बढौँ
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
