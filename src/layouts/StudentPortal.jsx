import { Navigate, Route, Routes } from 'react-router-dom'
import { ShellLayout } from './ShellLayout'
import { studentNav } from '../components/navigation/navConfig'
import { StudentDashboard } from '../pages/student/StudentDashboard'
import { StudentAttendance } from '../pages/student/StudentAttendance'
import { StudentResults } from '../pages/student/StudentResults'
import { StudentAssignments } from '../pages/student/StudentAssignments'
import { StudentTimetable } from '../pages/student/StudentTimetable'
import { StudentNotes } from '../pages/student/StudentNotes'
import { StudentNotifications } from '../pages/student/StudentNotifications'
import { StudentProfile } from '../pages/student/StudentProfile'
import { StudentFees } from '../pages/student/StudentFees'
import { Chatbot } from '../components/ui/Chatbot'
import { useAppStore } from '../stores/useAppStore'

export function StudentPortal() {
  const db = useAppStore((s) => s.db)
  const session = useAppStore((s) => s.session)
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)
  const logout = useAppStore((s) => s.logout)

  const me = db.students.find((s) => s.id === session?.studentId) || db.students[0] || {}
  const myResults = db.results?.filter((r) => r.studentId === me.id) || []
  const myMarks = myResults[0] || {}


  const toast = useAppStore((s) => s.toast)

  return (
    <ShellLayout
      title="Student Space"
      navItems={studentNav}
      basePath="/student"
      session={session}
      theme={theme}
      setTheme={setTheme}
      logout={logout}
      className="student-shell"
    >
      <Routes>
        <Route path="dashboard" element={<StudentDashboard me={me} myResults={myResults} db={db} />} />
        <Route path="attendance" element={<StudentAttendance me={me} db={db} />} />
        <Route path="results" element={<StudentResults myResults={myResults} />} />
        <Route path="assignments" element={<StudentAssignments assignments={db.assignments} toast={toast} />} />
        <Route path="timetable" element={<StudentTimetable schedule={db.schedule} />} />
        <Route path="notes" element={<StudentNotes />} />
        <Route path="fees" element={<StudentFees studentId={me.id} db={db} toast={toast} />} />
        <Route path="notifications" element={<StudentNotifications announcements={db.announcements} />} />
        <Route path="profile" element={<StudentProfile session={session} me={me} toast={toast} />} />

        <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
      </Routes>
      <Chatbot />
    </ShellLayout>
  )
}
