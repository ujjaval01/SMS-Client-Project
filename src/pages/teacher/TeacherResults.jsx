import { useState } from 'react'
import { Award, Search, Save, BookOpen } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'

export function TeacherResults({ db, toast }) {
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [marks, setMarks] = useState('')
  const [total, setTotal] = useState('100')
  const [term, setTerm] = useState('Final-Term')
  const [loading, setLoading] = useState(false)

  const handlePublish = async (e) => {
    e.preventDefault()
    if (!selectedStudent || !selectedSubject || !marks) return
    
    setLoading(true)
    try {
      const { api } = await import('../../services/api')
      await api.post('/results/publish', {
        studentId: selectedStudent,
        subjectId: selectedSubject,
        marks,
        total,
        term
      })
      toast('Result published successfully!', 'success')
      setMarks('')
    } catch (err) {
      toast('Failed to publish result', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className={`${card} lg:col-span-1`}>
          <div className="mb-4 flex items-center gap-2 text-indigo-400">
            <Award size={20} />
            <h3 className="font-bold text-lg">Publish Marks</h3>
          </div>
          <form onSubmit={handlePublish} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Student</label>
              <select 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                value={selectedStudent}
                onChange={e => setSelectedStudent(e.target.value)}
              >
                <option value="">-- Choose Student --</option>
                {db.students.map(s => <option key={s.id} value={s.id}>{s.user?.name} ({s.id})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Subject</label>
              <select 
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
              >
                <option value="">-- Choose Subject --</option>
                {/* Fallback to simple list if subjects aren't loaded */}
                {(db.subjects?.length > 0 ? db.subjects : [
                  {id: '1', name: 'Data Structures'},
                  {id: '2', name: 'Operating Systems'},
                  {id: '3', name: 'Mathematics'}
                ]).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Marks Obtained</label>
                <input required type="number" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm" value={marks} onChange={e => setMarks(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Total Marks</label>
                <input required type="number" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm" value={total} onChange={e => setTotal(e.target.value)} />
              </div>
            </div>
            <button 
              disabled={loading}
              className={`${button} w-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center gap-2`}
            >
              <Save size={18} /> {loading ? 'Publishing...' : 'Publish Grade'}
            </button>
          </form>
        </div>

        <div className={`${card} lg:col-span-2`}>
          <div className="mb-4 flex items-center gap-2 text-slate-300 font-bold">
            <BookOpen size={20} /> Latest Results
          </div>
          <div className="overflow-auto max-h-[400px]">
             <table className="w-full text-left text-sm">
                <thead>
                   <tr className="text-slate-500 border-b border-slate-800">
                      <th className="pb-2">Student</th>
                      <th className="pb-2">Subject</th>
                      <th className="pb-2">Score</th>
                      <th className="pb-2">Grade</th>
                   </tr>
                </thead>
                <tbody>
                   {db.results?.map(r => (
                     <tr key={r.id} className="border-b border-slate-800/50">
                        <td className="py-2 text-xs">{r.student?.user?.name || r.studentId}</td>
                        <td className="py-2 text-xs">{r.subject?.name || 'Academic'}</td>
                        <td className="py-2 font-bold">{r.marks}/{r.total}</td>
                        <td className="py-2"><span className="text-emerald-400 font-bold">{r.grade}</span></td>
                     </tr>
                   ))}
                </tbody>
             </table>
             {(!db.results || db.results.length === 0) && (
               <div className="text-center py-12 text-slate-600 italic">No records published yet.</div>
             )}
          </div>
        </div>
      </div>
    </Panel>
  )
}
