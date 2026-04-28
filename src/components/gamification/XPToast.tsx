import { AnimatePresence, motion } from 'framer-motion'

export type XPToastItem = {
  id: string
  amount: number
  reason: string
}

type Props = {
  toasts: XPToastItem[]
}

export function XPToast({ toasts }: Props) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[90] space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-[280px] overflow-hidden rounded-xl border border-mig-gold/60 bg-[#0A1020]/98 p-3.5 shadow-2xl shadow-black/60 ring-1 ring-black/35 backdrop-blur-md"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-mig-gold via-mig-blue to-mig-gold" />
            <p className="text-sm font-bold text-mig-gold drop-shadow-[0_0_6px_rgba(245,197,66,0.35)]">+{toast.amount} XP 🎉</p>
            <p className="mt-1 text-xs font-medium text-white/90">{toast.reason}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
