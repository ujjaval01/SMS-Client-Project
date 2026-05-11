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

  const me = db.students.find((s) => s.id === session?.studentId) || db.students[0]
  const myMarks = db.marks.find((m) => m.studentId === me.id) || db.marks[0]

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
        <Route path="dashboard" element={<StudentDashboard me={me} myMarks={myMarks} db={db} />} />
        <Route path="attendance" element={<StudentAttendance me={me} />} />
        <Route path="results" element={<StudentResults myMarks={myMarks} />} />
        <Route path="assignments" element={<StudentAssignments assignments={db.assignments} />} />
        <Route path="timetable" element={<StudentTimetable schedule={db.schedule} />} />
        <Route path="notes" element={<StudentNotes notes={db.notes} />} />
        <Route path="fees" element={<StudentFees studentId={me.id} db={db} />} />
        <Route path="notifications" element={<StudentNotifications announcements={db.announcements} />} />
        <Route path="profile" element={<StudentProfile session={session} me={me} />} />
        <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
      </Routes>
      <Chatbot />
    </ShellLayout>
  )
}
