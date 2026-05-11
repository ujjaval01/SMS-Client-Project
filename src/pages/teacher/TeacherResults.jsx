import jsPDF from 'jspdf'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function TeacherResults({ db, updateDb }) {
  const addMarks = () =>
    updateDb((d) =>
      d.marks.push({ studentId: d.students[0].id, math: 75, science: 80, english: 78, social: 82 }),
    )
  const removeLast = () => updateDb((d) => d.marks.pop())
  const exportPdf = () => {
    const pdf = new jsPDF()
    pdf.text('Teacher Results Export', 20, 20)
    db.marks.slice(-10).forEach((m, i) =>
      pdf.text(`${m.studentId} - M:${m.math} S:${m.science} E:${m.english} So:${m.social}`, 20, 34 + i * 8),
    )
    pdf.save('teacher-results.pdf')
  }

  return (
    <Panel>
      <div className={`${card} flex gap-2`}>
        <button type="button" onClick={addMarks} className="glow-button rounded px-3 py-2 text-white">
          Add Marks
        </button>
        <button type="button" onClick={removeLast} className="rounded bg-rose-500/30 px-3 py-2">
          Delete Latest
        </button>
        <button type="button" onClick={exportPdf} className="rounded bg-indigo-500/30 px-3 py-2">
          Export PDF
        </button>
      </div>
    </Panel>
  )
}
