import { useMemo, useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'
import { useAppStore } from '../../stores/useAppStore'

export function AdminUsers({ db, toast }) {
  const [q, setQ] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ id: '', name: '', email: '', password: '', classId: '', section: 'A' })
  const register = useAppStore((s) => s.register) // We'll repurpose this or add createStudent
  const apiCall = useAppStore((s) => s.api) // Not directly in store, but we can add a helper

  const users = useMemo(
    () => db.users.filter((u) => (u.name + u.email + u.role).toLowerCase().includes(q.toLowerCase())),
    [db.users, q],
  )

  const handleAddStudent = async (e) => {
    e.preventDefault()
    try {
      const { api } = await import('../../services/api')
      await api.post('/students', form)
      toast('Student created successfully')
      setShowAdd(false)
      setForm({ id: '', name: '', email: '', password: '', classId: '', section: 'A' })
      // Stats/DB will refresh via Socket or manual refresh
    } catch (err) {
      toast('Error: ' + err.message, 'error')
    }
  }

  return (
    <Panel>
      <div className={`${card} flex flex-wrap items-center gap-4`}>
        <div className="relative min-w-[200px] flex-1">
          <Search size={15} className="absolute left-2 top-2.5 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users by name, email, role..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2 pl-8 pr-3 text-sm"
          />
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500"
        >
          <Plus size={16} /> Create Student
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <form onSubmit={handleAddStudent} className="glass w-full max-w-md rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">New Student Account</h3>
              <button type="button" onClick={() => setShowAdd(false)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input required placeholder="Student ID (e.g. VNIT-2024-1001)" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" value={form.id} onChange={e => setForm({...form, id: e.target.value})} />
              <input required placeholder="Full Name" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input required type="email" placeholder="Email Address" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <input required type="password" placeholder="Initial Password" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              <select className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" value={form.classId} onChange={e => setForm({...form, classId: e.target.value})}>
                <option value="">Select Class (Optional)</option>
                {db.classes.map(c => <option key={c.id} value={c.id}>{c.name} - {c.section}</option>)}
              </select>
            </div>
            <button type="submit" className="mt-6 w-full rounded-xl bg-indigo-600 py-2.5 font-bold hover:bg-indigo-500">Create Account</button>
          </form>
        </div>
      )}

      <div className={`${card} overflow-auto`}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Role</th>
              <th className="pb-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-700/50">
                <td className="py-2">{u.name}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td className="text-right">
                  {u.role !== 'ADMIN' && (
                    <button type="button" className="text-rose-300 hover:underline">
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

