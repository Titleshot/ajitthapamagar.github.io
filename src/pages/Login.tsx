import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Smartphone } from 'lucide-react'
import { useAuth, type AuthUser } from '../context/AuthContext'
import { NEPAL_DISTRICTS } from '../data/districts'
import { useI18n } from '../context/I18nContext'

const ADMIN_PASSPHRASE = 'WEALTH2026'

export function Login() {
  const { requiresOtp, sendOtp, verifyOtpAndLogin, loginFallback } = useAuth()
  const { setLanguage } = useI18n()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    memberId: '',
    district: '',
    ageGroup: '',
    gender: '',
    adminPassphrase: '',
  })
  const [otpCode, setOtpCode] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateForm = () => {
    if (!form.fullName.trim()) return 'कृपया आफ्नो पूरा नाम लेख्नुहोस्।'
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 7) return 'कृपया मान्य फोन नम्बर लेख्नुहोस्।'
    if (!form.memberId.trim()) return 'कृपया आफ्नो MIG सदस्य ID लेख्नुहोस्।'
    if (!form.district.trim()) return 'कृपया आफ्नो जिल्ला लेख्नुहोस्।'
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const validationError = validateForm()
    if (validationError) return setError(validationError)

    const role = form.adminPassphrase.trim() === ADMIN_PASSPHRASE ? 'admin' : 'member'
    const user: AuthUser = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      memberId: form.memberId.trim(),
      district: form.district.trim(),
      ageGroup: form.ageGroup.trim() || undefined,
      gender: form.gender.trim() || undefined,
      role,
    }
    if (!requiresOtp) {
      loginFallback(user)
      setLanguage('ne')
      navigate('/dashboard', { replace: true })
      return
    }

    if (!otpSent) {
      try {
        setSendingOtp(true)
        await sendOtp({ phone: form.phone.trim() })
        setOtpSent(true)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'OTP पठाउन असफल भयो।'
        setError(message)
      } finally {
        setSendingOtp(false)
      }
      return
    }

    if (otpCode.trim().length < 4) {
      setError('कृपया प्राप्त भएको OTP कोड लेख्नुहोस्।')
      return
    }

    try {
      setVerifyingOtp(true)
      await verifyOtpAndLogin({
        phone: form.phone.trim(),
        token: otpCode.trim(),
        profile: user,
      })
      setLanguage('ne')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'OTP प्रमाणीकरण असफल भयो।'
      setError(message)
    } finally {
      setVerifyingOtp(false)
    }
  }

  return (
    <div className="min-h-screen bg-mig-bg px-4 py-10">
      <div className="mx-auto max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-mig-muted hover:text-mig-white">
          <ArrowLeft className="h-4 w-4" /> होममा फर्कनुहोस्
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glass rounded-3xl p-8"
        >
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-mig-gold/15 p-2 ring-1 ring-mig-gold/30">
              <Shield className="h-5 w-5 text-mig-gold" />
            </div>
            <div>
              <h1 className="font-display text-2xl text-mig-white">सदस्य पहुँच</h1>
              <p className="text-xs text-mig-muted">
                {requiresOtp
                  ? 'सदस्य प्रमाणीकरणसहित फोन OTP लगइन सक्षम छ।'
                  : 'यस वातावरणमा Supabase OTP बन्द छ। फलब्याक मोड प्रयोग भइरहेको छ।'}
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-medium text-mig-muted">पूरा नाम</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                autoComplete="name"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-mig-muted">फोन नम्बर</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                inputMode="tel"
              />
              {requiresOtp && (
                <p className="mt-1 text-[11px] text-mig-muted">
                  देशको कोडसहित पूरा नम्बर लेख्नुहोस्, जस्तै +97798XXXXXXXX
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-mig-muted">MIG सदस्य ID</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                value={form.memberId}
                onChange={(e) => setForm({ ...form, memberId: e.target.value })}
              />
            </div>
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
                <label className="text-xs font-medium text-mig-muted">उमेर समूह (वैकल्पिक)</label>
                <input
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                  placeholder="जस्तै २५–३५"
                  value={form.ageGroup}
                  onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-mig-muted">लिङ्ग (वैकल्पिक)</label>
                <input
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-mig-muted">एडमिन पासफ्रेज (वैकल्पिक)</label>
              <input
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                placeholder="डेमोका लागि मात्र"
                value={form.adminPassphrase}
                onChange={(e) => setForm({ ...form, adminPassphrase: e.target.value })}
              />
              <p className="mt-1 text-[11px] text-mig-muted">
                सदस्यका लागि खाली छोड्नुहोस्। एडमिन डेमोका लागि <span className="text-mig-gold">{ADMIN_PASSPHRASE}</span> प्रयोग गर्नुहोस्।
              </p>
            </div>
            {requiresOtp && otpSent && (
              <div>
                <label className="text-xs font-medium text-mig-muted">OTP कोड</label>
                <div className="mt-1 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Smartphone className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-mig-muted" />
                    <input
                      className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      inputMode="numeric"
                      placeholder="OTP लेख्नुहोस्"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      setError(null)
                      try {
                        setSendingOtp(true)
                        await sendOtp({ phone: form.phone.trim() })
                      } catch (err) {
                        const message = err instanceof Error ? err.message : 'OTP पुन: पठाउन असफल भयो।'
                        setError(message)
                      } finally {
                        setSendingOtp(false)
                      }
                    }}
                    className="rounded-xl border border-white/10 px-3 py-2 text-xs text-mig-muted hover:border-mig-gold/40 hover:text-mig-white"
                  >
                    पुन: पठाउनुहोस्
                  </button>
                </div>
              </div>
            )}
            {error && <p className="text-sm text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={sendingOtp || verifyingOtp}
              className="w-full rounded-2xl bg-mig-gold py-3 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
            >
              {!requiresOtp
                ? 'ड्यासबोर्डमा जानुहोस्'
                : !otpSent
                  ? sendingOtp
                    ? 'OTP पठाउँदै...'
                    : 'OTP पठाउनुहोस्'
                  : verifyingOtp
                    ? 'OTP प्रमाणीकरण गर्दै...'
                    : 'OTP प्रमाणित गरेर अगाडि बढ्नुहोस्'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
