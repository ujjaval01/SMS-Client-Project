import { Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

const COLORS = ['#34d399', '#3b82f6', '#a78bfa', '#f472b6']

export function AdminAnalytics({ db }) {
  const sectionMix = [
    { name: 'Section A', value: db.students.filter((s) => s.section === 'A').length },
    { name: 'Section B', value: db.students.filter((s) => s.section === 'B').length },
  ]
  const perf = db.students.slice(0, 8).map((s) => ({
    id: s.id.slice(-4),
    att: s.attendance,
    gpa: s.gpa * 10,
  }))

  return (
    <Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={`${card} h-72`}>
          <h3 className="mb-2 font-semibold">Section distribution</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={sectionMix} dataKey="value" innerRadius={48} outerRadius={72}>
                {COLORS.map((c) => (
                  <Cell key={c} fill={c} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={`${card} h-72`}>
          <h3 className="mb-2 font-semibold">Attendance vs GPA index</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={perf}>
              <XAxis dataKey="id" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="att" stroke="#34d399" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="gpa" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Panel>
  )
}
