import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherAnalytics({ db }) {
  const classMix = [
    { name: 'A', value: db.students.filter((s) => s.section === 'A').length },
    { name: 'B', value: db.students.filter((s) => s.section === 'B').length },
  ]
  return (
    <Panel>
      <div className={`${card} h-72`}>
        <h3 className="mb-2 font-semibold">Section Distribution</h3>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie data={classMix} dataKey="value" innerRadius={50} outerRadius={80}>
              {['#06b6d4', '#a78bfa'].map((c) => (
                <Cell key={c} fill={c} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
