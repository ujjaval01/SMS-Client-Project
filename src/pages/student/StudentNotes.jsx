import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentNotes({ notes }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-2 font-semibold">Notes & Study Material</h3>
        {notes.map((n) => (
          <div key={n.id} className="mb-2 flex items-center justify-between rounded bg-white/5 p-2 text-sm">
            <span>{n.title}</span>
            <button type="button" className="rounded bg-cyan-500/20 px-2 py-1">
              Download
            </button>
          </div>
        ))}
      </div>
    </Panel>
  )
}
