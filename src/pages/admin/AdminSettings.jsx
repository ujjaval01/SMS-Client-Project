import { Settings, Shield, Bell, Globe, Database, User } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'

export function AdminSettings() {
  return (
    <Panel>
      <div className="grid gap-6 md:grid-cols-2">
        <div className={card}>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-indigo-500/20 p-2 text-indigo-400">
              <Globe size={20} />
            </div>
            <h3 className="font-bold">Institute Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400">Institute Name</label>
              <input readOnly value="Lovely Professional University, Phagwara" className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-slate-400">Academic Year</label>
              <select className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm">
                <option>2024-2025</option>
                <option>2023-2024</option>
              </select>
            </div>
            <button className={`${button} bg-indigo-600 w-full`}>Save Profile</button>
          </div>
        </div>

        <div className={card}>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
              <Database size={20} />
            </div>
            <h3 className="font-bold">Database & Backup</h3>
          </div>
          <p className="mb-6 text-sm text-slate-400">Manage your SQLite database backups and data retention policies.</p>
          <div className="flex gap-2">
            <button className={`${button} flex-1 border border-slate-700 hover:bg-slate-800`}>Export DB</button>
            <button className={`${button} flex-1 border border-slate-700 hover:bg-slate-800`}>Restore</button>
          </div>
        </div>

        <div className={card}>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-amber-500/20 p-2 text-amber-400">
              <Shield size={20} />
            </div>
            <h3 className="font-bold">System Security</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-slate-900/40 p-3">
              <span className="text-sm">Two-Factor Auth</span>
              <div className="h-5 w-10 rounded-full bg-slate-700"></div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-900/40 p-3">
              <span className="text-sm">Audit Logging</span>
              <div className="h-5 w-10 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-rose-500/20 p-2 text-rose-400">
              <Bell size={20} />
            </div>
            <h3 className="font-bold">Global Notifications</h3>
          </div>
          <p className="mb-4 text-sm text-slate-400">Configure how notifications are sent to students and teachers.</p>
          <div className="flex gap-4">
             <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Email</label>
             <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Push</label>
             <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> SMS</label>
          </div>
        </div>
      </div>
    </Panel>
  )
}
