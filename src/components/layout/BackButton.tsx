import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'

export function BackButton() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useI18n()

  const isRootDashboard = pathname === '/dashboard'
  const isLessonOrQuiz = pathname.startsWith('/lesson/') || pathname.startsWith('/quiz/')
  if (isLessonOrQuiz) return null
  if (isRootDashboard) return null

  return (
    <button
      type="button"
      onClick={() => {
        if (pathname === '/courses') {
          navigate('/dashboard', { replace: false })
          return
        }
        navigate(-1)
      }}
      className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-mig-muted hover:border-mig-gold/40 hover:text-mig-white"
    >
      <ArrowLeft className="h-4 w-4" /> {t('back')}
    </button>
  )
}
