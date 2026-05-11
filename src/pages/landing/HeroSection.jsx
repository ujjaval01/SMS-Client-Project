import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Floating } from '../../components/animations/Floating'
import { useMouseGlow } from '../../hooks/useMouseGlow'

export function HeroSection() {
  const { ref, pos } = useMouseGlow()

  return (
    <section ref={ref} className="relative overflow-hidden px-4 pb-24 pt-16 md:pt-24">
      <Floating />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(56,189,248,0.22), transparent 55%)`,
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-400"
        >
          Modern academic operations
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-6 bg-gradient-to-br from-white via-slate-100 to-cyan-200 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl md:leading-tight"
        >
          The student platform your institute deserves — without the legacy clutter.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-400 md:text-lg"
        >
          Attendance, assessments, fees, and insights in one cinematic workspace. Built for schools and colleges that want
          Stripe-grade polish with demo-ready local data.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/role" className="glow-button rounded-2xl px-8 py-3 text-sm font-semibold text-white">
            Start free demo
          </Link>
          <a
            href="#features"
            className="rounded-2xl border border-white/15 px-8 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
          >
            Explore modules
          </a>
        </motion.div>
      </div>
    </section>
  )
}
