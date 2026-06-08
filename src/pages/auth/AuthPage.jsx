import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Eye, EyeOff, BookOpen, Users, Shield, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthInput } from '../../components/auth/AuthInput'
import { useAppStore } from '../../stores/useAppStore'

const REMEMBER_KEY = 'sms-remember-email'

export function AuthPage() {
  const nav = useNavigate()
  const { role = 'student' } = useParams()
  const login = useAppStore((s) => s.login)
  const register = useAppStore((s) => s.register)
  const toast = useAppStore((s) => s.toast)
  const fetchClassesPublic = useAppStore((s) => s.fetchClassesPublic)

  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', classId: '', section: '' })
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [availableClasses, setAvailableClasses] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY)
    if (saved) setForm((f) => ({ ...f, email: saved }))
    
    // Fetch public classes for student registration
    if (role === 'student') {
      fetchClassesPublic().then(data => setAvailableClasses(data))
    }
  }, [role, fetchClassesPublic])

  const submit = async (e) => {
    e.preventDefault()
    if (mode === 'register') {
      if (role === 'admin') {
        toast('Administrator accounts are invite-only.', 'error')
        return
      }
      const payload = { ...form, role }
      if (role === 'student') {
        payload.studentId = `VNIT-${new Date().getFullYear()}-${Math.floor(8000 + Math.random() * 1999)}`
      }
      const success = await register(payload)
      if (success) {
        toast('Account created. Sign in with your email.', 'default')
        setMode('login')
      }
      return
    }
    if (mode === 'forgot') {
      toast('Reset link sent to your email.', 'default')
      return
    }
    if (remember && form.email) localStorage.setItem(REMEMBER_KEY, form.email)
    else localStorage.removeItem(REMEMBER_KEY)

    const success = await login(form.email, form.password, role)
    if (success) {
      toast('Welcome back', 'default')
      nav('/app')
    }
  }

  const roleConfig = {
    admin: {
      color: 'from-fuchsia-600 to-purple-900',
      icon: <Shield size={48} className="mb-4 text-fuchsia-300" />,
      title: 'System Administrator',
      subtitle: 'Manage the entire academic ecosystem securely.'
    },
    teacher: {
      color: 'from-emerald-500 to-teal-900',
      icon: <BookOpen size={48} className="mb-4 text-emerald-300" />,
      title: 'Faculty Portal',
      subtitle: 'Empower your students and manage classes effortlessly.'
    },
    student: {
      color: 'from-blue-500 to-cyan-900',
      icon: <GraduationCap size={48} className="mb-4 text-blue-300" />,
      title: 'Student Portal',
      subtitle: 'Access your coursework, grades, and campus updates.'
    }
  }

  const theme = roleConfig[role] || roleConfig.student

  return (
    <main className="flex min-h-screen w-full bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500/30">
      
      {/* Left Branding Panel */}
      <div className={`hidden lg:flex w-1/2 flex-col justify-between p-12 bg-gradient-to-br ${theme.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 shadow-inner backdrop-blur-md">
            <Users size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-wider text-white">EduSync</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10"
        >
          {theme.icon}
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {theme.title}
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            {theme.subtitle}
          </p>
        </motion.div>

        <div className="relative z-10 text-sm text-white/50">
          &copy; {new Date().getFullYear()} EduSync Education System
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800/50 backdrop-blur-xl bg-slate-900/40">
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold capitalize bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Reset Password'}
              </h2>
              <p className="text-slate-400 mt-2 text-sm">
                {mode === 'login' ? `Sign in to your ${role} dashboard.` : `Join as a ${role}.`}
              </p>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {mode === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <AuthInput label="Full Name" value={form.name} onChange={(name) => setForm({ ...form, name })} />
                    
                    {/* Class & Section for Students */}
                    {role === 'student' && (
                      <div className="flex gap-4 mt-4">
                        <div className="flex-1">
                          <label className="mb-1 block text-sm text-slate-300">Class</label>
                          <select 
                            className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2.5 text-sm outline-none focus:border-cyan-400 transition-colors"
                            value={form.classId}
                            onChange={(e) => setForm({ ...form, classId: e.target.value })}
                            required
                          >
                            <option value="" disabled>Select Class</option>
                            {availableClasses.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="w-1/3">
                          <label className="mb-1 block text-sm text-slate-300">Section</label>
                          <input 
                            type="text" 
                            placeholder="A, B..."
                            maxLength={2}
                            value={form.section}
                            onChange={(e) => setForm({ ...form, section: e.target.value.toUpperCase() })}
                            className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2.5 text-sm outline-none focus:border-cyan-400 transition-colors"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <AuthInput label="Email Address" value={form.email} onChange={(email) => setForm({ ...form, email })} />
              
              <div className="relative">
                <label className="mb-1 block text-sm text-slate-300">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2.5 pr-12 outline-none focus:border-cyan-400 transition-all focus:bg-slate-900"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-cyan-400 transition-colors"
                    onClick={() => setShowPw(!showPw)}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {mode === 'login' && role !== 'admin' && (
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={remember} 
                      onChange={(e) => setRemember(e.target.checked)} 
                      className="rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500/50" 
                    />
                    Remember me
                  </label>
                  <button type="button" onClick={() => setMode('forgot')} className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-3 font-medium text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              >
                {mode === 'forgot' ? 'Send Reset Link' : mode === 'register' ? 'Create Account' : 'Sign In'}
              </button>

              {role !== 'admin' && (
                <div className="mt-6 text-center text-sm text-slate-400">
                  {mode === 'login' ? (
                    <p>Don't have an account? <button type="button" onClick={() => setMode('register')} className="text-cyan-400 font-medium hover:underline">Sign up</button></p>
                  ) : (
                    <p>Already have an account? <button type="button" onClick={() => setMode('login')} className="text-cyan-400 font-medium hover:underline">Sign in</button></p>
                  )}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
