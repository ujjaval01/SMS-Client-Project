import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherStudents({ db, updateDb }) {
  const [q, setQ] = useState('')
  const students = useMemo(
    () => db.students.filter((s) => (s.name + s.id).toLowerCase().includes(q.toLowerCase())),
    [db.students, q],
  )
  const add = () =>
    updateDb((d) =>
      d.students.unshift({
        id: `VNIT-2024-${Math.floor(7000 + Math.random() * 2999)}`,
        name: 'New Student',
        class: '10',
        section: 'A',
        contact: '9000000000',
        attendance: 80,
        gpa: 7.5,
      }),
    )
  const remove = (id) =>
    updateDb((d) => {
      d.students = d.students.filter((s) => s.id !== id)
      d.marks = d.marks.filter((m) => m.studentId !== id)
    })

  return (
    <Panel>
      <div className={`${card} flex gap-2`}>
        <button type="button" onClick={add} className="glow-button rounded px-3 py-2 text-sm text-white">
          Add Student
        </button>
        <div className="relative ml-auto">
          <Search size={15} className="absolute left-2 top-2.5" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search student..."
            className="rounded border border-slate-700 bg-slate-900/60 py-2 pl-8 pr-2 text-sm"
          />
        </div>
      </div>
      <div className={`${card} overflow-auto`}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Attendance</th>
              <th>GPA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-slate-700/40">
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>
                  {s.class}-{s.section}
                </td>
                <td>{s.attendance}%</td>
                <td>{s.gpa}</td>
                <td>
                  <button type="button" className="text-rose-300" onClick={() => remove(s.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
