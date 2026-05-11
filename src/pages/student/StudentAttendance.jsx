import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentAttendance({ me }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-2 font-semibold">My Attendance</h3>
        <p className="text-4xl font-bold text-cyan-300">{me.attendance}%</p>
      </div>
    </Panel>
  )
}
