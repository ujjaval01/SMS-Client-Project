import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useAppStore } from '../../stores/useAppStore'

export function CommandPalette() {
  const open = useAppStore((s) => s.commandOpen)
  const setOpen = useAppStore((s) => s.setCommandOpen)
  const db = useAppStore((s) => s.db)
  const session = useAppStore((s) => s.session)
  const [q, setQ] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  const items = useMemo(() => {
    const list = []
    db.students.slice(0, 40).forEach((s) => {
      list.push({ type: 'Student', label: s.name, sub: s.id, go: session ? `/student/dashboard` : '/role' })
    })
    db.teachers?.forEach((t) => {
      list.push({ type: 'Teacher', label: t.name, sub: t.subject, go: session ? `/teacher/dashboard` : '/role' })
    })
    db.assignments.forEach((a) => {
      list.push({ type: 'Assignment', label: a.title, sub: a.subject, go: session ? `/${session.role}/dashboard` : '/role' })
    })
    return list
  }, [db.students, db.teachers, db.assignments, session])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    if (!qq) return items.slice(0, 8)
    return items.filter((i) => (i.label + i.sub + i.type).toLowerCase().includes(qq)).slice(0, 12)
  }, [items, q])

  const run = (path) => {
    setOpen(false)
    setQ('')
    nav(path)
  }

  if (!session) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass w-full max-w-lg rounded-2xl border border-slate-600/50 p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-700/60 px-2 pb-2">
              <Search size={18} className="text-slate-500" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search students, teachers, assignments…"
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-slate-500"
              />
              <kbd className="hidden rounded border border-slate-600 px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">Esc</kbd>
            </div>
            <ul className="max-h-72 overflow-auto py-2 text-sm">
              {filtered.map((item, i) => (
                <li key={`${item.type}-${i}`}>
                  <button
                    type="button"
                    onClick={() => run(item.go)}
                    className="flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left hover:bg-slate-800/60"
                  >
                    <span className="text-xs text-cyan-400">{item.type}</span>
                    <span className="flex-1">
                      <span className="block font-medium text-slate-100">{item.label}</span>
                      <span className="text-xs text-slate-500">{item.sub}</span>
                    </span>
                  </button>
                </li>
              ))}
              {!filtered.length && <li className="px-3 py-6 text-center text-slate-500">No matches</li>}
            </ul>
            <p className="border-t border-slate-700/60 px-2 pt-2 text-[10px] text-slate-500">Ctrl/⌘ + K · Portal search (demo)</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
