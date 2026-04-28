import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  BookOpen,
  CheckCircle2,
  Flame,
  Gift,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import { ProgressRing } from '../components/ProgressRing'

const content = {
  ne: {
    academy: 'एमआइजी वेल्थ एकेडेमी',
    group: 'मगर इन्भेस्टमेन्ट ग्रुप',
    memberLogin: 'सदस्य लगइन',
    heroTag: '३०,०००+ सदस्य · संरचित कार्यक्रम',
    heroTitlePrefix: 'आफ्नो पैसालाई',
    heroTitleHighlight: 'नियन्त्रण गर्न सिक्नुहोस्',
    heroBody:
      '30,000+ MIG सदस्यसँगै बचत, बजेट, लगानी र आर्थिक निर्णयहरू सजिलै सिक्नुहोस्। पाठ पूरा गर्नुहोस्, XP कमाउनुहोस् र पुरस्कार अनलक गर्नुहोस्।',
    startLearning: 'अहिले नै सुरु गरौँ',
    viewProgram: 'कार्यक्रम हेर्नुहोस्',
    urgencyBar: '🎁 पहिलो 100 सदस्यहरूले विशेष पुरस्कार पाउनेछन्',
    microTrust: 'नि:शुल्क • 2 मिनेटमै सुरु हुन्छ • मोबाइलमै पूरा गर्न सकिन्छ',
    actionHook: '🔥 आज 1 पाठ पूरा गर्नुहोस् र 20 XP तुरुन्त कमाउनुहोस्',
    trustBullets: [
      'MIG समुदायका लागि विशेष रूपमा तयार',
      'सरल भाषा • वास्तविक जीवनका उदाहरण',
      'मोबाइलमै पूरा गर्न सकिने',
    ],
    members: 'सदस्य',
    chapters: 'अध्याय',
    rewards: 'XP प्रणाली',
    certificates: 'पुरस्कार र प्रमाणपत्र',
    memberPreview: 'सदस्य प्रगतिको उदाहरण',
    welcome: 'नमस्ते, अजित',
    journey: 'तपाईंको यात्राको सारांश',
    scoreLabel: 'अध्याय प्रगति',
    level: 'स्तर',
    smartPlanner: 'स्मार्ट प्लानर',
    chapterProgress: 'अध्याय',
    rewardTrack: 'अर्को स्तरमा पुग्न 2 पाठ बाँकी',
    benefitsTitle: 'कार्यक्रमका फाइदाहरू',
    benefitsBody:
      'छोटो, स्पष्ट र प्रेरणादायी सिकाइ प्रवाह — व्यस्त जीवनमै आर्थिक आत्मविश्वास बनाउने कार्यक्रम।',
    cards: [
      {
        title: 'साना पाठहरू',
        body: 'व्यस्त जीवनमै सजिलै सिक्न सकिने',
      },
      {
        title: 'XP र स्तर प्रणाली',
        body: 'सिकाइको प्रगति स्पष्ट देखिन्छ',
      },
      {
        title: 'वास्तविक जीवनका उदाहरण',
        body: 'नेपालमै उपयोगी वित्तीय ज्ञान',
      },
      {
        title: 'सुरक्षित सिकाइ',
        body: 'कुनै जोखिम बिना सिक्नुहोस्',
      },
    ],
    howTitle: 'यो कसरी काम गर्छ',
    steps: [
      { icon: '📘', title: 'सिक्नुहोस्', body: 'छोटो र सजिलो पाठहरू' },
      { icon: '🧠', title: 'ज्ञान जाँच दिनुहोस्', body: 'तपाईंले के बुझ्नुभयो जाँच गर्नुहोस्' },
      { icon: '⚡', title: 'XP कमाउनुहोस्', body: 'प्रत्येक सफलतामा XP कमाउनुहोस्' },
      { icon: '🎁', title: 'पुरस्कार अनलक गर्नुहोस्', body: 'आफ्नो उपलब्धि देखाउनुहोस्' },
    ],
    stepPrefix: 'चरण',
    motivationStrip: '🔥 हजारौं MIG सदस्यहरूले सुरु गरिसकेका छन् — अब तपाईंको पालो हो',
    ctaTitle: 'आजबाट आफ्नो आर्थिक यात्रा सुरु गर्नुहोस्',
    ctaBody: 'अहिले सुरु नगर्दा भोलि ढिलो हुन सक्छ',
  },
  en: {
    academy: 'MIG Wealth Academy',
    group: 'Magar Investment Group',
    memberLogin: 'Member login',
    heroTag: '30,000+ members · structured program',
    heroTitlePrefix: 'Learn to',
    heroTitleHighlight: 'control your money',
    heroBody:
      'Join 30,000+ MIG members to learn saving, budgeting, investing, and practical financial decisions in a simple way. Complete lessons, earn XP, and unlock rewards.',
    startLearning: 'Start now',
    viewProgram: 'View Program',
    urgencyBar: '🎁 The first 100 members will receive a special reward',
    microTrust: 'Free • Starts in 2 minutes • Mobile-friendly learning',
    actionHook: '🔥 Complete 1 lesson today and instantly earn 20 XP',
    trustBullets: [
      'Built specifically for the MIG community',
      'Simple language with real-life examples',
      'Designed for mobile completion',
    ],
    members: 'Members',
    chapters: 'Chapters',
    rewards: 'XP System',
    certificates: 'Rewards & Certificates',
    memberPreview: 'Member progress example',
    welcome: 'Namaste, Ajit',
    journey: 'Your journey at a glance',
    scoreLabel: 'Chapter progress',
    level: 'Level',
    smartPlanner: 'Smart Planner',
    chapterProgress: 'Chapters',
    rewardTrack: '2 lessons left to reach the next level',
    benefitsTitle: 'Program benefits',
    benefitsBody:
      'A short, clear, and motivating flow to build financial confidence in busy daily life.',
    cards: [
      {
        title: 'Small lessons',
        body: 'Easy to learn, even in a busy schedule',
      },
      {
        title: 'XP and level system',
        body: 'Your learning progress stays visible and motivating',
      },
      {
        title: 'Real-life examples',
        body: 'Financial lessons you can apply right away',
      },
      {
        title: 'Safe learning',
        body: 'Learn with zero financial risk',
      },
    ],
    howTitle: 'How it works',
    steps: [
      { icon: '📘', title: 'Learn', body: 'Short and easy chapters' },
      { icon: '🧠', title: 'Take quiz', body: 'Check what you understood' },
      { icon: '⚡', title: 'Earn XP', body: 'Gain XP with each success' },
      { icon: '🎁', title: 'Unlock rewards', body: 'Show your progress and achievements' },
    ],
    stepPrefix: 'Step',
    motivationStrip: '🔥 Thousands of MIG members have already started — now it is your turn',
    ctaTitle: 'Start your financial journey today',
    ctaBody: 'Starting tomorrow may already be too late',
  },
} as const

export function Landing() {
  const [language, setLanguage] = useState<'ne' | 'en'>('ne')
  const t = content[language]

  return (
    <div className="min-h-screen bg-mig-bg text-mig-white">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-mig-gold/30 to-transparent ring-1 ring-mig-gold/40">
              <span className="font-display text-xl text-mig-gold">M</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-mig-muted">{t.academy}</p>
              <p className="text-sm text-mig-white">{t.group}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1 text-xs">
              <button
                type="button"
                onClick={() => setLanguage('ne')}
                className={`rounded-lg px-3 py-1.5 font-medium transition ${
                  language === 'ne' ? 'bg-mig-gold text-mig-bg' : 'text-mig-white/80 hover:text-mig-white'
                }`}
              >
                नेपाली
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded-lg px-3 py-1.5 font-medium transition ${
                  language === 'en' ? 'bg-mig-gold text-mig-bg' : 'text-mig-white/80 hover:text-mig-white'
                }`}
              >
                English
              </button>
            </div>
            <Link
              to="/start"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-mig-white hover:border-mig-gold/50"
            >
              {t.memberLogin}
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,197,66,0.12),_transparent_55%)]" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-mig-gold/30 bg-mig-gold/10 px-3 py-1 text-xs font-medium text-mig-gold">
              <Sparkles className="h-3.5 w-3.5" /> {t.heroTag}
            </p>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              {t.heroTitlePrefix} <span className="text-gradient-gold">{t.heroTitleHighlight}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-mig-muted">{t.heroBody}</p>
            <p className="mt-5 inline-flex rounded-xl border border-mig-gold/30 bg-mig-gold/10 px-4 py-2 text-sm font-medium text-mig-gold">
              {t.urgencyBar}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/start"
                className="inline-flex items-center gap-2 rounded-2xl bg-mig-gold px-6 py-3 text-sm font-semibold text-mig-bg shadow-lg shadow-mig-gold/20 hover:bg-mig-gold/90"
              >
                {t.startLearning} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#program"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-mig-white hover:border-mig-gold/40"
              >
                {t.viewProgram}
              </a>
            </div>
            <p className="mt-3 text-xs text-mig-muted">{t.microTrust}</p>
            <div className="mt-4 space-y-2 text-sm text-mig-white/90">
              {t.trustBullets.map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-mig-green" /> {item}
                </p>
              ))}
            </div>
            <p className="mt-5 inline-flex rounded-xl border border-mig-gold/20 bg-mig-gold/5 px-4 py-2 text-sm font-medium text-mig-gold">
              {t.actionHook}
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center sm:max-w-md sm:text-left">
              <div>
                <p className="text-2xl font-semibold text-mig-white">30k+</p>
                <p className="text-xs text-mig-muted">{t.members}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-mig-white">10</p>
                <p className="text-xs text-mig-muted">{t.chapters}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-mig-gold">{t.rewards}</p>
                <p className="text-xs text-mig-muted">{t.certificates}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative"
          >
            <div className="glass gold-glow rounded-3xl p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-mig-muted">{t.memberPreview}</p>
                  <p className="mt-1 text-lg font-semibold">{t.welcome}</p>
                  <p className="text-sm text-mig-muted">{t.journey}</p>
                </div>
                <BadgeCheck className="h-8 w-8 text-mig-gold" />
              </div>
              <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
                <ProgressRing value={3} max={10} showFraction sublabel={t.scoreLabel} />
                <div className="w-full max-w-[200px] space-y-3 text-sm">
                  <div className="flex justify-between text-mig-muted">
                    <span>{t.level}</span>
                    <span className="text-mig-white">{t.smartPlanner}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[42%] rounded-full bg-mig-green" />
                  </div>
                  <div className="flex justify-between text-mig-muted">
                    <span>{t.chapterProgress}</span>
                    <span className="text-mig-white">3 पाठ पूरा</span>
                  </div>
                  <div className="rounded-xl border border-mig-gold/25 bg-mig-gold/5 p-3 text-xs text-mig-gold">
                    {t.rewardTrack}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="program" className="border-t border-white/10 bg-black/20 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-mig-white">{t.benefitsTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm text-mig-muted">{t.benefitsBody}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                title: t.cards[0].title,
                body: t.cards[0].body,
              },
              {
                icon: Zap,
                title: t.cards[1].title,
                body: t.cards[1].body,
              },
              {
                icon: Brain,
                title: t.cards[2].title,
                body: t.cards[2].body,
              },
              {
                icon: Shield,
                title: t.cards[3].title,
                body: t.cards[3].body,
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 transition hover:-translate-y-0.5 hover:border hover:border-mig-gold/30"
              >
                <c.icon className="h-6 w-6 text-mig-gold" />
                <h3 className="mt-4 font-semibold text-mig-white">{c.title}</h3>
                <p className="mt-2 text-sm text-mig-muted">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-mig-white">{t.howTitle}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {t.steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="text-xs font-semibold text-mig-gold">
                  {t.stepPrefix} {i + 1}
                </span>
                <p className="mt-2 text-lg font-semibold">
                  <span className="mr-2">{step.icon}</span>
                  {step.title}
                </p>
                <p className="mt-2 text-sm text-mig-muted">{step.body}</p>
                {i < 3 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-mig-gold/60 to-transparent md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 py-10">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 text-sm font-medium text-mig-gold">
          <Flame className="h-4 w-4" />
          <p>{t.motivationStrip}</p>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl text-mig-white">{t.ctaTitle}</h2>
            <p className="mt-2 text-sm text-mig-muted">{t.ctaBody}</p>
          </div>
          <Link
            to="/start"
            className="inline-flex items-center gap-2 rounded-2xl bg-mig-gold px-6 py-3 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
          >
            <Gift className="h-4 w-4" /> {t.startLearning} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-mig-muted">
        © {new Date().getFullYear()} Magar Investment Group · MIG Wealth Academy
      </footer>
    </div>
  )
}
