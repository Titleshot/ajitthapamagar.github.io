import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { XPToast, type XPToastItem } from '../components/gamification/XPToast'

type XPToastContextValue = {
  showXP: (amount: number, reason: string) => void
}

const XPToastContext = createContext<XPToastContextValue | null>(null)

export function XPToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<XPToastItem[]>([])

  const showXP = useCallback((amount: number, reason: string) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, amount, reason }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }, [])

  const value = useMemo(() => ({ showXP }), [showXP])

  return (
    <XPToastContext.Provider value={value}>
      {children}
      <XPToast toasts={toasts} />
    </XPToastContext.Provider>
  )
}

export function useXPToast() {
  const ctx = useContext(XPToastContext)
  if (!ctx) throw new Error('useXPToast must be used within XPToastProvider')
  return ctx
}
