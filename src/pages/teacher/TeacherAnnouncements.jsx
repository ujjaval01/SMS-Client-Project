import { useState } from 'react'
import { Megaphone, Send, Clock, AlertCircle } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'

export function TeacherAnnouncements({ db, toast }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState('Normal')
  const [loading, setLoading] = useState(false)

  const publish = async () => {
    if (!title.trim() || !content.trim()) return
    setLoading(true)
    try {
      const { api } = await import('../../services/api')
      await api.post('/announcements', { title, content, priority })
      setTitle('')
      setContent('')
      toast('Notice published to all portals!', 'success')
    } catch (err) {
      toast('Failed to publish notice', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`${card} border-l-4 border-cyan-500`}>
          <div className="mb-4 flex items-center gap-2 text-cyan-400">
            <Megaphone size={20} />
            <h3 className="font-bold">Staff Announcement</h3>
          </div>
          <div className="grid gap-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement Title"
              className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:border-cyan-500 outline-none"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Message to students..."
              rows={4}
              className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:border-cyan-500 outline-none"
            />
            <div className="flex items-center justify-between">
              <select value={priority} onChange={e => setPriority(e.target.value)} className="bg-slate-800 rounded px-2 py-1 text-xs">
                <option>Normal</option>
                <option>High</option>
              </select>
              <button disabled={loading} onClick={publish} className={`${button} bg-cyan-600 hover:bg-cyan-500 flex items-center gap-2`}>
                {loading ? 'Sending...' : <><Send size={16} /> Broadcast</>}
              </button>
            </div>
          </div>
        </div>

        <div className={card}>
          <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-300">
            <Clock size={18} /> Global Notifications
          </h3>
          <div className="space-y-3 overflow-auto max-h-[500px]">
            {db.announcements.map((a) => (
              <div key={a.id} className="p-3 rounded-xl bg-slate-900/40 border-l-2 border-slate-700">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-cyan-300 text-sm">{a.title}</h4>
                  <span className="text-[9px] uppercase bg-slate-800 px-2 py-0.5 rounded-full">{a.priority}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}
