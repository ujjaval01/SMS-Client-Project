import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#stats', label: 'Impact' },
  { href: '#testimonials', label: 'Stories' },
  { href: '#contact', label: 'Contact' },
]

export function LandingNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          Astra<span className="text-cyan-400">Campus</span>
        </Link>
        <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden gap-3 md:flex">
          <Link
            to="/role"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5"
          >
            Sign in
          </Link>
          <Link to="/role" className="glow-button rounded-xl px-4 py-2 text-sm font-semibold text-white">
            Launch app
          </Link>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-slate-950/95 md:hidden"
          >
            <div className="flex flex-col gap-3 px-4 py-4 text-sm text-slate-200">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <Link to="/role" className="glow-button rounded-xl py-2 text-center font-semibold text-white" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
