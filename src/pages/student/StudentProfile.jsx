import { useState } from 'react'
import { User, Lock, Mail, BookOpen, Fingerprint } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'

export function StudentProfile({ session, me }) {
  const [pass, setPass] = useState({ current: '', new: '', confirm: '' })

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    alert('Security verification: Mock password update successful!')
    setPass({ current: '', new: '', confirm: '' })
  }

  return (
    <Panel>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className={`${card} flex flex-col items-center text-center`}>
          <div className="mb-4 relative">
             <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-1">
                <div className="h-full w-full rounded-full bg-slate-900 grid place-items-center text-3xl font-bold">
                  {session?.name?.charAt(0)}
                </div>
             </div>
             <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-emerald-500 border-4 border-slate-950"></div>
          </div>
          <h3 className="text-xl font-bold">{session?.name}</h3>
          <p className="text-sm text-indigo-400 font-medium capitalize">{session?.role}</p>
          <div className="mt-6 w-full space-y-2 border-t border-slate-800 pt-6">
             <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={16} /> {session?.email}
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-400">
                <Fingerprint size={16} /> ID: {me?.id || 'N/A'}
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-400">
                <BookOpen size={16} /> Class: {me?.class?.name || 'N/A'}
             </div>
          </div>
        </div>

        <div className={`${card} lg:col-span-2`}>
          <div className="mb-6 flex items-center gap-3">
             <Lock size={20} className="text-rose-400" />
             <h3 className="text-lg font-bold">Security Settings</h3>
          </div>
          <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400 uppercase tracking-wider">Current Password</label>
              <input 
                type="password" 
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 outline-none focus:border-rose-500/50" 
                value={pass.current} 
                onChange={e => setPass({...pass, current: e.target.value})}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400 uppercase tracking-wider">New Password</label>
              <input 
                type="password" 
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 outline-none focus:border-indigo-500/50" 
                value={pass.new} 
                onChange={e => setPass({...pass, new: e.target.value})}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400 uppercase tracking-wider">Confirm New Password</label>
              <input 
                type="password" 
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 outline-none focus:border-indigo-500/50" 
                value={pass.confirm} 
                onChange={e => setPass({...pass, confirm: e.target.value})}
              />
            </div>
            <button type="submit" className={`${button} bg-rose-600 hover:bg-rose-500 mt-4 px-8`}>
              Update Password
            </button>
          </form>
          <p className="mt-6 text-xs text-slate-500">
            Note: Admin cannot view or modify your password. For your security, keep your password unique and confidential.
          </p>
        </div>
      </div>
    </Panel>
  )
}
