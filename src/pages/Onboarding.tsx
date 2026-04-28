import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Gift } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { NEPAL_DISTRICTS } from '../data/districts'
import { useProgress } from '../context/ProgressContext'
import { useXPToast } from '../hooks/useXPToast'

export function Onboarding() {
  const navigate = useNavigate()
  const { pendingPhone, completeOnboarding } = useAuth()
  const { showXP } = useXPToast()
  const { registerOnboardingBonus } = useProgress()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    fullName: '',
    memberId: '',
    district: '',
    ageGroup: '',
    gender: '',
    referral: '',
  })

  useEffect(() => {
    if (!pendingPhone) {
      navigate('/start', { replace: true })
    }
  }, [pendingPhone, navigate])

  const nextToOptional = () => {
    setError(null)
    if (!form.fullName.trim()) return setError('कृपया पूरा नाम लेख्नुहोस्।')
    if (!form.memberId.trim()) return setError('कृपया MIG सदस्य ID लेख्नुहोस्।')
    setStep(2)
  }

  const finishOnboarding = async () => {
    setError(null)
    if (!form.district.trim()) return setError('कृपया जिल्ला चयन गर्नुहोस्।')
    try {
      setIsSaving(true)
      await completeOnboarding({
        fullName: form.fullName,
        memberId: form.memberId,
        district: form.district,
        ageGroup: form.ageGroup,
        gender: form.gender,
      })
      registerOnboardingBonus()
      showXP(20, 'साइनअप बोनस')
      setStep(3)
      window.setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'साइनअप पूरा गर्न असफल भयो।')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-mig-bg px-4 py-10">
      <div className="mx-auto max-w-md">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-8">
          {step === 1 && (
            <>
              <h1 className="font-display text-2xl text-mig-white">तपाईंको जानकारी</h1>
              <p className="mt-2 text-sm text-mig-muted">सुरु गर्न यी 2 जानकारी चाहिन्छ।</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-medium text-mig-muted">पूरा नाम</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-mig-muted">MIG सदस्य ID</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                    value={form.memberId}
                    onChange={(e) => setForm({ ...form, memberId: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={nextToOptional}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-mig-gold py-3 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
                >
                  अगाडि बढौँ <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-display text-2xl text-mig-white">अन्तिम चरण (वैकल्पिक)</h1>
              <p className="mt-2 text-sm text-mig-muted">जिल्ला आवश्यक छ, बाँकी तपाईँ चाहेमा थप्न सक्नुहुन्छ।</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-medium text-mig-muted">जिल्ला</label>
                  <select
                    className="mt-1 w-full rounded-xl border border-white/15 bg-mig-bg px-3 py-2.5 text-sm text-mig-white outline-none ring-mig-gold/40 focus:border-mig-gold/40 focus:ring-2"
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                  >
                    <option value="" disabled className="bg-mig-bg text-mig-muted">
                      जिल्ला चयन गर्नुहोस्
                    </option>
                    {NEPAL_DISTRICTS.map((district) => (
                      <option key={district} value={district} className="bg-mig-bg text-mig-white">
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-mig-muted">उमेर समूह</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                      value={form.ageGroup}
                      onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
                      placeholder="जस्तै २५-३५"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-mig-muted">लिङ्ग</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-mig-muted">Referral (optional)</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                    value={form.referral}
                    onChange={(e) => setForm({ ...form, referral: e.target.value })}
                  />
                </div>
                <div className="rounded-2xl border border-mig-gold/30 bg-mig-gold/10 p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-mig-gold">
                    <Gift className="h-4 w-4" /> साइनअप पूरा गरेपछि: +20 XP तुरुन्त पाउनुहुनेछ
                  </p>
                </div>
                <button
                  type="button"
                  onClick={finishOnboarding}
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-mig-gold py-3 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90 disabled:opacity-70"
                >
                  {isSaving ? 'सेभ गर्दै...' : 'सिकाइ सुरु गरौँ'} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <p className="text-4xl">🎉</p>
              <h2 className="mt-3 font-display text-2xl text-mig-white">स्वागत छ!</h2>
              <p className="mt-2 text-sm text-mig-muted">तपाईंको सिकाइ यात्रा सुरु भयो</p>
              <p className="mt-3 text-sm font-semibold text-mig-gold">+20 XP कमाउनुभयो</p>
            </motion.div>
          )}

          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        </motion.div>
      </div>
    </div>
  )
}
