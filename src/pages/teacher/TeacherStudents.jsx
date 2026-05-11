import { useMemo, useState } from 'react'
import { Search, UserPlus } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'

export function TeacherStudents({ db }) {
  const [q, setQ] = useState('')
  
  const students = useMemo(
    () => db.students.filter((s) => ( (s.user?.name || s.name) + s.id).toLowerCase().includes(q.toLowerCase())),
    [db.students, q],
  )

  return (
    <Panel>
      <div className={`${card} flex items-center justify-between gap-4 mb-4`}>
        <div className="font-bold text-lg text-indigo-400">Student Directory</div>
        <div className="relative min-w-[300px]">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or ID..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2 pl-10 pr-3 text-sm focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className={`${card} overflow-hidden border-slate-800`}>
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Class & Section</th>
              <th className="px-4 py-3 text-center">Attendance</th>
              <th className="px-4 py-3 text-right">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-slate-800/50 hover:bg-white/5 transition-colors group">
                <td className="px-4 py-3 font-mono text-xs text-indigo-300">{s.id}</td>
                <td className="px-4 py-3 font-semibold text-slate-100">{s.user?.name || s.name}</td>
                <td className="px-4 py-3">
                  <span className="bg-slate-800 px-2 py-0.5 rounded-md text-xs font-medium">
                    {s.class?.name || 'Unassigned'} - {s.section}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${s.attendancePct > 85 ? 'bg-emerald-500' : s.attendancePct > 75 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                        style={{ width: `${s.attendancePct}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold">{s.attendancePct}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-slate-400">{s.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && (
          <div className="text-center py-12 text-slate-500 italic">No students matching your search.</div>
        )}
      </div>
    </Panel>
  )
}
