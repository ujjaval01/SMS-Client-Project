import { Upload, FileText, CheckCircle } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'
import { useState } from 'react'

export function StudentAssignments({ assignments = [], toast }) {
  const [submitting, setSubmitting] = useState({})

  const handleSubmit = (id) => {
    setSubmitting(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setSubmitting(prev => ({ ...prev, [id]: 'done' }))
      toast('Assignment submitted successfully!', 'success')
    }, 1500)
  }

  return (
    <Panel>
      <div className="grid gap-6">
        {assignments.map((a) => (
          <div key={a.id} className={`${card} flex flex-wrap items-center justify-between gap-4 border-l-4 border-indigo-500`}>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-indigo-500/20 p-3 text-indigo-400">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{a.title}</h3>
                <p className="text-sm text-slate-400">Subject: {a.subject?.name || 'Academic'} | Due: {new Date(a.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {submitting[a.id] === 'done' ? (
                <span className="flex items-center gap-2 text-emerald-400 font-medium bg-emerald-500/10 px-4 py-2 rounded-xl">
                  <CheckCircle size={18} /> Submitted
                </span>
              ) : (
                <button 
                  disabled={submitting[a.id]}
                  onClick={() => handleSubmit(a.id)}
                  className={`${button} bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2`}
                >
                  {submitting[a.id] ? 'Uploading...' : <><Upload size={18} /> Submit Work</>}
                </button>
              )}
            </div>
          </div>
        ))}
        {assignments.length === 0 && (
          <div className={`${card} text-center py-12 text-slate-500`}>
            No pending assignments found. Great job!
          </div>
        )}
      </div>
    </Panel>
  )
}
