import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Filter, Plus, Users } from 'lucide-react'
import { LESSONS } from '../data/lessons'
import { MOCK_ADMIN_USERS } from '../data/users'
import { isAdminAnalyticsEnabled, isSupabaseConfigured } from '../lib/supabase'
import {
  fetchAdminDropoff,
  fetchAdminOverview,
  fetchAdminQuizAnalytics,
  fetchHardestQuestions,
  runProgressReminderCampaign,
} from '../lib/serverApi'

type MockQuizRow = { id: string; lessonTitle: string; question: string }

export function Admin() {
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonBody, setLessonBody] = useState('')
  const [quizLesson, setQuizLesson] = useState(LESSONS[0]?.title ?? '')
  const [quizQ, setQuizQ] = useState('')
  const [quizRows, setQuizRows] = useState<MockQuizRow[]>([
    { id: '1', lessonTitle: 'Money Mindset', question: 'What is the first rule of financial discipline?' },
  ])
  type ClaimStatus = 'pending' | 'approved' | 'rejected'
  type ClaimRow = { id: string; member: string; tier: string; status: ClaimStatus }
  const [claims, setClaims] = useState<ClaimRow[]>([
    { id: 'c1', member: 'Demo Member', tier: 'Bronze Learner', status: 'pending' },
    { id: 'c2', member: 'Sita Magar', tier: 'Silver Learner', status: 'pending' },
  ])
  const [districtFilter, setDistrictFilter] = useState<string>('All')
  const [progressFilter, setProgressFilter] = useState<'all' | 'beginner' | 'advanced'>('all')
  const [activityFilter, setActivityFilter] = useState<'all' | 'active7d' | 'inactive'>('all')
  const [overview, setOverview] = useState<{ total_users: number; active_users_7d: number; completion_rate_pct: number } | null>(null)
  const [dropoff, setDropoff] = useState<Array<{ chapter_number: number; title: string; completed_users: number }>>([])
  const [quizAnalytics, setQuizAnalytics] = useState<Array<{ title: string; attempts: number; avg_score: number; pass_rate_pct: number }>>([])
  const [hardestQuestions, setHardestQuestions] = useState<Array<{ lesson_title: string; question: string; fail_rate_pct: number }>>([])
  const [campaignStatus, setCampaignStatus] = useState<string>('')

  const lessonPreview = useMemo(
    () => LESSONS.map((l) => ({ id: l.id, title: l.title, active: true })),
    [],
  )

  useEffect(() => {
    if (!isSupabaseConfigured() || !isAdminAnalyticsEnabled()) return
    void (async () => {
      try {
        const [o, d, q, h] = await Promise.all([
          fetchAdminOverview(),
          fetchAdminDropoff(),
          fetchAdminQuizAnalytics(),
          fetchHardestQuestions(),
        ])
        if (o) setOverview(o as { total_users: number; active_users_7d: number; completion_rate_pct: number })
        setDropoff(d as Array<{ chapter_number: number; title: string; completed_users: number }>)
        setQuizAnalytics(q as Array<{ title: string; attempts: number; avg_score: number; pass_rate_pct: number }>)
        setHardestQuestions(h as Array<{ lesson_title: string; question: string; fail_rate_pct: number }>)
      } catch {
        // Fallback handled by existing mock UI.
      }
    })()
  }, [])

  const filteredUsers = useMemo(() => {
    return MOCK_ADMIN_USERS.filter((u) => {
      if (districtFilter !== 'All' && u.district !== districtFilter) return false
      if (progressFilter === 'beginner' && u.progress > 3) return false
      if (progressFilter === 'advanced' && u.progress < 7) return false
      if (activityFilter === 'active7d' && u.progress < 3) return false
      if (activityFilter === 'inactive' && u.progress > 2) return false
      return true
    })
  }, [districtFilter, progressFilter, activityFilter])

  const exportUsersCsv = () => {
    const rows = [['full_name', 'member_id', 'district', 'points', 'progress'], ...filteredUsers.map((u) => [
      u.fullName, u.memberId, u.district, String(u.points), String(u.progress),
    ])]
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'mig_admin_users_export.csv'
    link.click()
  }

  const addLessonDraft = () => {
    if (!lessonTitle.trim()) return
    // MVP: local draft only — Phase 2 inserts into Supabase `lessons`.
    setLessonTitle('')
    setLessonBody('')
  }

  const addQuizDraft = () => {
    if (!quizQ.trim()) return
    setQuizRows((r) => [...r, { id: crypto.randomUUID(), lessonTitle: quizLesson, question: quizQ.trim() }])
    setQuizQ('')
  }

  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl text-mig-white">Admin overview</h1>
        <p className="mt-2 text-sm text-mig-muted">
          Structured for Supabase: lessons, quizzes, progress, exports, and reward approvals. Database:{' '}
          <span className="text-mig-white">{isSupabaseConfigured() ? 'connected' : 'not configured (MVP mock)'}</span>.
        </p>
      </motion.div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wide text-mig-muted">Total users</p>
          <p className="mt-2 text-2xl font-semibold text-mig-white">{overview?.total_users ?? MOCK_ADMIN_USERS.length}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wide text-mig-muted">Active users (7d)</p>
          <p className="mt-2 text-2xl font-semibold text-mig-white">{overview?.active_users_7d ?? 2}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wide text-mig-muted">Completion rate</p>
          <p className="mt-2 text-2xl font-semibold text-mig-white">{overview?.completion_rate_pct ?? 42}%</p>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold text-mig-white">User analytics filters</h2>
          <div className="inline-flex items-center gap-2 text-xs text-mig-muted">
            <Filter className="h-3.5 w-3.5" /> district, progress, activity
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <select className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm" value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)}>
            <option>All</option>
            {[...new Set(MOCK_ADMIN_USERS.map((u) => u.district))].map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
          <select className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm" value={progressFilter} onChange={(e) => setProgressFilter(e.target.value as 'all' | 'beginner' | 'advanced')}>
            <option value="all">All progress</option>
            <option value="beginner">Beginner (0-3)</option>
            <option value="advanced">Advanced (7+)</option>
          </select>
          <select className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm" value={activityFilter} onChange={(e) => setActivityFilter(e.target.value as 'all' | 'active7d' | 'inactive')}>
            <option value="all">All activity</option>
            <option value="active7d">Active 7d</option>
            <option value="inactive">Inactive risk</option>
          </select>
          <button
            type="button"
            onClick={exportUsersCsv}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium hover:border-mig-gold/40"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h2 className="flex items-center gap-2 font-semibold text-mig-white">
            <Plus className="h-4 w-4 text-mig-gold" /> Add lesson (draft)
          </h2>
          <label className="mt-4 block text-xs text-mig-muted">Title</label>
          <input
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-mig-gold/40"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
          />
          <label className="mt-3 block text-xs text-mig-muted">Content</label>
          <textarea
            className="mt-1 min-h-[120px] w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-mig-gold/40"
            value={lessonBody}
            onChange={(e) => setLessonBody(e.target.value)}
          />
          <button
            type="button"
            onClick={addLessonDraft}
            className="mt-4 rounded-xl bg-mig-gold px-4 py-2 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
          >
            Save draft locally
          </button>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="flex items-center gap-2 font-semibold text-mig-white">
            <Plus className="h-4 w-4 text-mig-gold" /> Add quiz question (draft)
          </h2>
          <label className="mt-4 block text-xs text-mig-muted">Lesson</label>
          <select
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-mig-gold/40"
            value={quizLesson}
            onChange={(e) => setQuizLesson(e.target.value)}
          >
            {LESSONS.map((l) => (
              <option key={l.id}>{l.title}</option>
            ))}
          </select>
          <label className="mt-3 block text-xs text-mig-muted">Question</label>
          <input
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-mig-gold/40"
            value={quizQ}
            onChange={(e) => setQuizQ(e.target.value)}
          />
          <button
            type="button"
            onClick={addQuizDraft}
            className="mt-4 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium hover:border-mig-gold/40"
          >
            Queue question
          </button>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-semibold text-mig-white">Published lessons (seed)</h2>
        <ul className="mt-4 divide-y divide-white/10 text-sm">
          {lessonPreview.map((l) => (
            <li key={l.id} className="flex justify-between py-3 text-mig-muted">
              <span className="text-mig-white">{l.title}</span>
              <span>{l.active ? 'Active' : 'Off'}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="flex items-center gap-2 font-semibold text-mig-white">
          <Users className="h-4 w-4 text-mig-gold" /> Members (mock)
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-xs uppercase text-mig-muted">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Member ID</th>
                <th className="py-2">District</th>
                <th className="py-2">XP</th>
                <th className="py-2">Chapters</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-t border-white/5 text-mig-muted">
                  <td className="py-2 text-mig-white">{u.fullName}</td>
                  <td className="py-2">{u.memberId}</td>
                  <td className="py-2">{u.district}</td>
                  <td className="py-2 tabular-nums">{u.points}</td>
                  <td className="py-2">{u.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold text-mig-white">Drop-off funnel</h2>
          <ul className="mt-4 space-y-2 text-sm text-mig-muted">
            {(dropoff.length ? dropoff : LESSONS.map((l, i) => ({ chapter_number: l.chapterNumber, title: l.title, completed_users: Math.max(100 - i * 15, 10) }))).map((d) => (
              <li key={d.chapter_number} className="flex items-center justify-between rounded-xl border border-white/5 px-3 py-2">
                <span>Lesson {d.chapter_number}</span>
                <span>{d.completed_users}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold text-mig-white">Quiz analytics</h2>
          <ul className="mt-4 space-y-2 text-sm text-mig-muted">
            {(quizAnalytics.length ? quizAnalytics : LESSONS.slice(0, 5).map((l, i) => ({ title: l.title, attempts: 100 - i * 10, avg_score: 78 - i * 3, pass_rate_pct: 82 - i * 4 }))).map((q) => (
              <li key={q.title} className="rounded-xl border border-white/5 px-3 py-2">
                <p className="text-mig-white">{q.title}</p>
                <p className="text-xs">Attempts: {q.attempts} · Avg: {q.avg_score}% · Pass: {q.pass_rate_pct}%</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-semibold text-mig-white">Hardest questions</h2>
        <ul className="mt-4 space-y-2 text-sm text-mig-muted">
          {(hardestQuestions.length ? hardestQuestions : quizRows.map((q, i) => ({ lesson_title: q.lessonTitle, question: q.question, fail_rate_pct: 40 - i * 5 }))).map((q, idx) => (
            <li key={`${q.lesson_title}-${idx}`} className="rounded-xl border border-white/5 px-3 py-2">
              <p className="text-mig-white">{q.lesson_title}</p>
              <p>{q.question}</p>
              <p className="text-xs text-mig-gold">Fail rate: {q.fail_rate_pct}%</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-semibold text-mig-white">Engagement automation</h2>
        <p className="mt-2 text-sm text-mig-muted">
          Queue inactivity reminders and route them through in-app notifications and WhatsApp provider adapters.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={async () => {
              setCampaignStatus('')
              try {
                const res = await runProgressReminderCampaign()
                setCampaignStatus(`Queued ${res.queued} reminders.`)
              } catch {
                setCampaignStatus('Unable to queue reminders in this environment.')
              }
            }}
            className="rounded-xl bg-mig-gold px-4 py-2 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
          >
            Run 3-day inactivity campaign
          </button>
          {campaignStatus && <p className="text-xs text-mig-muted">{campaignStatus}</p>}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-semibold text-mig-white">Queued quiz questions</h2>
        <ul className="mt-4 space-y-2 text-sm text-mig-muted">
          {quizRows.map((r) => (
            <li key={r.id} className="rounded-xl border border-white/5 px-3 py-2">
              <span className="text-mig-gold">{r.lessonTitle}</span> — {r.question}
            </li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-semibold text-mig-white">Reward claims (mock)</h2>
        <div className="mt-4 space-y-3">
          {claims.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm">
              <div>
                <p className="font-medium text-mig-white">{c.member}</p>
                <p className="text-xs text-mig-muted">{c.tier}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-mig-green/20 px-3 py-1.5 text-xs font-semibold text-mig-green hover:bg-mig-green/30"
                  onClick={() => setClaims((x) => x.map((y) => (y.id === c.id ? { ...y, status: 'approved' as const } : y)))}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-mig-muted hover:text-mig-white"
                  onClick={() => setClaims((x) => x.map((y) => (y.id === c.id ? { ...y, status: 'rejected' as const } : y)))}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
