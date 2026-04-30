import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Start } from './pages/Start'
import { Onboarding } from './pages/Onboarding'
import { Dashboard } from './pages/Dashboard'
import { Courses } from './pages/Courses'
import { Lesson } from './pages/Lesson'
import { Quiz } from './pages/Quiz'
import { Rewards } from './pages/Rewards'
import { Leaderboard } from './pages/Leaderboard'
import { Certificate } from './pages/Certificate'
import { Admin } from './pages/Admin'
import { HealthScore } from './pages/HealthScore'
import { HealthScoreResult } from './pages/HealthScoreResult'
import { MainLayout } from './components/layout/MainLayout'
import { AdminLayout } from './components/layout/AdminLayout'
import { XPToastProvider } from './hooks/useXPToast'

function ProtectedRoute() {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div className="p-8 text-sm text-mig-muted">Loading session...</div>
  if (!user) return <Navigate to="/start" replace />
  return <Outlet />
}

function RequireAdmin() {
  const { user } = useAuth()
  if (!user || user.role !== 'admin') return <Navigate to="/dashboard" replace />
  return <AdminLayout />
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <XPToastProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/start" element={<Start />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<RequireAdmin />}>
            <Route index element={<Admin />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/quiz/:lessonId" element={<Quiz />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/health-score" element={<HealthScore />} />
            <Route path="/health-score/result" element={<HealthScoreResult />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </XPToastProvider>
  )
}
