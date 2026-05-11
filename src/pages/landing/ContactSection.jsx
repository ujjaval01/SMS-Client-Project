import { useState } from 'react'
import { motion } from 'framer-motion'

export function ContactSection() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    window.setTimeout(() => setSent(false), 2800)
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Talk to the team</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
        Demo form — wire this to your API, Formspree, or Supabase edge function when you go live.
      </p>
      <motion.form
        onSubmit={onSubmit}
        className="mt-10 glass rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-300">
            Name
            <input required className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 outline-none focus:border-cyan-500" />
          </label>
          <label className="text-sm text-slate-300">
            Institute email
            <input type="email" required className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 outline-none focus:border-cyan-500" />
          </label>
        </div>
        <label className="mt-4 block text-sm text-slate-300">
          How can we help?
          <textarea rows={4} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 outline-none focus:border-cyan-500" />
        </label>
        <button type="submit" className="glow-button mt-6 w-full rounded-xl py-3 text-sm font-semibold text-white md:w-auto md:px-10">
          {sent ? 'Message queued (demo)' : 'Send message'}
        </button>
      </motion.form>
    </section>
  )
}
