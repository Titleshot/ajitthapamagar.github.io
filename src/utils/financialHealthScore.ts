export type SavingOption = 'none' | 'lt10' | '10to20' | 'gt20'
export type ExpenseOption = 'lt40' | '40to60' | '60to80' | 'gt80'
export type DebtOption = 'none' | 'manageable' | 'sometimes_difficult' | 'heavy'
export type EmergencyOption = 'none' | 'lt1' | '1to3' | 'gt3'

export type FinancialHealthInput = {
  monthlyIncome: number | null
  monthlyExpense: number | null
  monthlySaving: number | null
  savingOption: SavingOption | null
  expenseOption: ExpenseOption | null
  debtLevel: DebtOption | null
  emergencyFund: EmergencyOption | null
}

export type FinancialHealthResult = {
  totalScore: number
  category: string
  breakdown: {
    saving: { points: number; label: string; explanation: string }
    expenseControl: { points: number; label: string; explanation: string }
    debtPressure: { points: number; label: string; explanation: string }
    emergencyFund: { points: number; label: string; explanation: string }
    incomeBase: { points: number; label: string; explanation: string }
  }
  strengths: string[]
  risks: string[]
  roadmap: string[]
}

function mapSavingOption(input: FinancialHealthInput): SavingOption {
  if (input.savingOption) return input.savingOption
  if (input.monthlyIncome && input.monthlyIncome > 0 && input.monthlySaving !== null) {
    const ratio = (input.monthlySaving / input.monthlyIncome) * 100
    if (ratio < 10) return 'lt10'
    if (ratio <= 20) return '10to20'
    return 'gt20'
  }
  return 'none'
}

function mapExpenseOption(input: FinancialHealthInput): ExpenseOption {
  if (input.expenseOption) return input.expenseOption
  if (input.monthlyIncome && input.monthlyIncome > 0 && input.monthlyExpense !== null) {
    const ratio = (input.monthlyExpense / input.monthlyIncome) * 100
    if (ratio < 40) return 'lt40'
    if (ratio <= 60) return '40to60'
    if (ratio <= 80) return '60to80'
    return 'gt80'
  }
  return 'gt80'
}

function categoryFromScore(totalScore: number) {
  if (totalScore <= 30) return 'जोखिम क्षेत्र'
  if (totalScore <= 50) return 'सुधार आवश्यक'
  if (totalScore <= 70) return 'ठिक तर सुधार गर्न सकिने'
  if (totalScore <= 85) return 'स्वस्थ आर्थिक बानी'
  return 'बलियो आर्थिक स्थिति'
}

export function calculateFinancialHealthScore(input: FinancialHealthInput): FinancialHealthResult {
  const savingOption = mapSavingOption(input)
  const expenseOption = mapExpenseOption(input)

  const savingMap: Record<SavingOption, { points: number; explanation: string }> = {
    none: { points: 0, explanation: 'नियमित बचत सुरु गर्न आवश्यक छ।' },
    lt10: { points: 10, explanation: 'बचत राम्रो सुरुवात हो, अझ बढाउन सकिन्छ।' },
    '10to20': { points: 20, explanation: 'सन्तुलित बचत भइरहेको छ।' },
    gt20: { points: 30, explanation: 'मजबुत बचत बानी देखिन्छ।' },
  }
  const expenseMap: Record<ExpenseOption, { points: number; explanation: string }> = {
    lt40: { points: 25, explanation: 'खर्च नियन्त्रण उत्कृष्ट छ।' },
    '40to60': { points: 20, explanation: 'खर्च र आम्दानीको सन्तुलन ठिक छ।' },
    '60to80': { points: 10, explanation: 'खर्च घटाउने ठाउँ छ।' },
    gt80: { points: 3, explanation: 'खर्च आम्दानीको धेरै भागमा छ।' },
  }
  const debtMap: Record<DebtOption, { points: number; explanation: string }> = {
    none: { points: 20, explanation: 'ऋण दबाब छैन, यो सकारात्मक संकेत हो।' },
    manageable: { points: 15, explanation: 'ऋण व्यवस्थापनमा छ।' },
    sometimes_difficult: { points: 7, explanation: 'कहिलेकाहीँ ऋणले दबाब दिन्छ।' },
    heavy: { points: 0, explanation: 'ऋण दबाब धेरै छ, योजना आवश्यक छ।' },
  }
  const emergencyMap: Record<EmergencyOption, { points: number; explanation: string }> = {
    none: { points: 0, explanation: 'Emergency fund सुरु गर्नुपर्ने अवस्था छ।' },
    lt1: { points: 5, explanation: 'Emergency fund छ तर कमजोर छ।' },
    '1to3': { points: 10, explanation: 'Emergency fund राम्रो दिशामा छ।' },
    gt3: { points: 15, explanation: 'Emergency fund मजबुत छ।' },
  }

  const saving = savingMap[savingOption]
  const expense = expenseMap[expenseOption]
  const debt = debtMap[input.debtLevel ?? 'heavy']
  const emergency = emergencyMap[input.emergencyFund ?? 'none']
  const incomePoints = input.monthlyIncome && input.monthlyIncome > 0 ? 10 : 0

  const totalScore = saving.points + expense.points + debt.points + emergency.points + incomePoints
  const category = categoryFromScore(totalScore)

  const strengths: string[] = []
  const risks: string[] = []

  if (saving.points >= 20) strengths.push('तपाईं नियमित बचत गर्दै हुनुहुन्छ')
  else risks.push('मासिक बचत दर बढाउन आवश्यक छ')

  if (expense.points >= 20) strengths.push('खर्च नियन्त्रण सन्तुलित छ')
  else risks.push('खर्च आम्दानीको धेरै भागमा छ')

  if (debt.points >= 15) strengths.push('ऋण दबाब नियन्त्रणमा छ')
  else risks.push('ऋण व्यवस्थापनमा ध्यान दिन आवश्यक छ')

  if (emergency.points >= 10) strengths.push('Emergency fund तयार हुँदैछ')
  else risks.push('Emergency fund कमजोर छ')

  if (incomePoints === 10) strengths.push('आम्दानी आधार स्पष्ट छ')
  else risks.push('आम्दानी विवरण अद्यावधिक गर्नुहोस्')

  const roadmap = [
    'पहिलो हप्ता: खर्च लेख्न सुरु गर्नुहोस्',
    'दोस्रो हप्ता: अनावश्यक खर्च १०% घटाउनुहोस्',
    'तेस्रो हप्ता: Emergency fund सुरु गर्नुहोस्',
    'चौथो हप्ता: कम्तिमा १०% बचत गर्ने लक्ष्य बनाउनुहोस्',
  ]

  return {
    totalScore,
    category,
    breakdown: {
      saving: { points: saving.points, label: 'बचत', explanation: saving.explanation },
      expenseControl: { points: expense.points, label: 'खर्च नियन्त्रण', explanation: expense.explanation },
      debtPressure: { points: debt.points, label: 'ऋण दबाब', explanation: debt.explanation },
      emergencyFund: { points: emergency.points, label: 'Emergency fund', explanation: emergency.explanation },
      incomeBase: {
        points: incomePoints,
        label: 'आम्दानी आधार',
        explanation: incomePoints === 10 ? 'आम्दानी विवरण उपलब्ध छ।' : 'आम्दानी विवरण आवश्यक छ।',
      },
    },
    strengths,
    risks,
    roadmap,
  }
}
