import { motion } from 'framer-motion'
import { Award, Download, Share2 } from 'lucide-react'

type Props = {
  fullName: string
  completedAt: string
  onDownload: () => void
  onShare: () => void
}

export function CertificateCard({ fullName, completedAt, onDownload, onShare }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-mig-gold/30 bg-gradient-to-br from-white/[0.08] to-transparent p-1"
    >
      <div className="rounded-[1.35rem] bg-mig-bg/95 p-8 md:p-12">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-mig-gold/15 ring-1 ring-mig-gold/40">
            <Award className="h-8 w-8 text-mig-gold" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mig-gold">Certificate of completion</p>
          <h2 className="mt-3 font-display text-3xl text-mig-white md:text-4xl">MIG Financial Literacy Program</h2>
          <p className="mt-6 text-sm leading-relaxed text-mig-muted">
            This certifies that <span className="font-semibold text-mig-white">{fullName}</span> has successfully
            completed the <span className="text-mig-white">MIG Wealth Academy</span> curriculum and demonstrated
            understanding of saving, budgeting, investment, risk management, and wealth-building principles.
          </p>
          <p className="mt-4 text-xs text-mig-muted">Completed on {completedAt}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-xl bg-mig-gold px-5 py-2.5 text-sm font-semibold text-mig-bg hover:bg-mig-gold/90"
            >
              <Download className="h-4 w-4" /> Download
            </button>
            <button
              type="button"
              onClick={onShare}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-mig-white hover:border-mig-gold/40"
            >
              <Share2 className="h-4 w-4" /> Share on Facebook
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
