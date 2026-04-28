import { Link, Outlet } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import { BackButton } from './BackButton'

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-mig-bg">
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mig-gold/15 ring-1 ring-mig-gold/30">
              <Shield className="h-5 w-5 text-mig-gold" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mig-muted">MIG Wealth Academy</p>
              <p className="text-sm font-semibold text-mig-white">Admin Console</p>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-mig-muted hover:border-mig-gold/40 hover:text-mig-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to app
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <BackButton />
        <Outlet />
      </main>
    </div>
  )
}
