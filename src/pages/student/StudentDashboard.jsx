import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentDashboard({ me, myMarks, db }) {
  const perf = [
    { name: 'Math', v: myMarks.math },
    { name: 'Science', v: myMarks.science },
    { name: 'English', v: myMarks.english },
    { name: 'Social', v: myMarks.social },
  ]
  return (
    <Panel>
      <div className={`${card} bg-cyan-500/10`}>
        <h3 className="text-lg font-semibold">Hi {me.name}, your academic snapshot</h3>
        <p className="text-sm text-slate-300">
          Class {me.class}-{me.section} | Attendance {me.attendance}% | GPA {me.gpa}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2 h-72`}>
          <h3 className="mb-3 font-semibold">Subject Performance</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={perf}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="v" stroke="#38bdf8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={card}>
          <h3 className="mb-3 font-semibold">Upcoming Assignments</h3>
          {db.assignments.map((a) => (
            <p key={a.id} className="mb-2 rounded bg-white/5 p-2 text-sm">
              {a.title} - {a.dueDate}
            </p>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className={card}>
          <h3 className="mb-3 font-semibold">Timetable Preview</h3>
          {db.schedule.map((s) => (
            <p key={s.day + s.time} className="text-sm text-slate-300">
              {s.day}: {s.className} ({s.time})
            </p>
          ))}
        </div>
        <div className={card}>
          <h3 className="mb-3 font-semibold">Notifications</h3>
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
