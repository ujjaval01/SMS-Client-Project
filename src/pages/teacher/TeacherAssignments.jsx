import { useState } from 'react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherAssignments({ db, updateDb }) {
  const [title, setTitle] = useState('')
  return (
    <Panel>
      <div className={`${card} flex gap-2`}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 rounded border border-slate-700 bg-slate-900/60 px-3 py-2"
          placeholder="Upload assignment"
        />
        <button
          type="button"
          onClick={() =>
            title &&
            updateDb((d) =>
              d.assignments.unshift({
                id: crypto.randomUUID(),
                title,
                dueDate: '2026-06-01',
                status: 'Pending',
                subject: 'General',
                notes: 'Uploaded by teacher',
              }),
            )
          }
          className="glow-button rounded px-3 py-2 text-white"
        >
          Upload
        </button>
      </div>
      <div className={card}>
        {db.assignments.map((a) => (
          <p key={a.id} className="mb-2 rounded bg-white/5 p-2 text-sm">
            {a.title} - {a.status}
          </p>
        ))}
      </div>
    </Panel>
  )
}
