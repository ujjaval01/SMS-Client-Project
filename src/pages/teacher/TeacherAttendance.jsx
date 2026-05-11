import { useState, useMemo } from 'react'
import { CheckCircle, XCircle, Search, Users } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card, button } from '../../lib/ui'
import { useAppStore } from '../../stores/useAppStore'

export function TeacherAttendance({ db, toast }) {
  const [selectedClass, setSelectedClass] = useState(db.classes[0]?.id || '')
  const [q, setQ] = useState('')
  const [marking, setMarking] = useState({}) // studentId -> status

  const filteredStudents = useMemo(() => {
    return db.students.filter(s => 
      s.classId === selectedClass && 
      (s.user?.name || s.name).toLowerCase().includes(q.toLowerCase())
    )
  }, [db.students, selectedClass, q])

  const markAttendance = async (studentId, status) => {
    try {
      const { api } = await import('../../services/api')
      await api.post('/attendance/mark', {
        studentId,
        status,
        date: new Date().toISOString()
      })
      
      setMarking(prev => ({ ...prev, [studentId]: status }))
      toast(`${status} marked successfully`, 'success')
    } catch (err) {
      toast('Failed to mark attendance', 'error')
    }
  }

  return (
    <Panel>
      <div className={`${card} mb-6 flex flex-wrap items-center gap-4`}>
        <div className="flex items-center gap-2 rounded-xl bg-slate-900/60 px-4 py-2 border border-slate-700">
          <Users size={18} className="text-indigo-400" />
          <select 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
            className="bg-transparent text-sm font-medium outline-none"
          >
            {db.classes.map(c => <option key={c.id} value={c.id}>{c.name} - {c.section}</option>)}
          </select>
        </div>
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-500" />
          <input 
            value={q} 
            onChange={e => setQ(e.target.value)}
            placeholder="Search students in class..." 
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2 pl-10 pr-3 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map(s => (
          <div key={s.id} className={`${card} flex items-center justify-between group hover:border-indigo-500/50 transition-colors`}>
            <div>
              <div className="font-bold">{s.user?.name || s.name}</div>
              <div className="text-xs text-slate-400">{s.id}</div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => markAttendance(s.id, 'Present')}
                className={`p-2 rounded-lg transition-all ${marking[s.id] === 'Present' ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'}`}
              >
                <CheckCircle size={18} />
              </button>
              <button 
                onClick={() => markAttendance(s.id, 'Absent')}
                className={`p-2 rounded-lg transition-all ${marking[s.id] === 'Absent' ? 'bg-rose-500 text-white' : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'}`}
              >
                <XCircle size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredStudents.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No students found for the selected class.
        </div>
      )}
    </Panel>
  )
}
