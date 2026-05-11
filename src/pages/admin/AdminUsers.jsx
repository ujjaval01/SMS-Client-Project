import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function AdminUsers({ db, updateDb, toast }) {
  const [q, setQ] = useState('')
  const users = useMemo(
    () => db.users.filter((u) => (u.name + u.email + u.role).toLowerCase().includes(q.toLowerCase())),
    [db.users, q],
  )

  const removeUser = (id) => {
    const u = db.users.find((x) => x.id === id)
    if (u?.role === 'admin') {
      toast('Administrator accounts cannot be removed in this demo.', 'error')
      return
    }
    updateDb((d) => {
      d.users = d.users.filter((x) => x.id !== id)
      d.activityLogs.unshift({
        id: crypto.randomUUID(),
        action: `User removed: ${u?.email}`,
        actor: 'Admin',
        time: 'just now',
      })
    })
    toast('User removed', 'default')
  }

  return (
    <Panel>
      <div className={`${card} flex flex-wrap gap-2`}>
        <div className="relative min-w-[200px] flex-1">
          <Search size={15} className="absolute left-2 top-2.5 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users by name, email, role..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2 pl-8 pr-3 text-sm"
          />
        </div>
      </div>
      <div className={`${card} overflow-auto`}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Role</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-700/50">
                <td className="py-2">{u.name}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td>
                  {u.role !== 'admin' && (
                    <button type="button" className="text-rose-300 hover:underline" onClick={() => removeUser(u.id)}>
                      Remove
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
