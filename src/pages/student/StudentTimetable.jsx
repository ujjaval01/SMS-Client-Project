import { Calendar, Clock, MapPin } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentTimetable({ schedule = [] }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  return (
    <Panel>
      <div className="grid gap-6 lg:grid-cols-5">
        {days.map((day) => (
          <div key={day} className="flex flex-col gap-3">
            <div className="text-center font-bold text-cyan-400 border-b border-cyan-500/30 pb-2 uppercase tracking-widest text-xs">
              {day}
            </div>
            <div className="space-y-3">
              {schedule?.filter(s => s.day === day).map((s) => (
                <div key={s.id} className={`${card} p-3 group border-l-2 border-cyan-500/50 hover:bg-cyan-500/5 transition-colors`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <Clock size={10} /> {s.startTime}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-200">{s.subject}</div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin size={10} /> Room {Math.floor(Math.random() * 500 + 100)}
                  </div>
                </div>
              ))}
              {schedule?.filter(s => s.day === day).length === 0 && (
                <div className="text-[10px] text-slate-600 italic text-center py-4">No classes</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
