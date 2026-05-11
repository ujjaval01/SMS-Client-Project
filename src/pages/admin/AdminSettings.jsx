import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function AdminSettings({ db }) {
  return (
    <Panel>
      <div className={card}>
        <h3 className="mb-2 font-semibold">Institution branding</h3>
        <p className="text-sm text-slate-400">{db.instituteName}</p>
        <p className="mt-4 text-xs text-slate-500">
          Demo mode: connect Firebase / Supabase / Express API here for live configuration and RBAC.
        </p>
      </div>
    </Panel>
  )
}
