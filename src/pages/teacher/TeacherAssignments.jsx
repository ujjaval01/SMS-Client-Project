import { useState } from 'react'
import { FilePlus, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'

export function TeacherAssignments({ db, toast }) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [classId, setClassId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title || !dueDate || !classId) return
    setLoading(true)
    try {
      const { api } = await import('../../services/api')
      await api.post('/assignments', { title, dueDate, classId })
      toast('Assignment assigned successfully!', 'success')
      setTitle('')
      setDueDate('')
    } catch (err) {
      toast('Failed to create assignment', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel>
      <div className="grid gap-6 md:grid-cols-2">
        <div className={card}>
          <div className="mb-4 flex items-center gap-2 text-indigo-400">
            <FilePlus size={20} />
            <h3 className="font-bold">Assign New Work</h3>
          </div>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Assignment Title</label>
              <input required placeholder="e.g. Lab Report 1" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Class</label>
              <select required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm" value={classId} onChange={e => setClassId(e.target.value)}>
                <option value="">-- Choose Class --</option>
                {db.classes.map(c => <option key={c.id} value={c.id}>{c.name} - {c.section}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Due Date</label>
              <input required type="date" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <button disabled={loading} className={`${button} w-full bg-indigo-600 hover:bg-indigo-500`}>
              {loading ? 'Processing...' : 'Create Assignment'}
            </button>
          </form>
        </div>

        <div className={card}>
          <div className="mb-4 flex items-center gap-2 text-slate-300 font-bold">
            <Clock size={20} /> active Assignments
          </div>
          <div className="space-y-3">
            {db.assignments?.map(a => (
              <div key={a.id} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex justify-between items-center group">
                <div>
                  <div className="font-bold text-slate-100">{a.title}</div>
                  <div className="text-xs text-slate-400">Due: {new Date(a.dueDate).toLocaleDateString()} | {a.class?.name}</div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {(!db.assignments || db.assignments.length === 0) && (
              <div className="text-center py-12 text-slate-600 italic font-medium">No assignments posted.</div>
            )}
          </div>
        </div>
      </div>
    </Panel>
  )
}
