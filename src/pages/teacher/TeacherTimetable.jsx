import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherTimetable({ db, updateDb }) {
  const addSlot = () =>
    updateDb((d) => d.schedule.push({ day: 'Fri', className: 'Advisory', time: '03:00 PM' }))
  return (
    <Panel>
      <div className={`${card} flex items-center justify-between`}>
        <h3 className="font-semibold">Timetable Management</h3>
        <button type="button" onClick={addSlot} className="rounded bg-indigo-500/30 px-3 py-1">
          Add Slot
        </button>
      </div>
      <div className={card}>
        {db.schedule.map((s, i) => (
          <p key={`${s.day}-${i}`} className="mb-2 rounded bg-white/5 p-2 text-sm">
            {s.day} - {s.className} ({s.time})
          </p>
        ))}
      </div>
    </Panel>
  )
}
