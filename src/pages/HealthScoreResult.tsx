import { useEffect, useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ProgressRing } from '../components/ProgressRing'
import { useXPToast } from '../hooks/useXPToast'
import type { FinancialHealthResult } from '../utils/financialHealthScore'

export function HealthScoreResult() {
  const { showXP } = useXPToast()

  const result = useMemo(() => {
    try {
      const raw = localStorage.getItem('mig_health_score_result')
      return raw ? (JSON.parse(raw) as FinancialHealthResult) : null
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    if (!result) return
    const alreadyAwarded = localStorage.getItem('mig_health_score_xp_awarded') === 'true'
    if (alreadyAwarded) return
    localStorage.setItem('mig_health_score_xp_awarded', 'true')
    showXP(50, 'आर्थिक स्वास्थ्य जाँच पूरा भयो')
  }, [result, showXP])

  if (!result) return <Navigate to="/health-score" replace />

  const cards = [
    result.breakdown.saving,
    result.breakdown.expenseControl,
    result.breakdown.debtPressure,
    result.breakdown.emergencyFund,
    result.breakdown.incomeBase,
  ]

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 md:p-8">
        <p className="text-sm text-mig-muted">MIG Financial Health Score</p>
        <div className="mt-4 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-mig-white md:text-3xl">तपाईंको स्कोर: {result.totalScore}/100</h1>
            <span className="mt-3 inline-flex rounded-full border border-mig-gold/40 bg-mig-gold/10 px-3 py-1 text-sm font-medium text-mig-gold">
              {result.category}
            </span>
          </div>
          <ProgressRing value={result.totalScore} showFraction title="Score" label="/ 100" size={150} />
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((item) => (
          <div key={item.label} className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-mig-white">{item.label}</h3>
              <span className="text-sm font-semibold text-mig-gold">{item.points}</span>
            </div>
            <p className="mt-2 text-sm text-mig-muted">{item.explanation}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-mig-white">तपाईंका बलिया पक्षहरू</h2>
          <ul className="mt-3 space-y-2 text-sm text-mig-muted">
            {result.strengths.map((s) => (
              <li key={s}>- {s}</li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-mig-white">ध्यान दिनुपर्ने क्षेत्रहरू</h2>
          <ul className="mt-3 space-y-2 text-sm text-mig-muted">
            {result.risks.map((r) => (
              <li key={r}>- {r}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-mig-white">अर्को ३० दिनको सुधार योजना</h2>
        <ol className="mt-3 space-y-2 text-sm text-mig-muted">
          {result.roadmap.map((item, index) => (
            <li key={item}>
              {index + 1}. {item}
            </li>
          ))}
        </ol>
      </section>

      <p className="text-xs text-mig-muted">
        यो स्कोर शैक्षिक उद्देश्यका लागि हो। यसलाई व्यक्तिगत वित्तीय सल्लाहको विकल्पको रूपमा नलिनुहोस्।
      </p>

      <div className="flex flex-wrap gap-3">
        <Link to="/courses" className="rounded-xl bg-mig-gold px-5 py-2.5 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90">
          सुधार योजना सुरु गरौँ
        </Link>
        <Link to="/dashboard" className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-mig-muted hover:text-mig-white">
          ड्यासबोर्डमा फर्कनुहोस्
        </Link>
        <Link to="/health-score" className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-mig-muted hover:text-mig-white">
          स्कोर फेरि जाँच गर्नुहोस्
        </Link>
      </div>
    </div>
  )
}
