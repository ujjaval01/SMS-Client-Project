import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KEY = 'sms-intro-v1'

export function IntroLoader() {
  const [visible, setVisible] = useState(() => typeof sessionStorage !== 'undefined' && sessionStorage.getItem(KEY) !== '1')

  useEffect(() => {
    if (!visible) return
    const t = window.setTimeout(() => {
      sessionStorage.setItem(KEY, '1')
      setVisible(false)
    }, 1100)
    return () => window.clearTimeout(t)
  }, [visible])

  const skip = () => {
    sessionStorage.setItem(KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950 text-slate-100"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">AstraCampus</p>
            <h1 className="mt-3 bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Academic Cloud
            </h1>
            <p className="mt-3 text-sm text-slate-400">Preparing your workspace…</p>
          </motion.div>
          <motion.button
            type="button"
            className="glow-button mt-10 rounded-xl px-8 py-2 text-sm font-semibold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={skip}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
