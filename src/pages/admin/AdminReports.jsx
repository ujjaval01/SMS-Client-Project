import jsPDF from 'jspdf'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function AdminReports({ db, toast }) {
  const exportPdf = () => {
    const pdf = new jsPDF()
    pdf.text(db.instituteName || 'Institute Report', 20, 20)
    pdf.text(`Students: ${db.students.length}`, 20, 32)
    pdf.text(`Teachers: ${db.teachers?.length ?? 0}`, 20, 40)
    db.fees.slice(0, 12).forEach((f, i) => {
      pdf.text(`${f.studentId} — ${f.status} — ₹${f.paid}/${f.total}`, 20, 52 + i * 8)
    })
    pdf.save('admin-summary.pdf')
    toast('PDF exported', 'default')
  }

  const exportCsv = () => {
    const rows = [['studentId', 'name', 'class', 'section', 'attendance', 'gpa']]
    db.students.forEach((s) => {
      rows.push([s.id, s.name, s.class, s.section, String(s.attendance), String(s.gpa)])
    })
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'students-export.csv'
    a.click()
    URL.revokeObjectURL(url)
    toast('CSV downloaded', 'default')
  }

  return (
    <Panel>
      <div className={`${card} flex flex-wrap gap-3`}>
        <button type="button" onClick={exportPdf} className="glow-button rounded-xl px-4 py-2 text-sm font-semibold text-white">
          Export summary PDF
        </button>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-4 py-2 text-sm font-medium text-emerald-200"
        >
          Download students CSV
        </button>
      </div>
    </Panel>
  )
}
