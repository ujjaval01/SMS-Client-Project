import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherAttendance({ updateDb }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-2 font-semibold">Attendance Controls</h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded bg-emerald-500/30 px-3 py-1"
            onClick={() =>
              updateDb((d) => {
                d.students = d.students.map((s) => ({
                  ...s,
                  attendance: Math.min(100, s.attendance + 1),
                }))
              })
            }
          >
            Mark Present +1
          </button>
          <button
            type="button"
            className="rounded bg-rose-500/30 px-3 py-1"
            onClick={() =>
              updateDb((d) => {
                d.students = d.students.map((s) => ({
                  ...s,
                  attendance: Math.max(45, s.attendance - 1),
                }))
              })
            }
          >
            Mark Absent -1
          </button>
        </div>
      </div>
    </Panel>
  )
}
