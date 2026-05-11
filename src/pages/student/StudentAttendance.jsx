import { Calendar, CheckCircle, XCircle } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentAttendance({ me, db }) {
  // Mock daily logs for visual flair
  const logs = [
    { date: 'May 11', status: 'Present' },
    { date: 'May 10', status: 'Present' },
    { date: 'May 09', status: 'Absent' },
    { date: 'May 08', status: 'Present' },
    { date: 'May 07', status: 'Present' },
  ]

  return (
    <Panel>
      <div className="grid gap-6 md:grid-cols-3">
        <div className={`${card} md:col-span-1 flex flex-col items-center justify-center py-8 bg-indigo-500/5`}>
           <div className="relative h-32 w-32 mb-4">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                 <path className="stroke-slate-800 stroke-[3] fill-none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 <path className="stroke-indigo-500 stroke-[3] stroke-dasharray-[92,100] fill-none" strokeDasharray={`${me.attendancePct}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-bold">{me.attendancePct}%</span>
                 <span className="text-[10px] uppercase text-slate-500">Overall</span>
              </div>
           </div>
           <h3 className="font-bold text-slate-300 tracking-wide uppercase text-xs">Attendance Health</h3>
        </div>

        <div className={`${card} md:col-span-2`}>
           <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Calendar className="text-cyan-400" /> Recent Daily Log
           </h3>
           <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                   <div className="font-medium text-slate-200">{log.date}, 2024</div>
                   <div className={`flex items-center gap-2 font-bold text-xs ${log.status === 'Present' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {log.status === 'Present' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {log.status}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </Panel>
  )
}
