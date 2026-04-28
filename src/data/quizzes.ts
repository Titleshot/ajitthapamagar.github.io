export type QuizQuestion = {
  id: string
  question: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: string
}

export const QUIZZES: Record<string, QuizQuestion[]> = {
  ch1: [
    {
      id: 'ch1-q1',
      question: 'What is the first rule of financial discipline?',
      options: [
        'Spend more than income',
        'Spend less than income',
        'Borrow every month',
        'Avoid saving',
      ],
      correctIndex: 1,
      explanation: 'Spending less than you earn is the foundation of sustainable finances.',
    },
    {
      id: 'ch1-q2',
      question: 'Who is financially stronger?',
      options: [
        'Person who earns more but saves nothing',
        'Person who earns less but saves regularly',
        'Person who spends everything',
        'Person who avoids planning',
      ],
      correctIndex: 1,
      explanation: 'Regular saving builds a buffer and options — income alone is not enough.',
    },
    {
      id: 'ch1-q3',
      question: 'Money should be used for:',
      options: ['Spending only', 'Gambling only', 'Planning, saving, protection, and growth', 'Showing off'],
      correctIndex: 2,
      explanation: 'Money works best when it supports planning, security, and growth.',
    },
  ],
  ch2: [
    {
      id: 'ch2-q1',
      question: 'Which formula is better?',
      options: ['Income – Expense = Saving', 'Income – Saving = Expense', 'Income = Expense', 'Saving = Debt'],
      correctIndex: 1,
      explanation: 'Pay yourself first: set savings aside, then plan expenses.',
    },
    {
      id: 'ch2-q2',
      question: 'Saving Rs. 2,000 monthly becomes how much in one year?',
      options: ['Rs. 12,000', 'Rs. 24,000', 'Rs. 50,000', 'Rs. 5,000'],
      correctIndex: 1,
      explanation: '2,000 × 12 = 24,000.',
    },
    {
      id: 'ch2-q3',
      question: 'Saving helps during emergencies.',
      options: ['True', 'False', 'Only for businesses', 'Only with a loan'],
      correctIndex: 0,
      explanation: 'Emergency savings reduce stress when shocks happen.',
    },
  ],
  ch3: [
    {
      id: 'ch3-q1',
      question: 'What is a budget?',
      options: ['A money plan', 'A loan', 'A tax', 'A reward'],
      correctIndex: 0,
      explanation: 'A budget allocates income intentionally before spending.',
    },
    {
      id: 'ch3-q2',
      question: 'In the 50/30/20 rule, 20% is for:',
      options: ['Wants', 'Savings/investment', 'Rent only', 'Entertainment'],
      correctIndex: 1,
      explanation: 'Twenty percent supports savings and investments.',
    },
    {
      id: 'ch3-q3',
      question: 'Food and medicine are:',
      options: ['Wants', 'Needs', 'Luxuries', 'Bonuses'],
      correctIndex: 1,
      explanation: 'Essential needs come first in a healthy budget.',
    },
  ],
  ch4: [
    {
      id: 'ch4-q1',
      question: 'Good debt helps:',
      options: ['Increase income or value', 'Create unnecessary spending', 'Avoid repayment', 'Hide income'],
      correctIndex: 0,
      explanation: 'Productive debt can build assets or earning power.',
    },
    {
      id: 'ch4-q2',
      question: 'Borrowing for luxury show-off is:',
      options: ['Good debt', 'Bad debt', 'Free money', 'Always safe'],
      correctIndex: 1,
      explanation: 'Debt for status spending often weakens finances.',
    },
    {
      id: 'ch4-q3',
      question: 'Before taking a loan, you should check interest rate.',
      options: ['True', 'False', 'Only for cars', 'Only abroad'],
      correctIndex: 0,
      explanation: 'Interest and fees determine affordability.',
    },
  ],
  ch5: [
    {
      id: 'ch5-q1',
      question: 'OTP should be shared with:',
      options: ['Anyone', 'Only trusted friends', 'No one', 'Bank posters'],
      correctIndex: 2,
      explanation: 'OTP is a private credential — never share it.',
    },
    {
      id: 'ch5-q2',
      question: 'Bank records can help in future financial activities.',
      options: ['True', 'False', 'Only overseas', 'Only for cash'],
      correctIndex: 0,
      explanation: 'Statements support trust and verification.',
    },
    {
      id: 'ch5-q3',
      question: 'Mobile banking password should be:',
      options: ['Easy and public', 'Strong and private', 'Shared monthly', 'Written on the phone case'],
      correctIndex: 1,
      explanation: 'Strong, private credentials protect your account.',
    },
  ],
  ch6: [
    {
      id: 'ch6-q1',
      question: 'Before sending digital payment, you should check:',
      options: ['Receiver name', 'Weather', 'Social media', 'Random links'],
      correctIndex: 0,
      explanation: 'Verify recipient details carefully.',
    },
    {
      id: 'ch6-q2',
      question: 'Unknown payment links are always safe.',
      options: ['True', 'False', 'Only at night', 'Only on Wi‑Fi'],
      correctIndex: 1,
      explanation: 'Unknown links are a common scam vector.',
    },
    {
      id: 'ch6-q3',
      question: 'Digital receipts help track money.',
      options: ['True', 'False', 'Only for shops', 'Only for banks'],
      correctIndex: 0,
      explanation: 'Receipts create an audit trail for your spending.',
    },
  ],
  ch7: [
    {
      id: 'ch7-q1',
      question: 'Investment means:',
      options: ['Spending money randomly', 'Using money to grow more money', 'Hiding cash', 'Only gambling'],
      correctIndex: 1,
      explanation: 'Investing aims for future growth — with risk to manage.',
    },
    {
      id: 'ch7-q2',
      question: 'Every investment has risk.',
      options: ['True', 'False', 'Only stocks', 'Only gold'],
      correctIndex: 0,
      explanation: 'If someone promises zero risk, be skeptical.',
    },
    {
      id: 'ch7-q3',
      question: 'Quick profit promises should be trusted blindly.',
      options: ['True', 'False', 'Always', 'Only from friends'],
      correctIndex: 1,
      explanation: 'Verify claims and understand the product.',
    },
  ],
  ch8: [
    {
      id: 'ch8-q1',
      question: '“Guaranteed double money quickly” is usually:',
      options: ['Safe', 'Risky/scam sign', 'Government policy', 'A bank feature'],
      correctIndex: 1,
      explanation: 'Unrealistic guarantees are a classic fraud signal.',
    },
    {
      id: 'ch8-q2',
      question: 'OTP should never be shared.',
      options: ['True', 'False', 'Sometimes', 'Only online'],
      correctIndex: 0,
      explanation: 'Treat OTP like cash in your pocket.',
    },
    {
      id: 'ch8-q3',
      question: 'Before investing, you should verify legal registration.',
      options: ['True', 'False', 'Only large amounts', 'Never'],
      correctIndex: 0,
      explanation: 'Legitimacy checks protect your savings.',
    },
  ],
  ch9: [
    {
      id: 'ch9-q1',
      question: 'Profit means:',
      options: ['Revenue – Cost', 'Cost – Revenue', 'Revenue only', 'Cost only'],
      correctIndex: 0,
      explanation: 'Profit is what remains after covering costs.',
    },
    {
      id: 'ch9-q2',
      question: 'Business should solve customer problems.',
      options: ['True', 'False', 'Only online', 'Only retail'],
      correctIndex: 0,
      explanation: 'Value for customers drives repeat sales.',
    },
    {
      id: 'ch9-q3',
      question: 'Tracking expenses helps business.',
      options: ['True', 'False', 'Only banks', 'Only taxes'],
      correctIndex: 0,
      explanation: 'You cannot improve what you do not measure.',
    },
  ],
  ch10: [
    {
      id: 'ch10-q1',
      question: 'Wealth is built through:',
      options: ['Discipline and patience', 'Luck only', 'Borrowing only', 'Ignoring risk'],
      correctIndex: 0,
      explanation: 'Systems and patience beat hoping for luck.',
    },
    {
      id: 'ch10-q2',
      question: 'Emergency fund protects during difficult times.',
      options: ['True', 'False', 'Only cities', 'Only youth'],
      correctIndex: 0,
      explanation: 'Cash buffers reduce forced borrowing.',
    },
    {
      id: 'ch10-q3',
      question: 'Skills can be an investment.',
      options: ['True', 'False', 'Only degrees', 'Only abroad'],
      correctIndex: 0,
      explanation: 'Skills can raise income and resilience.',
    },
  ],
}

const NEPALI_QUIZZES: Partial<Record<string, QuizQuestion[]>> = {
  ch1: [
    {
      id: 'ch1-q1',
      question: 'आर्थिक अनुशासनको पहिलो नियम के हो?',
      options: ['आम्दानीभन्दा बढी खर्च गर्नु', 'आम्दानीभन्दा कम खर्च गर्नु', 'हरेक महिना ऋण लिनु', 'बचत नगर्नु'],
      correctIndex: 1,
      explanation: 'दिगो आर्थिक स्थिरताको आधार भनेको आम्दानीभन्दा कम खर्च गर्नु हो।',
    },
    {
      id: 'ch1-q2',
      question: 'को आर्थिक रूपमा बलियो हुन्छ?',
      options: [
        'धेरै कमाउने तर बचत नगर्ने व्यक्ति',
        'कम कमाउने तर नियमित बचत गर्ने व्यक्ति',
        'आम्दानी सबै खर्च गर्ने व्यक्ति',
        'योजना नगर्ने व्यक्ति',
      ],
      correctIndex: 1,
      explanation: 'नियमित बचतले सुरक्षा कोष र विकल्प दुवै बनाउँछ — आम्दानी मात्र पर्याप्त हुँदैन।',
    },
    {
      id: 'ch1-q3',
      question: 'पैसा कुन कामका लागि प्रयोग हुनुपर्छ?',
      options: ['केवल खर्च', 'केवल जुवा', 'योजना, बचत, सुरक्षा र वृद्धि', 'देखावा गर्न'],
      correctIndex: 2,
      explanation: 'पैसाले योजना, सुरक्षा र वृद्धि समर्थन गर्दा सबैभन्दा राम्रो काम गर्छ।',
    },
  ],
  ch2: [
    {
      id: 'ch2-q1',
      question: 'कुन सूत्र राम्रो मानिन्छ?',
      options: ['आम्दानी – खर्च = बचत', 'आम्दानी – बचत = खर्च', 'आम्दानी = खर्च', 'बचत = ऋण'],
      correctIndex: 1,
      explanation: 'पहिले आफूलाई तिर्नुहोस्: पहिले बचत छुट्याउनुहोस्, त्यसपछि खर्च योजना बनाउनुहोस्।',
    },
    {
      id: 'ch2-q2',
      question: 'प्रति महिना रु. २,००० बचत गर्दा एक वर्षमा कति हुन्छ?',
      options: ['रु. १२,०००', 'रु. २४,०००', 'रु. ५०,०००', 'रु. ५,०००'],
      correctIndex: 1,
      explanation: '२,००० × १२ = २४,०००।',
    },
    {
      id: 'ch2-q3',
      question: 'बचतले आकस्मिक अवस्थामा मद्दत गर्छ।',
      options: ['सही', 'गलत', 'केवल व्यवसायका लागि', 'केवल ऋण भएमा'],
      correctIndex: 0,
      explanation: 'आकस्मिक बचतले समस्या आउँदा तनाव घटाउँछ।',
    },
  ],
  ch3: [
    {
      id: 'ch3-q1',
      question: 'बजेट भनेको के हो?',
      options: ['पैसाको योजना', 'ऋण', 'कर', 'पुरस्कार'],
      correctIndex: 0,
      explanation: 'बजेटले खर्च अघि आम्दानीलाई योजनाबद्ध रूपमा बाँड्छ।',
    },
    {
      id: 'ch3-q2',
      question: '50/30/20 नियममा 20% कुनका लागि हो?',
      options: ['चाहना', 'बचत/लगानी', 'घरभाडा मात्र', 'मनोरञ्जन'],
      correctIndex: 1,
      explanation: '२०% भाग बचत र लगानीका लागि छुट्याइन्छ।',
    },
    {
      id: 'ch3-q3',
      question: 'खाना र औषधि कुन श्रेणीमा पर्छन्?',
      options: ['चाहना', 'आवश्यकता', 'लक्जरी', 'बोनस'],
      correctIndex: 1,
      explanation: 'स्वस्थ बजेटमा आधारभूत आवश्यकता पहिला राखिन्छ।',
    },
  ],
  ch4: [
    {
      id: 'ch4-q1',
      question: 'राम्रो ऋणले के मद्दत गर्छ?',
      options: ['आम्दानी वा मूल्य बढाउन', 'अनावश्यक खर्च बढाउन', 'फिर्ता नगर्न', 'आम्दानी लुकाउन'],
      correctIndex: 0,
      explanation: 'उत्पादक ऋणले सम्पत्ति वा कमाउने क्षमता बढाउन सक्छ।',
    },
    {
      id: 'ch4-q2',
      question: 'देखावाका लागि लिएको ऋण कस्तो हुन्छ?',
      options: ['राम्रो ऋण', 'खराब ऋण', 'नि:शुल्क पैसा', 'सधैं सुरक्षित'],
      correctIndex: 1,
      explanation: 'स्टाटसका लागि ऋण लिँदा आर्थिक अवस्था कमजोर हुन सक्छ।',
    },
    {
      id: 'ch4-q3',
      question: 'ऋण लिनु अघि ब्याजदर जाँच गर्नुपर्छ।',
      options: ['सही', 'गलत', 'केवल गाडी किन्दा', 'केवल विदेशमा'],
      correctIndex: 0,
      explanation: 'ब्याज र शुल्कले ऋण तिर्न सकिने/नसकिने निर्धारण गर्छ।',
    },
  ],
  ch5: [
    {
      id: 'ch5-q1',
      question: 'OTP कसलाई दिनुहुन्छ?',
      options: ['सबैलाई', 'विश्वासिलो साथीलाई मात्र', 'कसैलाई पनि होइन', 'बैंकको पोस्टरलाई'],
      correctIndex: 2,
      explanation: 'OTP निजी सुरक्षात्मक कोड हो — कहिल्यै साझा गर्नु हुँदैन।',
    },
    {
      id: 'ch5-q2',
      question: 'बैंकको रेकर्डले भविष्यका आर्थिक काममा मद्दत गर्छ।',
      options: ['सही', 'गलत', 'केवल विदेशमा', 'केवल नगदमा'],
      correctIndex: 0,
      explanation: 'स्टेटमेन्टले विश्वास र प्रमाणीकरण दुवैमा सहयोग गर्छ।',
    },
    {
      id: 'ch5-q3',
      question: 'मोबाइल बैंकिङ पासवर्ड कस्तो हुनुपर्छ?',
      options: ['सजिलो र सार्वजनिक', 'बलियो र गोप्य', 'हरेक महिना साझा गर्ने', 'फोन कभरमा लेखिएको'],
      correctIndex: 1,
      explanation: 'बलियो र गोप्य पासवर्डले खाता सुरक्षित राख्छ।',
    },
  ],
  ch6: [
    {
      id: 'ch6-q1',
      question: 'डिजिटल भुक्तानी पठाउनु अघि के जाँच्नुपर्छ?',
      options: ['प्राप्तकर्ताको नाम', 'मौसम', 'सोसल मिडिया', 'अनियमित लिङ्क'],
      correctIndex: 0,
      explanation: 'प्राप्तकर्ताको विवरण ध्यानपूर्वक जाँच्नुपर्छ।',
    },
    {
      id: 'ch6-q2',
      question: 'अपरिचित भुक्तानी लिङ्क सधैं सुरक्षित हुन्छन्।',
      options: ['सही', 'गलत', 'राति मात्र', 'Wi‑Fi मा मात्र'],
      correctIndex: 1,
      explanation: 'अपरिचित लिङ्क ठगीको सामान्य माध्यम हो।',
    },
    {
      id: 'ch6-q3',
      question: 'डिजिटल रसिदले पैसाको हिसाब ट्र्याक गर्न मद्दत गर्छ।',
      options: ['सही', 'गलत', 'केवल पसलका लागि', 'केवल बैंकका लागि'],
      correctIndex: 0,
      explanation: 'रसिदले खर्चको स्पष्ट रेकर्ड राख्न मद्दत गर्छ।',
    },
  ],
  ch7: [
    {
      id: 'ch7-q1',
      question: 'लगानी भनेको के हो?',
      options: ['जथाभावी खर्च गर्नु', 'पैसाबाट थप पैसा बढाउने प्रक्रिया', 'नगद लुकाउने', 'केवल जुवा खेल्ने'],
      correctIndex: 1,
      explanation: 'लगानीको लक्ष्य भविष्यमा वृद्धि हो — जोखिम व्यवस्थापनसहित।',
    },
    {
      id: 'ch7-q2',
      question: 'हरेक लगानीमा जोखिम हुन्छ।',
      options: ['सही', 'गलत', 'केवल सेयरमा', 'केवल सुनमा'],
      correctIndex: 0,
      explanation: 'शून्य जोखिमको वाचा आएमा सचेत हुनुपर्छ।',
    },
    {
      id: 'ch7-q3',
      question: 'छिटो नाफाको वाचा अन्धाधुन्ध विश्वास गर्नुपर्छ।',
      options: ['सही', 'गलत', 'सधैं', 'साथीले भने मात्र'],
      correctIndex: 1,
      explanation: 'दाबी जाँच्नुहोस् र उत्पादन बुझेर मात्र निर्णय गर्नुहोस्।',
    },
  ],
  ch8: [
    {
      id: 'ch8-q1',
      question: '“छिट्टै पैसा दोब्बर” भन्ने वाचा सामान्यतया केको संकेत हो?',
      options: ['सुरक्षित', 'जोखिम/ठगीको संकेत', 'सरकारी नीति', 'बैंक सुविधा'],
      correctIndex: 1,
      explanation: 'अवास्तविक ग्यारेन्टी ठगीको क्लासिक संकेत हो।',
    },
    {
      id: 'ch8-q2',
      question: 'OTP कहिल्यै साझा गर्नु हुँदैन।',
      options: ['सही', 'गलत', 'कहिलेकाहीँ', 'अनलाइनमा मात्र'],
      correctIndex: 0,
      explanation: 'OTP लाई आफ्नै नगदजस्तै सुरक्षित राख्नुहोस्।',
    },
    {
      id: 'ch8-q3',
      question: 'लगानी गर्नु अघि कानुनी दर्ता जाँच्नुपर्छ।',
      options: ['सही', 'गलत', 'ठूलो रकममा मात्र', 'कहिल्यै होइन'],
      correctIndex: 0,
      explanation: 'वैधानिकता जाँच्दा बचत सुरक्षित रहन्छ।',
    },
  ],
  ch9: [
    {
      id: 'ch9-q1',
      question: 'नाफा भनेको के हो?',
      options: ['आम्दानी – लागत', 'लागत – आम्दानी', 'आम्दानी मात्र', 'लागत मात्र'],
      correctIndex: 0,
      explanation: 'लागत घटाएपछि बाँकी रहने रकम नाफा हो।',
    },
    {
      id: 'ch9-q2',
      question: 'व्यवसायले ग्राहकको समस्या समाधान गर्नुपर्छ।',
      options: ['सही', 'गलत', 'केवल अनलाइन', 'केवल खुद्रा व्यापारमा'],
      correctIndex: 0,
      explanation: 'ग्राहकलाई मूल्य दिने व्यवसायमा पुनः बिक्री बढ्छ।',
    },
    {
      id: 'ch9-q3',
      question: 'खर्च ट्र्याक गर्दा व्यवसायलाई मद्दत हुन्छ।',
      options: ['सही', 'गलत', 'केवल बैंकमा', 'केवल करका लागि'],
      correctIndex: 0,
      explanation: 'मापन नगरेको कुरा सुधार गर्न कठिन हुन्छ।',
    },
  ],
  ch10: [
    {
      id: 'ch10-q1',
      question: 'सम्पत्ति निर्माण केबाट हुन्छ?',
      options: ['अनुशासन र धैर्य', 'भाग्य मात्र', 'ऋण मात्र', 'जोखिम बेवास्ता गरेर'],
      correctIndex: 0,
      explanation: 'प्रणाली र धैर्यले भाग्यको आशाभन्दा राम्रो परिणाम दिन्छ।',
    },
    {
      id: 'ch10-q2',
      question: 'आपतकालीन कोषले कठिन समयमा सुरक्षा दिन्छ।',
      options: ['सही', 'गलत', 'केवल शहरमा', 'केवल युवाका लागि'],
      correctIndex: 0,
      explanation: 'क्यास बफर हुँदा बाध्य भएर ऋण लिनुपर्ने अवस्था घट्छ।',
    },
    {
      id: 'ch10-q3',
      question: 'सीप विकास पनि लगानी हुन सक्छ।',
      options: ['सही', 'गलत', 'केवल डिग्रीमा', 'केवल विदेशमा'],
      correctIndex: 0,
      explanation: 'सीपले आम्दानी र आर्थिक लचिलोपन दुवै बढाउन सक्छ।',
    },
  ],
}

export function getQuizForLesson(lessonId: string, language: 'en' | 'ne' = 'en'): QuizQuestion[] {
  if (language === 'ne') {
    const nepali = NEPALI_QUIZZES[lessonId]
    if (nepali) return nepali
  }
  return QUIZZES[lessonId] ?? []
}
