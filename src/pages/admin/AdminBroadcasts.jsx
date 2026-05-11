import { useState } from 'react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'
import { Megaphone, Send, Clock, Trash2 } from 'lucide-react'

export function AdminBroadcasts({ db, toast }) {
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
      <div className={`${card} border-l-4 border-indigo-500`}>
        <div className="mb-4 flex items-center gap-2 text-indigo-400">
          <Megaphone size={20} />
          <h3 className="font-bold">Create New Broadcast</h3>
        </div>
        <div className="grid gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement Title (e.g., Holiday Notice)"
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:border-indigo-500 outline-none"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your message here..."
            rows={3}
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:border-indigo-500 outline-none"
          />
          <div className="flex items-center justify-between">
            <select 
              value={priority} 
              onChange={e => setPriority(e.target.value)}
              className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold outline-none"
            >
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
            <button 
              disabled={loading}
              onClick={publish} 
              className={`${button} bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2`}
            >
              {loading ? 'Publishing...' : <><Send size={16} /> Publish Notice</>}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        <h3 className="flex items-center gap-2 font-bold text-slate-300">
          <Clock size={18} /> Recent Announcements
        </h3>
        {db.announcements.map((a) => (
          <div key={a.id} className={`${card} border-l-2 ${a.priority === 'High' ? 'border-amber-500' : 'border-slate-700'}`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-indigo-300">{a.title}</h4>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${a.priority === 'High' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-400'}`}>
                {a.priority}
              </span>
            </div>
            <p className="text-sm text-slate-300">{a.content}</p>
            <div className="mt-2 text-[10px] text-slate-500">
              {new Date(a.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
        {db.announcements.length === 0 && (
          <div className="text-center py-8 text-slate-500 italic">No announcements yet.</div>
        )}
      </div>
    </Panel>
  )
}
