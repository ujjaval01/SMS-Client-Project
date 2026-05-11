import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { AuthInput } from '../../components/auth/AuthInput'
import { useAppStore } from '../../stores/useAppStore'

const REMEMBER_KEY = 'sms-remember-email'

export function AuthPage() {
  const nav = useNavigate()
  const { role = 'student' } = useParams()
  const login = useAppStore((s) => s.login)
  const register = useAppStore((s) => s.register)
  const toast = useAppStore((s) => s.toast)

  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY)
    if (saved) setForm((f) => ({ ...f, email: saved }))
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (mode === 'register') {
      if (role === 'admin') {
        toast('Administrator accounts are invite-only in this demo.', 'error')
        return
      }
      const payload = { ...form, role }
      if (role === 'student') {
        payload.studentId = `VNIT-2024-${Math.floor(8000 + Math.random() * 1999)}`
      }
      await register(payload)
      toast('Account created. Sign in with your email.', 'default')
      setMode('login')
      return
    }
    if (mode === 'forgot') {
      toast('Reset link sent to your email (demo).', 'default')
      return
    }
    if (remember && form.email) localStorage.setItem(REMEMBER_KEY, form.email)
    else localStorage.removeItem(REMEMBER_KEY)

    const success = await login(form.email, form.password, role)
    if (success) {
      toast('Welcome back', 'default')
      nav('/app')
    } else {
      // Toast is already shown in the store for errors
    }
  }


  const demoHint =
    role === 'admin'
      ? 'admin@demo.com / demo123'
      : role === 'teacher'
        ? 'teacher@demo.com / demo123'
        : 'student@demo.com / demo123'

  return (
    <main className="mx-auto grid min-h-screen max-w-md place-items-center px-5 py-10">
      <form onSubmit={submit} className="glass w-full rounded-2xl p-7">
        <h2 className="text-2xl font-semibold capitalize">
          {role} {mode}
        </h2>
        <p className="mb-4 mt-2 text-xs text-slate-400">Demo login: {demoHint}</p>
        {mode === 'register' && (
          <AuthInput label="Full Name" value={form.name} onChange={(name) => setForm({ ...form, name })} />
        )}
        <AuthInput label="Email" value={form.email} onChange={(email) => setForm({ ...form, email })} />
        <div className="relative mb-3">
          <label className="mb-1 block text-sm text-slate-300">Password</label>
          <input
            type={showPw ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2 pr-10 outline-none focus:border-cyan-400"
          />
          <button
            type="button"
            className="absolute right-2 top-8 rounded p-1 text-slate-400 hover:text-white"
            onClick={() => setShowPw(!showPw)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {mode === 'login' && (
          <label className="mb-4 flex items-center gap-2 text-xs text-slate-400">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-slate-600" />
            Remember me
          </label>
        )}
        <button type="submit" className="glow-button mt-1 w-full rounded-xl py-2 text-white">
          {mode === 'forgot' ? 'Send Reset Link' : 'Continue'}
        </button>
        <div className="mt-4 flex justify-between text-xs">
          <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Create account' : 'Back to login'}
          </button>
          <button type="button" onClick={() => setMode('forgot')}>
            Forgot password?
          </button>
        </div>
      </form>
    </main>
  )
}
