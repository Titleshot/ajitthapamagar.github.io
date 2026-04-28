export type Lesson = {
  id: string
  chapterNumber: number
  title: string
  slug: string
  description: string
  goal: string
  content: string
  keyTakeaways: string[]
  example: string
  estimatedMinutes: number
  videoUrl?: string | null
  pointsReward: number
}

type LocalizedLessonOverrides = {
  title: string
  description: string
  goal: string
  content: string
  example: string
  keyTakeaways: string[]
}

/** Structured for future i18n (e.g. ne-NP strings). */
export const LESSONS: Lesson[] = [
  {
    id: 'ch1',
    chapterNumber: 1,
    title: 'Understanding Money and Financial Discipline',
    slug: 'money-mindset',
    description: 'Money Mindset — build the foundation for how you think about earning, saving, and growing.',
    goal: 'Understand that money is for planning, protection, growth, and freedom — not only spending.',
    content: `Money is a tool. It can create comfort, security, opportunity, and dignity when managed wisely. But without financial discipline, even a good income can disappear quickly.

Many people think financial success comes only from earning more. But the truth is, financial success comes from how much you earn, how much you save, how wisely you spend, how carefully you invest, and how well you protect yourself from risk.

A person earning Rs. 30,000 per month but saving Rs. 5,000 regularly may become financially stronger than someone earning Rs. 80,000 but spending everything.

Financial discipline starts with one habit: spend less than you earn.`,
    keyTakeaways: [
      'Money must be managed, not just earned.',
      'Small savings become powerful over time.',
      'Financial discipline is more important than high income.',
      'Wealth begins with mindset.',
    ],
    example: `Ram earns Rs. 40,000 per month. Every month, he spends everything on food, clothes, mobile recharge, entertainment, and unnecessary purchases.

Sita earns Rs. 35,000 per month. She saves Rs. 5,000 every month and keeps records of her expenses.

After one year: Ram has no savings. Sita has Rs. 60,000 saved.

Sita is financially stronger even though Ram earns more.`,
    estimatedMinutes: 12,
    videoUrl: null,
    pointsReward: 20,
  },
  {
    id: 'ch2',
    chapterNumber: 2,
    title: 'The Power of Saving',
    slug: 'saving-basics',
    description: 'Saving Basics — security, opportunity, and the habit of paying yourself first.',
    goal: 'Learn how regular saving creates security and opportunity.',
    content: `Saving means keeping a portion of income for future use. Saving protects us from emergencies and gives us the power to take opportunities.

Many people wait to save after spending. But successful people save first and spend later.

The better formula is: Income – Saving = Expense — not Income – Expense = Saving.

Even saving Rs. 100 per day becomes Rs. 3,000 per month and Rs. 36,000 per year.

Savings can help during medical emergencies, job loss, business opportunities, children's education, family needs, and investment opportunities.`,
    keyTakeaways: [
      'Save first, spend later.',
      'Small savings matter.',
      'Emergency savings protect families.',
      'Saving creates confidence.',
    ],
    example: `If a member saves Rs. 2,000 every month: 1 year = Rs. 24,000; 5 years = Rs. 120,000; 10 years = Rs. 240,000.

Without even investing, regular saving creates financial strength.`,
    estimatedMinutes: 10,
    videoUrl: null,
    pointsReward: 20,
  },
  {
    id: 'ch3',
    chapterNumber: 3,
    title: 'How to Make a Monthly Budget',
    slug: 'budgeting',
    description: 'Budgeting — a simple plan so your money works for you, not against you.',
    goal: 'Control spending using a simple monthly budget.',
    content: `A budget is a plan for money. It tells us where our income should go before we spend it. Without a budget, money disappears silently.

A simple monthly budget can follow: 50% needs, 30% wants, 20% savings/investment.

Needs include food, rent, education, transport, and medicine. Wants include entertainment, new clothes, eating outside, and unnecessary shopping.

Savings/investment includes emergency fund, bank saving, cooperative saving, investment, and business capital.`,
    keyTakeaways: [
      'Budgeting gives control.',
      'Needs and wants are different.',
      'Saving should be planned.',
      'A budget reduces stress.',
    ],
    example: `Monthly income: Rs. 50,000. Budget: Needs Rs. 25,000; Wants Rs. 15,000; Savings/investment Rs. 10,000. This creates control and discipline.`,
    estimatedMinutes: 11,
    videoUrl: null,
    pointsReward: 20,
  },
  {
    id: 'ch4',
    chapterNumber: 4,
    title: 'Understanding Good Debt and Bad Debt',
    slug: 'debt-loans',
    description: 'Debt & Loans — use credit to grow, not to show off.',
    goal: 'Use loans wisely and know the difference between productive and harmful debt.',
    content: `Debt means borrowed money that must be repaid. Loans can help us grow, but they can also create stress if misused.

Good debt helps build income or long-term value: education loan, business loan, productive farming loan, home loan.

Bad debt is used for unnecessary spending: borrowing for luxury items, parties, showing off, or without a repayment plan.

Before taking a loan, ask: Why do I need this loan? Can this loan increase my income? Can I repay monthly? What is the interest rate? What happens if I delay payment?`,
    keyTakeaways: [
      'Not all debt is bad.',
      'Loans should be used carefully.',
      'Always check interest rate.',
      'Borrowing for show-off is dangerous.',
    ],
    example: `A small business loan used to buy reliable equipment can increase income. A high-interest loan for a festival shopping spree adds stress without building value.`,
    estimatedMinutes: 12,
    videoUrl: null,
    pointsReward: 20,
  },
  {
    id: 'ch5',
    chapterNumber: 5,
    title: 'Using Banks and Financial Institutions Safely',
    slug: 'banking',
    description: 'Banking — accounts, records, and protecting yourself from fraud.',
    goal: 'Use banks, cooperatives, and financial services responsibly.',
    content: `Banks and financial institutions help people save, borrow, transfer, and protect money.

Common services include savings account, fixed deposit, loan, ATM card, mobile banking, remittance, insurance, and digital payment.

A bank account helps keep money safe and creates financial records. Records are useful when applying for loans, visas, business support, or investment opportunities.

Members must be careful: never share OTP or PIN, use strong passwords, check bank statements, and avoid unknown links.`,
    keyTakeaways: [
      'Banks help protect and manage money.',
      'Financial records are important.',
      'Never share OTP or PIN.',
      'Mobile banking must be used carefully.',
    ],
    example: `Keeping a savings passbook and digital statements helped a member prove income history when applying for a cooperative business loan.`,
    estimatedMinutes: 10,
    videoUrl: null,
    pointsReward: 20,
  },
  {
    id: 'ch6',
    chapterNumber: 6,
    title: 'Mobile Banking, Wallets, and Digital Payments',
    slug: 'digital-finance',
    description: 'Digital Finance — speed and convenience with strong safety habits.',
    goal: 'Use digital finance safely and verify every transfer.',
    content: `Digital finance means using technology to manage money: mobile banking, digital wallets, QR payments, online transfers, and digital receipts.

Benefits include saving time, easy payments, fast transfers, clear records, and less need to carry cash.

Risks include scams, fake links, wrong transfers, password theft, and fake customer support calls.

Safety rules: check receiver name before sending; never click unknown links; never share OTP; use app lock; keep screenshots/receipts; report suspicious transactions quickly.`,
    keyTakeaways: [
      'Digital finance is useful but needs caution.',
      'Always verify before sending money.',
      'Digital records help tracking.',
      'Scams can be avoided with awareness.',
    ],
    example: `Before sending school fees by mobile banking, verify the school's official account name character-by-character — many scams use similar-looking names.`,
    estimatedMinutes: 11,
    videoUrl: null,
    pointsReward: 20,
  },
  {
    id: 'ch7',
    chapterNumber: 7,
    title: 'What is Investment?',
    slug: 'investment-basics',
    description: 'Investment Basics — growing money over time with clear eyes on risk.',
    goal: 'Know the difference between saving and investing and how to evaluate opportunities.',
    content: `Saving means keeping money safe. Investing means using money to grow more money over time.

Examples include fixed deposit, shares, mutual funds, business, land, skills, education, agriculture, and cooperative investment.

Investment can grow wealth, but every investment has risk. Before investing, ask: Do I understand this? What is the risk and return? Is this legal and verified? Can I afford to lose some money? Is this short-term or long-term?

Never invest only because someone promised quick profit.`,
    keyTakeaways: [
      'Investment helps money grow.',
      'Every investment has risk.',
      'Understand before investing.',
      'Avoid quick-rich promises.',
    ],
    example: `A member started with a small recurring deposit while learning; later, with guidance, they explored diversified options — patience and education came first.`,
    estimatedMinutes: 12,
    videoUrl: null,
    pointsReward: 20,
  },
  {
    id: 'ch8',
    chapterNumber: 8,
    title: 'Protecting Yourself from Financial Scams',
    slug: 'risk-scams',
    description: 'Risk & Scams — spot red flags before money leaves your account.',
    goal: 'Recognize fraud patterns and respond safely.',
    content: `Financial scams are increasing through phone calls, social media, fake investment groups, fake apps, and fake agents.

Common scam signs: guaranteed high return, no-risk promise, pressure to invest quickly, asking for OTP/PIN, fake lottery prizes, unknown links, no legal registration, no written proof.

Safe behavior: verify company registration, ask for documents, talk with trusted people, never rush, never share private details, report fraud early.`,
    keyTakeaways: [
      'Scams often promise quick money.',
      'No investment is risk-free.',
      'Verification is important.',
      'Never share OTP or PIN.',
    ],
    example: `A “double your money in 7 days” group on social media had no registration — members who verified with regulators avoided the loss.`,
    estimatedMinutes: 11,
    videoUrl: null,
    pointsReward: 20,
  },
  {
    id: 'ch9',
    chapterNumber: 9,
    title: 'How to Think Like a Small Business Owner',
    slug: 'business-thinking',
    description: 'Business Thinking — value, costs, and trust with your customers.',
    goal: 'Apply a simple profit mindset: solve problems, track money, reinvest wisely.',
    content: `Business is not only about selling products. Business means solving problems and creating value.

A good business starts with a real customer problem, a useful product or service, clear pricing, cost control, trust, and consistency.

Basic business formula: Profit = Revenue – Cost.

To improve business: reduce waste, improve packaging, build customer trust, track expenses, reinvest profit.`,
    keyTakeaways: [
      'Business solves problems.',
      'Profit is revenue minus cost.',
      'Expense tracking is important.',
      'Trust builds repeat customers.',
    ],
    example: `A member sells homemade snacks: monthly sales Rs. 50,000, monthly cost Rs. 35,000, profit Rs. 15,000. Tracking flour and fuel costs revealed small leaks to fix.`,
    estimatedMinutes: 10,
    videoUrl: null,
    pointsReward: 20,
  },
  {
    id: 'ch10',
    chapterNumber: 10,
    title: 'Building Long-Term Financial Strength',
    slug: 'wealth-building',
    description: 'Wealth Building — systems, patience, and protection for the long road.',
    goal: 'See the full path: earn, track, save, invest, insure, skill-up, think long-term.',
    content: `Wealth is not built in one day. It is built through discipline, patience, learning, saving, investing, and avoiding major mistakes.

The wealth-building path: earn income; track expenses; save regularly; build emergency fund; avoid bad debt; invest wisely; protect with insurance; build skills; create extra income; think long-term.

A financially strong person has a system to manage money for the future — not only money today.`,
    keyTakeaways: [
      'Wealth needs patience.',
      'Emergency fund is important.',
      'Skills are also investment.',
      'Long-term thinking creates stability.',
    ],
    example: `Three years of small monthly investments plus skill training led to higher income — the combination mattered more than any single “lucky” trade.`,
    estimatedMinutes: 12,
    videoUrl: null,
    pointsReward: 20,
  },
]

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id)
}

export const CHAPTER_TITLES = LESSONS.map((l) => l.title)

const NEPALI_LESSON_OVERRIDES: Record<string, LocalizedLessonOverrides> = {
  ch1: {
    title: 'पैसा र आर्थिक अनुशासन बुझ्ने तरिका',
    description: 'मनी माइन्डसेट — आम्दानी, बचत र वृद्धि कसरी सोच्ने भन्ने आधार।',
    goal: 'पैसा केवल खर्चका लागि होइन, योजना, सुरक्षा, वृद्धि र स्वतन्त्रताका लागि पनि हो भन्ने बुझ्नु।',
    content: `पैसा एउटा साधन हो। सही तरिकाले प्रयोग गर्न सके यसले सुविधा, सुरक्षा, अवसर र सम्मान दिन्छ। तर आर्थिक अनुशासन नभए राम्रो आम्दानी पनि छिट्टै सकिन सक्छ।

धेरैलाई आर्थिक सफलता भनेको बढी कमाउनु मात्रै हो भन्ने लाग्छ। तर वास्तविकता के हो भने सफलता तपाईंले कति कमाउनुहुन्छ भन्ने मात्र होइन, कति बचत गर्नुहुन्छ, कति बुद्धिमानीपूर्वक खर्च गर्नुहुन्छ, कति सावधानीपूर्वक लगानी गर्नुहुन्छ र जोखिमबाट आफूलाई कति जोगाउनुहुन्छ भन्नेमा निर्भर हुन्छ।

जसले मासिक ३०,००० कमाएर नियमित ५,००० बचत गर्छ, त्यो व्यक्ति ८०,००० कमाएर सबै खर्च गर्ने व्यक्तिभन्दा आर्थिक रूपमा बलियो हुन सक्छ।

आर्थिक अनुशासनको पहिलो नियम हो: आम्दानीभन्दा कम खर्च गर्नु।`,
    example: `राम मासिक रु. ४०,००० कमाउँछन्। तर हरेक महिना खाना, कपडा, मोबाइल रिचार्ज, मनोरञ्जन र अनावश्यक किनमेलमा सबै खर्च गर्छन्।

सीता मासिक रु. ३५,००० कमाउँछिन्। उनी हरेक महिना रु. ५,००० बचत गर्छिन् र खर्चको रेकर्ड राख्छिन्।

एक वर्षपछि:
रामसँग बचत छैन।
सीतासँग रु. ६०,००० बचत छ।

रामले बढी कमाए पनि सीता आर्थिक रूपमा बलियो छिन्।`,
    keyTakeaways: [
      'पैसा कमाउनु मात्र होइन, व्यवस्थापन गर्नु आवश्यक छ।',
      'सानो बचत पनि समयसँगै ठूलो हुन्छ।',
      'उच्च आम्दानीभन्दा आर्थिक अनुशासन बढी महत्त्वपूर्ण छ।',
      'सम्पत्तिको सुरुवात सोचबाट हुन्छ।',
    ],
  },
  ch2: {
    title: 'बचतको शक्ति',
    description: 'बचत आधारभूत ज्ञान — सुरक्षा, अवसर र पहिले बचत गर्ने बानी।',
    goal: 'नियमित बचतले सुरक्षा र अवसर कसरी बनाउँछ भन्ने सिक्नु।',
    content: `बचत भनेको आम्दानीको केही भाग भविष्यका लागि छुट्याउनु हो। बचतले आकस्मिक अवस्थामा सुरक्षा दिन्छ र अवसर समात्न मद्दत गर्छ।

धेरैले खर्चपछि बाँकी भएको रकम बचत गर्छन्। सफल व्यक्तिहरू भने पहिले बचत गर्छन् र त्यसपछि खर्च योजना बनाउँछन्।

ठिक सूत्र हो: आम्दानी – बचत = खर्च।

रु. १०० दैनिक बचतले पनि महिनामा रु. ३,००० र वर्षमा रु. ३६,००० हुन्छ।`,
    example: `यदि कुनै सदस्यले हरेक महिना रु. २,००० बचत गर्छ भने:
१ वर्षमा रु. २४,०००
५ वर्षमा रु. १,२०,०००
१० वर्षमा रु. २,४०,०००`,
    keyTakeaways: ['पहिले बचत, पछि खर्च।', 'सानो बचत पनि महत्त्वपूर्ण हुन्छ।', 'आकस्मिक बचतले परिवार जोगाउँछ।', 'बचतले आत्मविश्वास बढाउँछ।'],
  },
  ch3: {
    title: 'मासिक बजेट कसरी बनाउने',
    description: 'बजेटिङ — पैसालाई योजना अनुसार चलाउने सरल तरिका।',
    goal: 'सरल मासिक बजेट प्रयोग गरेर खर्च नियन्त्रण गर्न सिक्नु।',
    content: `बजेट भनेको पैसाको योजना हो। यसले खर्च गर्नु अघि आम्दानी कहाँ जाने भनेर देखाउँछ।

५०/३०/२० नियम उपयोगी हुन्छ:
५०% आवश्यक
३०% चाहना
२०% बचत/लगानी`,
    example: `मासिक आम्दानी रु. ५०,०००:
आवश्यक रु. २५,०००
चाहना रु. १५,०००
बचत/लगानी रु. १०,०००`,
    keyTakeaways: ['बजेटले नियन्त्रण दिन्छ।', 'आवश्यक र चाहना फरक छन्।', 'बचत योजना अनुसार हुनुपर्छ।', 'बजेटले तनाव घटाउँछ।'],
  },
  ch4: {
    title: 'सही ऋण र गलत ऋण बुझ्नुहोस्',
    description: 'ऋण तथा कर्जा — देखावा होइन, वृद्धि लागि प्रयोग गर्नुहोस्।',
    goal: 'ऋणलाई बुद्धिमानीले प्रयोग गर्न र सही/गलत ऋण छुट्याउन सिक्नु।',
    content: `ऋण भनेको फिर्ता गर्नुपर्ने उधारो पैसा हो। सही तरिकाले प्रयोग गरे वृद्धि हुन्छ, गलत प्रयोगले तनाव बढ्छ।

सही ऋणले आम्दानी वा दीर्घकालीन मूल्य बढाउँछ। गलत ऋण अनावश्यक खर्चका लागि लिइन्छ।`,
    example: `उत्पादन बढाउने व्यवसायिक ऋण उपयोगी हुन्छ। महँगो चाडपर्व खर्चका लागि लिएको ऋण जोखिमपूर्ण हुन्छ।`,
    keyTakeaways: ['सबै ऋण खराब हुँदैन।', 'ऋण सावधानीपूर्वक प्रयोग गर्नुपर्छ।', 'ब्याजदर अवश्य जाँच्नुपर्छ।', 'देखावाका लागि ऋण खतरनाक हुन्छ।'],
  },
  ch5: {
    title: 'बैंक र वित्तीय संस्थाको सुरक्षित प्रयोग',
    description: 'बैंकिङ — खाता, वित्तीय रेकर्ड र सुरक्षा।',
    goal: 'बैंक, सहकारी र वित्तीय सेवाहरू जिम्मेवार तरिकाले प्रयोग गर्न सिक्नु।',
    content: `बैंक र वित्तीय संस्थाले बचत, ऋण, स्थानान्तरण र सुरक्षामा मद्दत गर्छन्।

OTP/PIN कहिल्यै साझा नगर्नुहोस्, बलियो पासवर्ड प्रयोग गर्नुहोस्, र विवरण नियमित जाँच्नुहोस्।`,
    example: `सही बैंक रेकर्डले भविष्यमा ऋण स्वीकृति र विश्वास बढाउन मद्दत गर्छ।`,
    keyTakeaways: ['बैंकले पैसा सुरक्षित राख्छ।', 'वित्तीय रेकर्ड महत्त्वपूर्ण हुन्छ।', 'OTP/PIN साझा नगर्नुहोस्।', 'मोबाइल बैंकिङ सावधानीपूर्वक प्रयोग गर्नुहोस्।'],
  },
  ch6: {
    title: 'मोबाइल बैंकिङ, वालेट र डिजिटल भुक्तानी',
    description: 'डिजिटल फाइनान्स — सजिलो र सुरक्षित प्रयोगका नियम।',
    goal: 'डिजिटल वित्तीय सेवाहरू सुरक्षित र बुद्धिमानीले प्रयोग गर्न सिक्नु।',
    content: `डिजिटल फाइनान्सले समय बचत गर्छ, भुक्तानी छिटो हुन्छ, र रेकर्ड स्पष्ट रहन्छ।

तर गलत लिंक, ठगी कल र गलत ट्रान्सफरबाट बच्न आवश्यक छ।`,
    example: `भुक्तानी पठाउनु अघि प्राप्तकर्ताको नाम दोहोरो जाँच्दा धेरै गल्ती र ठगी रोक्न सकिन्छ।`,
    keyTakeaways: ['डिजिटल फाइनान्स उपयोगी छ तर सावधानी चाहिन्छ।', 'पठाउनु अघि नाम जाँच्नुहोस्।', 'डिजिटल रेकर्ड उपयोगी हुन्छ।', 'सचेतना ठगी रोक्ने मुख्य उपाय हो।'],
  },
  ch7: {
    title: 'लगानी भनेको के हो?',
    description: 'लगानी आधारभूत ज्ञान — जोखिम बुझ्दै दीर्घकालीन वृद्धि।',
    goal: 'बचत र लगानीको फरक बुझ्न र अवसर मूल्यांकन गर्न सिक्नु।',
    content: `बचतले पैसा सुरक्षित राख्छ, लगानीले समयसँगै पैसा बढाउन मद्दत गर्छ।

हरेक लगानीमा जोखिम हुन्छ। बुझेर मात्र लगानी गर्नुहोस्, छिटो नाफाको आश्वासनलाई अन्धाधुन्ध विश्वास नगर्नुहोस्।`,
    example: `सानो बचतबाट सुरु गरेर ज्ञान बढेसँगै विविध लगानीमा जाने बानी दीर्घकालीन रूपमा राम्रो हुन्छ।`,
    keyTakeaways: ['लगानीले धन वृद्धि गर्छ।', 'हरेक लगानीमा जोखिम हुन्छ।', 'लगानी अघि बुझ्नुपर्छ।', 'छिटो धनी बनाउने आश्वासनबाट बच्नुहोस्।'],
  },
  ch8: {
    title: 'आर्थिक ठगीबाट कसरी जोगिने',
    description: 'जोखिम र स्क्याम — चेतावनी संकेत चिन्नुहोस्।',
    goal: 'ठगीका ढाँचा पहिचान गरेर सुरक्षित प्रतिक्रिया दिन सिक्नु।',
    content: `फोन, सामाजिक सञ्जाल, नक्कली एप र नक्कली समूहमार्फत आर्थिक ठगी बढिरहेको छ।

अत्यधिक नाफा, शून्य जोखिम, तुरुन्त लगानी दबाब, OTP/PIN माग्ने जस्ता संकेत ठगी हुन सक्छन्।`,
    example: `दर्ता नभएको समूहमा लगानी नगरी पहिले प्रमाण जाँच गर्दा धेरै सदस्यहरूले घाटाबाट जोगिएका छन्।`,
    keyTakeaways: ['ठगीले छिटो नाफाको लोभ देखाउँछ।', 'जोखिमरहित लगानी हुँदैन।', 'जाँच र प्रमाण आवश्यक छ।', 'OTP/PIN साझा नगर्नुहोस्।'],
  },
  ch9: {
    title: 'सानो व्यवसायी जस्तो सोच्ने तरिका',
    description: 'व्यवसाय सोच — मूल्य, लागत र ग्राहक विश्वास।',
    goal: 'नाफाको आधारभूत सोच लागू गरेर व्यवसाय सुधार गर्न सिक्नु।',
    content: `व्यवसाय भनेको समस्या समाधान गर्दै मूल्य सिर्जना गर्नु हो।

नाफा = आम्दानी – लागत। खर्च ट्र्याकिङ र पुनः लगानीले व्यवसाय बलियो बनाउँछ।`,
    example: `बिक्री राम्रो भए पनि लागत नट्र्याक गर्दा नाफा घट्न सक्छ; नियमित रेकर्डले सुधार सम्भव बनाउँछ।`,
    keyTakeaways: ['व्यवसायले समस्या समाधान गर्छ।', 'नाफा = आम्दानी – लागत।', 'खर्च ट्र्याकिङ आवश्यक छ।', 'विश्वासले पुनः ग्राहक ल्याउँछ।'],
  },
  ch10: {
    title: 'दीर्घकालीन आर्थिक मजबुती निर्माण',
    description: 'सम्पत्ति निर्माण — प्रणाली, धैर्य र दीर्घकालीन सोच।',
    goal: 'कमाइ, बचत, लगानी र सुरक्षा सहित दीर्घकालीन मार्ग बुझ्नु।',
    content: `सम्पत्ति एकै दिनमा बन्दैैन। अनुशासन, धैर्य, सिकाइ, बचत, लगानी र गल्तीबाट बचेर बिस्तारै निर्माण हुन्छ।

दीर्घकालीन सोच, आपतकालीन कोष, र सीप विकासले आर्थिक स्थिरता दिन्छ।`,
    example: `नियमित सानो लगानी र सीप विकासलाई जोड्दा केही वर्षपछि आम्दानी तथा स्थिरता दुवै बढ्न सक्छ।`,
    keyTakeaways: ['सम्पत्ति बनाउन धैर्य चाहिन्छ।', 'आपतकालीन कोष महत्त्वपूर्ण छ।', 'सीप पनि लगानी हो।', 'दीर्घकालीन सोचले स्थिरता दिन्छ।'],
  },
}

export function getLocalizedLesson(lesson: Lesson, language: 'en' | 'ne'): Lesson {
  if (language === 'en') return lesson
  const override = NEPALI_LESSON_OVERRIDES[lesson.id]
  if (!override) return lesson
  return {
    ...lesson,
    ...override,
  }
}
