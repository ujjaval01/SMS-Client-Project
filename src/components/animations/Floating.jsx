import { motion } from 'framer-motion'

export function Floating() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-50">
      {Array.from({ length: 20 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
          initial={{ x: `${(i * 13) % 95}%`, y: `${(i * 17) % 95}%`, opacity: 0.2 }}
          animate={{
            y: [`${(i * 17) % 95}%`, `${((i * 17) % 95) - 8}%`],
            opacity: [0.2, 0.8, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 4 + (i % 5) }}
        />
      ))}
    </div>
  )
}
