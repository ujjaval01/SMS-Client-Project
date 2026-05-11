import { useState } from 'react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherAnnouncements({ db, updateDb }) {
  const [text, setText] = useState('')
  return (
    <Panel>
      <div className={`${card} flex gap-2`}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded border border-slate-700 bg-slate-900/60 px-3 py-2"
          placeholder="Send announcement"
        />
        <button
          type="button"
          onClick={() =>
            text && updateDb((d) => d.announcements.unshift({ id: crypto.randomUUID(), text, time: 'now' }))
          }
          className="rounded bg-indigo-500/30 px-3 py-2"
        >
          Publish
        </button>
      </div>
      <div className={card}>
        {db.announcements.map((a) => (
          <p key={a.id} className="mb-2 rounded bg-white/5 p-2 text-sm">
            {a.text}
          </p>
        ))}
      </div>
    </Panel>
  )
}
