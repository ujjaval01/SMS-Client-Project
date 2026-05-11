import { useState } from 'react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function AdminClasses({ db, updateDb, toast }) {
  const [program, setProgram] = useState('B.Tech CSE')
  const [year, setYear] = useState('2nd Year')
  const [section, setSection] = useState('C')
  const [strength, setStrength] = useState('52')

  const addClass = () => {
    updateDb((d) => {
      d.classes.push({
        id: crypto.randomUUID(),
        program,
        year,
        section,
        strength: Number(strength) || 0,
      })
      d.activityLogs.unshift({
        id: crypto.randomUUID(),
        action: `New class added: ${program} ${year} Sec ${section}`,
        actor: 'Admin',
        time: 'just now',
      })
    })
    toast('Class created', 'default')
  }

  return (
    <Panel>
      <div className={`${card} grid gap-3 md:grid-cols-4`}>
        <input
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm"
        />
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm"
        />
        <input
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm"
          placeholder="Section"
        />
        <input
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm"
          placeholder="Strength"
        />
        <button type="button" onClick={addClass} className="glow-button rounded-lg py-2 text-sm font-semibold text-white md:col-span-4">
          Add class
        </button>
      </div>
      <div className={card}>
        <h3 className="mb-3 font-semibold">Programs & sections</h3>
        <div className="grid gap-2 md:grid-cols-2">
          {db.classes.map((c) => (
            <div key={c.id} className="rounded-xl bg-slate-900/50 p-3 text-sm">
              <p className="font-medium text-slate-200">
                {c.program} · {c.year} · Sec {c.section}
              </p>
              <p className="text-slate-400">Strength: {c.strength}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}
