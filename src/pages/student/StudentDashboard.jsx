import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentDashboard({ me, myResults = [], db }) {
  const perf = myResults.slice(0, 5).map(r => ({
    name: r.subject?.name || 'Subject',
    v: r.marks
  }))

  return (
    <Panel>
      <div className={`${card} bg-cyan-500/10`}>
        <h3 className="text-lg font-semibold">Hi {me.user?.name || me.name}, your academic snapshot</h3>
        <p className="text-sm text-slate-300">
          Class {me.class?.name || 'N/A'}-{me.section} | Attendance {me.attendance || 0}%
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3 mt-4">
        <div className={`${card} lg:col-span-2 h-72`}>
          <h3 className="mb-3 font-semibold">Performance Trend</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={perf}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="v" stroke="#38bdf8" strokeWidth={3} dot={{ fill: '#38bdf8' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={card}>
          <h3 className="mb-3 font-semibold">Upcoming Assignments</h3>
          {db.assignments.length > 0 ? db.assignments.map((a) => (
            <p key={a.id} className="mb-2 rounded bg-white/5 p-2 text-sm border border-white/5">
              {a.title} <br/> <span className="text-xs text-slate-400">Due: {new Date(a.dueDate).toLocaleDateString()}</span>
            </p>
          )) : <p className="text-sm text-slate-500">No pending assignments</p>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <div className={card}>
          <h3 className="mb-3 font-semibold">Timetable Preview</h3>
          {db.schedule?.length > 0 ? db.schedule.map((s) => (
            <p key={s.id} className="text-sm text-slate-300 mb-1">
              {s.day}: {s.subject} ({s.startTime} - {s.endTime})
            </p>
          )) : <p className="text-sm text-slate-500">No schedule available</p>}
        </div>
        <div className={card}>
          <h3 className="mb-3 font-semibold">Latest Announcements</h3>
          {db.announcements.length > 0 ? db.announcements.map((n) => (
            <div key={n.id} className="mb-2 rounded bg-white/5 p-2 text-sm border-l-2 border-indigo-500">
              <div className="font-bold">{n.title}</div>
              <div className="text-xs text-slate-300">{n.content}</div>
            </div>
          )) : <p className="text-sm text-slate-500">No new announcements</p>}
        </div>
      </div>
    </Panel>
  )
}

