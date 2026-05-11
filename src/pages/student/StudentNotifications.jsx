import { Megaphone, Calendar, ShieldCheck } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentNotifications({ announcements = [] }) {
  return (
    <Panel>
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-400">
           <Megaphone /> Institutional Broadcasts
        </h2>
        
        {announcements.map((a) => (
          <div key={a.id} className={`${card} border-l-4 ${a.priority === 'High' ? 'border-amber-500' : 'border-indigo-500'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                 <h3 className="text-xl font-bold text-slate-100">{a.title}</h3>
                 <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-bold">
                       <Calendar size={12} /> {new Date(a.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] text-indigo-400 flex items-center gap-1 font-bold">
                       <ShieldCheck size={12} /> Verified Source
                    </span>
                 </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${a.priority === 'High' ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-400'}`}>
                 {a.priority}
              </span>
            </div>
            <div className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
              {a.content}
            </div>
          </div>
        ))}

        {announcements.length === 0 && (
          <div className={`${card} text-center py-20 text-slate-500`}>
             <Megaphone className="mx-auto mb-4 opacity-20" size={60} />
             <p className="italic font-medium">No active broadcasts at the moment.</p>
          </div>
        )}
      </div>
    </Panel>
  )
}
