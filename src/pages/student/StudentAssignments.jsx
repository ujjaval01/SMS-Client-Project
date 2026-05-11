import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentAssignments({ assignments }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-2 font-semibold">Assignments</h3>
        {assignments.map((a) => (
          <div key={a.id} className="mb-2 rounded bg-white/5 p-2 text-sm">
            {a.title} | {a.subject} | {a.status}
          </div>
        ))}
      </div>
    </Panel>
  )
}
