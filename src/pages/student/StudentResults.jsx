import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentResults({ myMarks }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-2 font-semibold">My Semester Results</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(myMarks)
            .filter(([k]) => k !== 'studentId')
            .map(([k, v]) => (
              <div key={k} className="rounded bg-white/5 p-2 capitalize">
                {k}: {v}
              </div>
            ))}
        </div>
      </div>
    </Panel>
  )
}
