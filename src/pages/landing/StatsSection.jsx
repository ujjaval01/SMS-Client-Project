import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function Counter({ value, label, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const dur = 1100
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      setN(Math.round(value * p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 text-center">
      <p className="text-3xl font-bold text-cyan-300 md:text-4xl">
        {n}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section id="stats" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Trusted scale (demo metrics)</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
        Animated counters illustrate how AstraCampus presents operational intelligence to leadership.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <Counter value={1452} label="Active learners on platform" />
        <Counter value={186} label="Faculty workspaces" suffix="+" />
        <Counter value={94} label="Avg. attendance visibility" suffix="%" />
      </div>
    </section>
  )
}
