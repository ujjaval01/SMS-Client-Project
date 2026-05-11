import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const slides = [
  {
    quote:
      'Faculty finally see attendance and submissions in one place. The admin analytics alone saved us hours every week.',
    name: 'Dr. Meera Iyer',
    role: 'HOD, Computer Science — demo persona',
  },
  {
    quote: 'Students actually use the portal because it feels like a modern app, not a government form from 2003.',
    name: 'Ananya Deshpande',
    role: 'B.Tech CSE — demo learner',
  },
  {
    quote: 'Fee reconciliation and broadcast notices are painless. Export to PDF and CSV just works for audits.',
    name: 'Rajesh Krishnan',
    role: 'Registrar — demo admin',
  },
]

export function TestimonialsSection() {
  const [i, setI] = useState(0)
  const t = slides[i]

  return (
    <section id="testimonials" className="mx-auto max-w-4xl px-4 py-20">
      <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Voices from campus</h2>
      <div className="relative mt-10 glass rounded-3xl p-8 md:p-12">
        <Quote className="absolute right-8 top-8 h-10 w-10 text-cyan-500/30" />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-lg text-slate-200 md:text-xl">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-6 font-semibold text-white">{t.name}</p>
            <p className="text-sm text-slate-500">{t.role}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            className="rounded-full border border-slate-600 p-2 hover:bg-slate-800"
            onClick={() => setI((x) => (x - 1 + slides.length) % slides.length)}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-600 p-2 hover:bg-slate-800"
            onClick={() => setI((x) => (x + 1) % slides.length)}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
