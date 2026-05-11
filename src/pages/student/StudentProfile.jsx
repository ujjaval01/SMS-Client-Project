import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function StudentProfile({ session, me }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-2 font-semibold">Personal Profile</h3>
        <p className="text-sm">Name: {session.name}</p>
        <p className="text-sm">Email: {session.email}</p>
        <p className="text-sm">Student ID: {me.id}</p>
        <div className="mt-3 rounded bg-white/5 p-2 text-sm">
          Editable settings are limited to profile preferences.
        </div>
      </div>
    </Panel>
  )
}
