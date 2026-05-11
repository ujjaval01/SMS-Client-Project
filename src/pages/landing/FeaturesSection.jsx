import { motion } from 'framer-motion'
import { BarChart3, Bot, BookOpenCheck, ClipboardCheck, Sparkles, Wallet } from 'lucide-react'

const items = [
  { icon: ClipboardCheck, title: 'Attendance intelligence', desc: 'Heatmaps, trends, and alerts without spreadsheet chaos.' },
  { icon: Bot, title: 'AI campus assistant', desc: 'Contextual answers for schedules, fees, and academic FAQs.' },
  { icon: BarChart3, title: 'Leadership analytics', desc: 'Growth, collections, and faculty activity in one command center.' },
  { icon: BookOpenCheck, title: 'Assignments & submissions', desc: 'Deadlines, uploads, and status tracking for every cohort.' },
  { icon: Wallet, title: 'Fee operations', desc: 'Ledger views, partial payments, and export-ready reports.' },
  { icon: Sparkles, title: 'Premium UX', desc: 'Glassmorphism, motion, and keyboard-first workflows like Linear.' },
]

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Everything your institute runs daily</h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-400">
        Student, teacher, and admin experiences stay separated — each tuned for the job to be done.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6"
          >
            <f.icon className="h-8 w-8 text-cyan-400" />
            <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
