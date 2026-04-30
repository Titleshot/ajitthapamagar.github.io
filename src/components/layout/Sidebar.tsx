import { NavLink } from 'react-router-dom'
import { Activity, Award, BookOpen, LayoutDashboard, Shield, Trophy, Users } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useI18n } from '../../context/I18nContext'

const item =
  'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-mig-muted hover:bg-white/5 hover:text-mig-white'

const active = 'bg-white/10 text-mig-gold'

export function Sidebar() {
  const { user } = useAuth()
  const { t, language } = useI18n()
  if (!user) return null

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="glass sticky top-24 rounded-2xl p-3">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-mig-muted">
          {language === 'ne' ? 'नेभिगेट' : 'Navigate'}
        </p>
        <nav className="flex flex-col gap-1">
          <NavLink to="/dashboard" className={({ isActive }) => `${item} ${isActive ? active : ''}`}>
            <LayoutDashboard className="h-4 w-4" /> {t('navDashboard')}
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => `${item} ${isActive ? active : ''}`}>
            <BookOpen className="h-4 w-4" /> {t('courseRoadmap')}
          </NavLink>
          <NavLink to="/rewards" className={({ isActive }) => `${item} ${isActive ? active : ''}`}>
            <Trophy className="h-4 w-4" /> {t('navRewards')}
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => `${item} ${isActive ? active : ''}`}>
            <Users className="h-4 w-4" /> {t('navLeaderboard')}
          </NavLink>
          <NavLink to="/certificate" className={({ isActive }) => `${item} ${isActive ? active : ''}`}>
            <Award className="h-4 w-4" /> {t('navCertificate')}
          </NavLink>
          <NavLink to="/health-score" className={({ isActive }) => `${item} ${isActive ? active : ''}`}>
            <Activity className="h-4 w-4" /> Health Score
          </NavLink>
          {user.role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => `${item} ${isActive ? active : ''}`}>
              <Shield className="h-4 w-4" /> {t('navAdmin')}
            </NavLink>
          )}
        </nav>
      </div>
    </aside>
  )
}
