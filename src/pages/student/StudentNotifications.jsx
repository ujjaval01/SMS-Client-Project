import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentNotifications({ announcements }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-2 font-semibold">Notifications</h3>
        {announcements.map((a) => (
          <p key={a.id} className="mb-2 rounded bg-white/5 p-2 text-sm">
            {a.text}
          </p>
        ))}
      </div>
    </Panel>
  )
}
