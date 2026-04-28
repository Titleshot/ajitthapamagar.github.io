import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, LayoutDashboard, LogOut, Menu, Shield, Trophy, X, Award, Users } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { NotificationBell } from '../NotificationBell'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { sanitizeDisplayFirstName } from '../../utils/displayName'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-white/10 text-mig-gold' : 'text-mig-muted hover:text-mig-white'
  }`

export function Navbar() {
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useI18n()
  const { streakLabel } = useProgress()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const displayName = sanitizeDisplayFirstName(user?.fullName, language === 'ne' ? 'सदस्य' : 'Member')

  if (!user) return null

  const close = () => setOpen(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-mig-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/dashboard" className="flex items-center gap-2" onClick={close}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-mig-gold/30 to-mig-gold/5 ring-1 ring-mig-gold/40">
            <span className="font-display text-lg text-mig-gold">M</span>
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold tracking-wide text-mig-muted">
              {language === 'ne' ? 'एमआइजी वेल्थ एकेडेमी' : 'MIG Wealth Academy'}
            </p>
            <p className="text-sm font-semibold text-mig-white">{language === 'ne' ? 'सिक्नुहोस् · बढ्नुहोस् · कमाउनुहोस्' : 'Learn · Grow · Earn'}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/dashboard" className={linkClass}>
            <span className="flex items-center gap-1.5">
              <LayoutDashboard className="h-4 w-4" /> {t('navDashboard')}
            </span>
          </NavLink>
          <NavLink to="/courses" className={linkClass}>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" /> {t('navCourses')}
            </span>
          </NavLink>
          <NavLink to="/rewards" className={linkClass}>
            <span className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4" /> {t('navRewards')}
            </span>
          </NavLink>
          <NavLink to="/leaderboard" className={linkClass}>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {t('navLeaderboard')}
            </span>
          </NavLink>
          <NavLink to="/certificate" className={linkClass}>
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4" /> {t('navCertificate')}
            </span>
          </NavLink>
          {user.role === 'admin' && (
            <NavLink to="/admin" className={linkClass}>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> {t('navAdmin')}
              </span>
            </NavLink>
          )}
        </nav>

        <div className="inline-flex shrink-0 min-w-[110px] items-center rounded-xl border border-white/15 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setLanguage('ne')}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition md:text-sm ${
              language === 'ne' ? 'bg-mig-gold text-mig-bg' : 'text-mig-muted hover:text-mig-white'
            }`}
          >
            नेपाली
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition md:text-sm ${
              language === 'en' ? 'bg-mig-gold text-mig-bg' : 'text-mig-muted hover:text-mig-white'
            }`}
          >
            EN
          </button>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-full border border-mig-gold/40 bg-black/30 px-3 py-1 text-xs text-mig-gold">
            {streakLabel}
          </span>
          <NotificationBell />
          <span className="max-w-[140px] truncate text-xs text-mig-muted">{displayName}</span>
          <button
            type="button"
            onClick={async () => {
              await logout()
              navigate('/')
            }}
            className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-white/10 px-2.5 py-2 text-xs font-medium text-mig-muted hover:border-mig-gold/40 hover:text-mig-white whitespace-nowrap"
          >
            <LogOut className="h-3.5 w-3.5" /> <span className="hidden lg:inline">{t('navLogout')}</span>
          </button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-xl border border-white/10 p-2 text-mig-white md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-mig-bg md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              <NavLink to="/dashboard" className={linkClass} onClick={close}>
                {t('navDashboard')}
              </NavLink>
              <NavLink to="/courses" className={linkClass} onClick={close}>
                {t('navCourses')}
              </NavLink>
              <NavLink to="/rewards" className={linkClass} onClick={close}>
                {t('navRewards')}
              </NavLink>
              <NavLink to="/leaderboard" className={linkClass} onClick={close}>
                {t('navLeaderboard')}
              </NavLink>
              <NavLink to="/certificate" className={linkClass} onClick={close}>
                {t('navCertificate')}
              </NavLink>
              {user.role === 'admin' && (
                <NavLink to="/admin" className={linkClass} onClick={close}>
                  {t('navAdmin')}
                </NavLink>
              )}
              <button
                type="button"
                className="mt-2 rounded-xl border border-white/10 px-3 py-2 text-left text-sm text-mig-muted"
                onClick={async () => {
                  await logout()
                  close()
                  navigate('/')
                }}
              >
                {t('navLogout')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
