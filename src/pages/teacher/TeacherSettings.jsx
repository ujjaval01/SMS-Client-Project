import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherSettings() {
  return (
    <Panel>
      <div className={card}>
        <h3 className="font-semibold">Teacher Settings</h3>
        <p className="text-sm text-slate-300">Portal preferences, grading templates, and class defaults.</p>
      </div>
    </Panel>
  )
}
