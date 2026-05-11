import { useState } from 'react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function AdminBroadcasts({ db, updateDb, toast }) {
  const [text, setText] = useState('')

  const publish = () => {
    if (!text.trim()) return
    updateDb((d) => {
      d.announcements.unshift({ id: crypto.randomUUID(), text, time: 'just now' })
      d.activityLogs.unshift({
        id: crypto.randomUUID(),
        action: `Broadcast: ${text.slice(0, 80)}${text.length > 80 ? '…' : ''}`,
        actor: 'Admin',
        time: 'just now',
      })
    })
    setText('')
    toast('Notice published', 'default')
  }

  return (
    <Panel>
      <div className={`${card} flex flex-col gap-2 md:flex-row`}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Broadcast announcement to all portals..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm"
        />
        <button type="button" onClick={publish} className="glow-button rounded-lg px-4 py-2 text-sm font-semibold text-white">
          Publish
        </button>
      </div>
      <div className={card}>
        {db.announcements.map((a) => (
          <p key={a.id} className="mb-2 rounded-lg bg-slate-900/40 p-3 text-sm">
            {a.text}
            <span className="ml-2 text-xs text-slate-500">{a.time}</span>
          </p>
        ))}
      </div>
    </Panel>
  )
}
