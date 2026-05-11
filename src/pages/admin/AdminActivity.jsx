import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function AdminActivity({ db }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-3 font-semibold">Recent system activity</h3>
        <ul className="space-y-2 text-sm">
          {db.activityLogs.map((log) => (
            <li key={log.id} className="flex flex-wrap justify-between gap-2 rounded-lg bg-slate-900/40 px-3 py-2">
              <span>{log.action}</span>
              <span className="text-slate-500">
                {log.actor} · {log.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}
