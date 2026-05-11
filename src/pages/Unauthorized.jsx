import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldOff } from 'lucide-react'

export function Unauthorized() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-3xl px-10 py-12"
      >
        <ShieldOff className="mx-auto mb-4 h-14 w-14 text-amber-400" aria-hidden />
        <h1 className="text-2xl font-bold">Access restricted</h1>
        <p className="mt-2 text-sm text-slate-400">
          This area is not available for your role. Sign in with the correct portal or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/role"
            className="glow-button rounded-xl px-5 py-2 text-sm font-semibold text-white"
          >
            Choose portal
          </Link>
          <Link to="/" className="rounded-xl border border-slate-600 px-5 py-2 text-sm hover:bg-slate-800/50">
            Landing
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
