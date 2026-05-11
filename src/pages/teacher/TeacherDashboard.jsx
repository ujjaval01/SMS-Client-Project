import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherDashboard({ db }) {
  const data = db.students.slice(0, 8).map((s) => ({ n: s.id.slice(-4), a: s.attendance, g: s.gpa * 10 }))
  return (
    <Panel>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { t: 'Students', v: db.students.length },
          { t: 'Assignments', v: db.assignments.length },
          { t: 'Announcements', v: db.announcements.length },
          { t: 'Pending Tasks', v: db.assignments.filter((a) => a.status === 'Pending').length },
        ].map((s) => (
          <div key={s.t} className={`${card} bg-indigo-500/10`}>
            <p className="text-xs text-slate-300">{s.t}</p>
            <h3 className="mt-2 text-2xl font-semibold">{s.v}</h3>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2 h-72`}>
          <h3 className="mb-2 font-semibold">Class Performance</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data}>
              <XAxis dataKey="n" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="a" fill="#818cf8" />
              <Bar dataKey="g" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={card}>
          <h3 className="mb-2 font-semibold">Recent Activities</h3>
          {db.announcements.map((n) => (
            <p key={n.id} className="mb-2 rounded bg-white/5 p-2 text-sm">
              {n.text}
            </p>
          ))}
        </div>
      </div>
    </Panel>
  )
}
