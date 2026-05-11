import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentTimetable({ schedule }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-2 font-semibold">Weekly Timetable</h3>
        {schedule.map((s) => (
          <p key={s.day + s.className} className="text-sm">
            {s.day} - {s.className} ({s.time})
          </p>
        ))}
      </div>
    </Panel>
  )
}
