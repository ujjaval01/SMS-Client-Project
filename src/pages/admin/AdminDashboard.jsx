import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function AdminDashboard({ db }) {
  const { monthlyAttendance, feeCollection, studentGrowth } = db.analytics || {
    monthlyAttendance: [],
    feeCollection: [],
    studentGrowth: [],
  }
  const collected = db.fees?.filter((f) => f.status === 'Paid').length || 0
  const pendingFee = db.fees?.filter((f) => f.status !== 'Paid').length || 0

  return (
    <Panel>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { t: 'Students', v: db.students.length },
          { t: 'Teachers', v: db.teachers?.length ?? 0 },
          { t: 'Fees cleared', v: collected },
          { t: 'Pending fee cases', v: pendingFee },
        ].map((x) => (
          <div key={x.t} className={`${card} border-emerald-500/20 bg-emerald-950/20`}>
            <p className="text-xs text-slate-400">{x.t}</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-200">{x.v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2 h-72`}>
          <h3 className="mb-2 font-semibold text-slate-200">Attendance trend</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={monthlyAttendance}>
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Area type="monotone" dataKey="pct" stroke="#34d399" fill="rgba(52,211,153,0.25)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={`${card} h-72`}>
          <h3 className="mb-2 font-semibold text-slate-200">Student growth</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={studentGrowth}>
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={`${card} h-64`}>
        <h3 className="mb-2 font-semibold text-slate-200">Fee collection (₹ lakhs)</h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={feeCollection}>
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="lakhs" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
