import { motion } from 'framer-motion'

export function Panel({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
      {children}
    </motion.div>
  )
}
