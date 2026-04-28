import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Smartphone } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'

export function Start() {
  const navigate = useNavigate()
  const { language } = useI18n()
  const { requiresOtp, sendOtp, verifyOtp } = useAuth()
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const trimmedPhone = phone.trim()
    if (trimmedPhone.replace(/\D/g, '').length < 7) {
      setError(language === 'ne' ? 'कृपया मान्य फोन नम्बर लेख्नुहोस्।' : 'Please enter a valid phone number.')
      return
    }

    try {
      setIsBusy(true)
      if (requiresOtp) {
        await sendOtp({ phone: trimmedPhone })
      } else {
        await sendOtp({ phone: trimmedPhone })
      }
      setStep('otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : language === 'ne' ? 'OTP पठाउन असफल भयो।' : 'Failed to send OTP.')
    } finally {
      setIsBusy(false)
    }
  }

  const submitOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (otp.trim().length < 4) {
      setError(language === 'ne' ? 'कृपया OTP लेख्नुहोस्।' : 'Please enter the OTP.')
      return
    }
    try {
      setIsBusy(true)
      const result = await verifyOtp({ phone: phone.trim(), token: otp.trim() })
      if (result.isExistingUser) {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/onboarding', { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : language === 'ne' ? 'OTP प्रमाणीकरण असफल भयो।' : 'OTP verification failed.')
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-mig-bg px-4 py-10">
      <div className="mx-auto max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-mig-muted hover:text-mig-white">
          <ArrowLeft className="h-4 w-4" /> {language === 'ne' ? 'होममा फर्कनुहोस्' : 'Back to home'}
        </Link>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8 glass rounded-3xl p-8">
          {step === 'phone' ? (
            <>
              <h1 className="font-display text-2xl text-mig-white">
                {language === 'ne' ? 'आफ्नो सिकाइ यात्रा सुरु गर्नुहोस्' : 'Start your learning journey'}
              </h1>
              <p className="mt-2 text-sm text-mig-muted">
                {language === 'ne'
                  ? 'पहिले नै सदस्य हुनुहुन्छ? फोन नम्बर हाल्नुहोस् र सिधै प्रवेश गर्नुहोस्'
                  : 'Already a member? Enter your phone number and continue directly.'}
              </p>
              <form onSubmit={submitPhone} className="mt-7 space-y-4">
                <div>
                  <label className="text-xs font-medium text-mig-muted">{language === 'ne' ? 'फोन नम्बर' : 'Phone number'}</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    placeholder="+97798XXXXXXXX"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isBusy}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-mig-gold py-3 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90 disabled:opacity-70"
                >
                  {isBusy
                    ? language === 'ne'
                      ? 'OTP पठाउँदै...'
                      : 'Sending OTP...'
                    : language === 'ne'
                      ? 'OTP पठाउनुहोस्'
                      : 'Send OTP'}{' '}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl text-mig-white">{language === 'ne' ? 'OTP पुष्टि गर्नुहोस्' : 'Verify OTP'}</h1>
              <p className="mt-2 text-sm text-mig-muted">
                {language === 'ne' ? 'तपाईंको फोनमा पठाइएको 6 अंकको OTP हाल्नुहोस्' : 'Enter the 6-digit OTP sent to your phone'}
              </p>
              {!requiresOtp && (
                <p className="mt-2 text-xs text-mig-gold">
                  {language === 'ne' ? 'डेमो मोड: OTP का लागि 123456 प्रयोग गर्नुहोस्।' : 'Demo mode: use 123456 as OTP.'}
                </p>
              )}
              <form onSubmit={submitOtp} className="mt-7 space-y-4">
                <div>
                  <label className="text-xs font-medium text-mig-muted">{language === 'ne' ? 'OTP कोड' : 'OTP code'}</label>
                  <div className="relative mt-1">
                    <Smartphone className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-mig-muted" />
                    <input
                      className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm outline-none ring-mig-gold/40 focus:ring-2"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      inputMode="numeric"
                      placeholder={language === 'ne' ? '६ अङ्कको OTP' : '6-digit OTP'}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="w-1/3 rounded-2xl border border-white/15 py-3 text-sm font-medium text-mig-white hover:border-mig-gold/40"
                  >
                    {language === 'ne' ? 'फर्कनुहोस्' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={isBusy}
                    className="inline-flex w-2/3 items-center justify-center gap-2 rounded-2xl bg-mig-gold py-3 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90 disabled:opacity-70"
                  >
                    {isBusy ? (language === 'ne' ? 'पुष्टि गर्दै...' : 'Verifying...') : language === 'ne' ? 'पुष्टि गर्नुहोस्' : 'Verify'}{' '}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </>
          )}

          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        </motion.div>
      </div>
    </div>
  )
}
