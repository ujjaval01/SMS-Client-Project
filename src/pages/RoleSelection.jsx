import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Floating } from '../components/animations/Floating'
import { GraduationCap, Shield, Users } from 'lucide-react'

const portals = [
  {
    role: 'student',
    title: 'Student',
    desc: 'Personal workspace — attendance, results, assignments, and materials.',
    icon: GraduationCap,
  },
  {
    role: 'teacher',
    title: 'Teacher',
    desc: 'Manage cohorts, attendance, assessments, and class communication.',
    icon: Users,
  },
  {
    role: 'admin',
    title: 'Admin',
    desc: 'Enterprise console — users, fees, broadcasts, analytics, and exports.',
    icon: Shield,
  },
]

export function RoleSelection() {
  const nav = useNavigate()
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-16">
      <Floating />
      <h1 className="text-center text-3xl font-bold text-white md:text-4xl">Choose your portal</h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-400">
        Each role signs in to a dedicated experience. Demo: <span className="text-slate-300">role@demo.com</span> /{' '}
        <span className="text-slate-300">demo123</span>
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {portals.map((p, i) => (
          <motion.button
            key={p.role}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            onClick={() => nav(`/auth/${p.role}`)}
            className="glass rounded-2xl p-8 text-left"
          >
            <p.icon className="h-10 w-10 text-cyan-400" />
            <h2 className="mt-4 text-xl font-semibold text-white">{p.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
          </motion.button>
        ))}
      </div>
    </main>
  )
}
