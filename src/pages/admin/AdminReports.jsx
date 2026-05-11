import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'
import { FileText, Table, FileSpreadsheet, Download } from 'lucide-react'
import { Panel } from '../../components/animations/Panel'
import { card } from '../../lib/ui'

export function AdminReports({ db, toast }) {
  const exportPdf = () => {
    const pdf = new jsPDF()
    pdf.setFontSize(22)
    pdf.text(db.instituteName || 'Institute Report', 15, 20)
    pdf.setFontSize(12)
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 15, 30)
    
    pdf.text('--- Enrollment Summary ---', 15, 45)
    pdf.text(`Total Students: ${db.students.length}`, 15, 55)
    pdf.text(`Total Teachers: ${db.teachers?.length ?? 0}`, 15, 63)
    pdf.text(`Total Classes: ${db.classes?.length ?? 0}`, 15, 71)

    pdf.text('--- Recent Fee Transactions ---', 15, 85)
    db.fees.slice(0, 15).forEach((f, i) => {
      pdf.text(`${f.studentId} | ${f.term} | Status: ${f.status} | Paid: ₹${f.paid}`, 15, 95 + i * 8)
    })

    pdf.save('Academic_Summary_Report.pdf')
    toast('PDF Report Generated', 'default')
  }

  const exportExcel = () => {
    const studentData = db.students.map(s => ({
      ID: s.id,
      Name: s.name,
      Class: s.class,
      Section: s.section,
      Attendance: `${s.attendance}%`,
      GPA: s.gpa
    }))

    const ws = XLSX.utils.json_to_sheet(studentData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Students")
    
    // Add Fees sheet
    const feeData = db.fees.map(f => ({
      StudentID: f.studentId,
      Term: f.term,
      Total: f.total,
      Paid: f.paid,
      Status: f.status
    }))
    const wsFees = XLSX.utils.json_to_sheet(feeData)
    XLSX.utils.book_append_sheet(wb, wsFees, "Fees")

    XLSX.writeFile(wb, "SMS_Full_Report.xlsx")
    toast('Excel Workbook Downloaded', 'default')
  }

  return (
    <Panel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${card} flex flex-col items-center p-8 text-center`}>
          <div className="mb-4 rounded-full bg-indigo-500/20 p-4 text-indigo-400">
            <FileText size={48} />
          </div>
          <h3 className="mb-2 text-xl font-bold">Academic Summary PDF</h3>
          <p className="mb-6 text-sm text-slate-400">
            Generate a professional PDF including enrollment counts, teacher distribution, and recent fee records.
          </p>
          <button onClick={exportPdf} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 font-bold hover:bg-indigo-500 w-full justify-center">
            <Download size={18} /> Export PDF
          </button>
        </div>

        <div className={`${card} flex flex-col items-center p-8 text-center`}>
          <div className="mb-4 rounded-full bg-emerald-500/20 p-4 text-emerald-400">
            <FileSpreadsheet size={48} />
          </div>
          <h3 className="mb-2 text-xl font-bold">Full Database Excel</h3>
          <p className="mb-6 text-sm text-slate-400">
            Download a multi-sheet Excel workbook containing all student records, academic performance, and financial data.
          </p>
          <button onClick={exportExcel} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-bold hover:bg-emerald-500 w-full justify-center">
            <Download size={18} /> Download Excel
          </button>
        </div>
      </div>
    </Panel>
  )
}

