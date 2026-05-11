import { Users, BookOpen, CheckCircle, Clock } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherDashboard({ db }) {
  const stats = [
    { label: 'Total Students', value: db.students?.length || 0, icon: Users, color: 'text-indigo-400' },
    { label: 'Active Classes', value: db.classes?.length || 0, icon: BookOpen, color: 'text-cyan-400' },
    { label: 'Assignments', value: db.assignments?.length || 0, icon: Clock, color: 'text-amber-400' },
    { label: 'Results Published', value: db.results?.length || 0, icon: CheckCircle, color: 'text-emerald-400' },
  ]

  return (
    <Panel>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={card}>
            <div className="flex items-center justify-between mb-2">
              <s.icon className={s.color} size={20} />
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <div className={card}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Clock size={18} className="text-amber-400" /> Recent Activity
          </h3>
          <div className="space-y-3">
             {db.activityLogs?.slice(0, 5).map(log => (
               <div key={log.id} className="flex gap-3 text-sm p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                  <div>
                    <div className="font-bold">{log.action}</div>
                    <div className="text-xs text-slate-500">{log.actor} • {new Date(log.createdAt).toLocaleTimeString()}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className={card}>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Users size={18} className="text-emerald-400" /> Quick Attendance Check
          </h3>
          <div className="space-y-4">
            {db.classes?.slice(0, 3).map(c => (
              <div key={c.id}>
                 <div className="flex justify-between text-xs font-bold mb-1 uppercase text-slate-400">
                    <span>{c.name} - {c.section}</span>
                    <span>{Math.floor(Math.random() * 20 + 80)}%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}
