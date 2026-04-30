import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { calculateFinancialHealthScore, type DebtOption, type EmergencyOption, type ExpenseOption, type FinancialHealthInput, type SavingOption } from '../utils/financialHealthScore'

type StepKey = 'income' | 'expense' | 'saving' | 'debt' | 'emergency'

const TOTAL_STEPS = 5

const defaultInput: FinancialHealthInput = {
  monthlyIncome: null,
  monthlyExpense: null,
  monthlySaving: null,
  savingOption: null,
  expenseOption: null,
  debtLevel: null,
  emergencyFund: null,
}

export function HealthScore() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(1)
  const [input, setInput] = useState<FinancialHealthInput>(() => {
    try {
      const raw = localStorage.getItem('mig_health_score_input')
      if (!raw) return defaultInput
      return { ...defaultInput, ...JSON.parse(raw) } as FinancialHealthInput
    } catch {
      return defaultInput
    }
  })
  const [error, setError] = useState('')

  const stepKey = useMemo<StepKey>(() => {
    if (step === 1) return 'income'
    if (step === 2) return 'expense'
    if (step === 3) return 'saving'
    if (step === 4) return 'debt'
    return 'emergency'
  }, [step])

  const canContinue = () => {
    if (stepKey === 'income') return input.monthlyIncome !== null && input.monthlyIncome > 0
    if (stepKey === 'expense') return input.expenseOption !== null || (input.monthlyExpense !== null && input.monthlyExpense >= 0)
    if (stepKey === 'saving') return input.savingOption !== null || (input.monthlySaving !== null && input.monthlySaving >= 0)
    if (stepKey === 'debt') return input.debtLevel !== null
    return input.emergencyFund !== null
  }

  const handleNext = () => {
    if (!canContinue()) {
      setError('कृपया यो चरण पूरा गर्नुहोस्।')
      return
    }
    setError('')
    if (step < TOTAL_STEPS) {
      setStep((v) => v + 1)
      return
    }
    const result = calculateFinancialHealthScore(input)
    localStorage.setItem('mig_health_score_input', JSON.stringify(input))
    localStorage.setItem('mig_health_score_result', JSON.stringify(result))
    localStorage.setItem('mig_health_score_completed', 'true')
    navigate('/health-score/result')
  }

  const progress = Math.round((step / TOTAL_STEPS) * 100)

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 md:p-8">
        <h1 className="font-display text-3xl text-mig-white md:text-4xl">तपाईंको आर्थिक स्वास्थ्य कस्तो छ?</h1>
        <p className="mt-3 max-w-3xl text-sm text-mig-muted md:text-base">
          आम्दानी, खर्च, बचत र ऋणको आधारमा आफ्नो MIG Financial Health Score थाहा पाउनुहोस्।
        </p>
        <div className="mt-4 grid gap-3 text-sm text-mig-white/90 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">२ मिनेटमै पूरा हुन्छ</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">निजी जानकारी सुरक्षित रहन्छ</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">सुधार गर्ने स्पष्ट roadmap पाइन्छ</div>
        </div>
        {!started && (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-6 rounded-xl bg-mig-gold px-5 py-3 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
          >
            स्कोर जाँच सुरु गरौँ →
          </button>
        )}
      </motion.section>

      <AnimatePresence mode="wait">
        {started && (
          <motion.section
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-3xl p-6 md:p-8"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm text-mig-muted">Step {step}/{TOTAL_STEPS}</p>
              <div className="h-2 w-full max-w-xs rounded-full bg-white/10">
                <div className="h-full rounded-full bg-mig-gold transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {stepKey === 'income' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-mig-white">तपाईंको मासिक आम्दानी कति छ?</h2>
                <div className="grid gap-2">
                  {[
                    ['Below Rs. 20,000', 20000],
                    ['Rs. 20,000–40,000', 40000],
                    ['Rs. 40,000–70,000', 70000],
                    ['Rs. 70,000–100,000', 100000],
                    ['Above Rs. 100,000', 125000],
                  ].map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setInput((prev) => ({ ...prev, monthlyIncome: Number(value) }))}
                      className={`rounded-xl border px-4 py-3 text-left text-sm ${
                        input.monthlyIncome === Number(value)
                          ? 'border-mig-gold bg-mig-gold/10 text-mig-white'
                          : 'border-white/10 bg-white/5 text-mig-muted hover:text-mig-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="mb-1 block text-sm text-mig-muted">कस्टम आम्दानी (Rs.)</label>
                  <input
                    type="number"
                    min={0}
                    value={input.monthlyIncome ?? ''}
                    onChange={(e) => setInput((prev) => ({ ...prev, monthlyIncome: Number(e.target.value) || null }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mig-white outline-none focus:border-mig-gold"
                    placeholder="जस्तै: 55000"
                  />
                </div>
              </div>
            )}

            {stepKey === 'expense' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-mig-white">मासिक खर्च कति हुन्छ?</h2>
                <RadioOptions<ExpenseOption>
                  value={input.expenseOption}
                  options={[
                    ['lt40', 'Less than 40% of income'],
                    ['40to60', '40–60% of income'],
                    ['60to80', '60–80% of income'],
                    ['gt80', 'More than 80% of income'],
                  ]}
                  onChange={(value) => setInput((prev) => ({ ...prev, expenseOption: value }))}
                />
                <div>
                  <label className="mb-1 block text-sm text-mig-muted">कस्टम खर्च (Rs.)</label>
                  <input
                    type="number"
                    min={0}
                    value={input.monthlyExpense ?? ''}
                    onChange={(e) => setInput((prev) => ({ ...prev, monthlyExpense: Number(e.target.value) || null, expenseOption: null }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mig-white outline-none focus:border-mig-gold"
                    placeholder="जस्तै: 30000"
                  />
                </div>
              </div>
            )}

            {stepKey === 'saving' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-mig-white">मासिक बचत कति गर्नुहुन्छ?</h2>
                <RadioOptions<SavingOption>
                  value={input.savingOption}
                  options={[
                    ['none', 'No regular saving'],
                    ['lt10', 'Less than 10% of income'],
                    ['10to20', '10–20% of income'],
                    ['gt20', 'More than 20% of income'],
                  ]}
                  onChange={(value) => setInput((prev) => ({ ...prev, savingOption: value }))}
                />
                <div>
                  <label className="mb-1 block text-sm text-mig-muted">कस्टम बचत (Rs.)</label>
                  <input
                    type="number"
                    min={0}
                    value={input.monthlySaving ?? ''}
                    onChange={(e) => setInput((prev) => ({ ...prev, monthlySaving: Number(e.target.value) || null, savingOption: null }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mig-white outline-none focus:border-mig-gold"
                    placeholder="जस्तै: 8000"
                  />
                </div>
              </div>
            )}

            {stepKey === 'debt' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-mig-white">ऋण वा किस्ता कति दबाबमा छ?</h2>
                <RadioOptions<DebtOption>
                  value={input.debtLevel}
                  options={[
                    ['none', 'No debt'],
                    ['manageable', 'Manageable debt'],
                    ['sometimes_difficult', 'Sometimes difficult'],
                    ['heavy', 'Heavy debt pressure'],
                  ]}
                  onChange={(value) => setInput((prev) => ({ ...prev, debtLevel: value }))}
                />
              </div>
            )}

            {stepKey === 'emergency' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-mig-white">Emergency fund छ?</h2>
                <RadioOptions<EmergencyOption>
                  value={input.emergencyFund}
                  options={[
                    ['none', 'No emergency fund'],
                    ['lt1', 'Less than 1 month expense'],
                    ['1to3', '1–3 months expense'],
                    ['gt3', 'More than 3 months expense'],
                  ]}
                  onChange={(value) => setInput((prev) => ({ ...prev, emergencyFund: value }))}
                />
              </div>
            )}

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => (step === 1 ? setStarted(false) : setStep((v) => Math.max(1, v - 1)))}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-mig-muted hover:text-mig-white"
              >
                फर्कनुहोस्
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="rounded-xl bg-mig-gold px-5 py-2.5 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
              >
                {step === TOTAL_STEPS ? 'स्कोर जाँच गरौँ' : 'अगाडि बढौँ'}
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

type OptionTuple<T extends string> = [T, string]

function RadioOptions<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T | null
  options: OptionTuple<T>[]
  onChange: (value: T) => void
}) {
  return (
    <div className="grid gap-2">
      {options.map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`rounded-xl border px-4 py-3 text-left text-sm ${
            value === key
              ? 'border-mig-gold bg-mig-gold/10 text-mig-white'
              : 'border-white/10 bg-white/5 text-mig-muted hover:text-mig-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
