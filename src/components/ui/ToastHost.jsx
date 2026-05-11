import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../../stores/useAppStore'

export function ToastHost() {
  const toasts = useAppStore((s) => s.toasts)
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur-md ${
              t.variant === 'error'
                ? 'border-rose-500/40 bg-rose-950/80 text-rose-100'
                : 'border-slate-600/50 bg-slate-900/90 text-slate-100'
            }`}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
