import { Navigate, Route, Routes } from 'react-router-dom'
import { ShellLayout } from './ShellLayout'
import { teacherNav } from '../components/navigation/navConfig'
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard'
import { TeacherStudents } from '../pages/teacher/TeacherStudents'
import { TeacherAttendance } from '../pages/teacher/TeacherAttendance'
import { TeacherResults } from '../pages/teacher/TeacherResults'
import { TeacherAssignments } from '../pages/teacher/TeacherAssignments'
import { TeacherTimetable } from '../pages/teacher/TeacherTimetable'
import { TeacherAnnouncements } from '../pages/teacher/TeacherAnnouncements'
import { TeacherAnalytics } from '../pages/teacher/TeacherAnalytics'
import { TeacherSettings } from '../pages/teacher/TeacherSettings'
import { useAppStore } from '../stores/useAppStore'

export function TeacherPortal() {
  const db = useAppStore((s) => s.db)
  const session = useAppStore((s) => s.session)
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)
  const logout = useAppStore((s) => s.logout)
  const updateDb = useAppStore((s) => s.updateDb)

  return (
    <ShellLayout
      title="Teacher Command Center"
      navItems={teacherNav}
      basePath="/teacher"
      session={session}
      theme={theme}
      setTheme={setTheme}
      logout={logout}
      className="teacher-shell"
    >
      <Routes>
        <Route path="dashboard" element={<TeacherDashboard db={db} />} />
        <Route path="students" element={<TeacherStudents db={db} updateDb={updateDb} />} />
        <Route path="attendance" element={<TeacherAttendance updateDb={updateDb} />} />
        <Route path="results" element={<TeacherResults db={db} updateDb={updateDb} />} />
        <Route path="assignments" element={<TeacherAssignments db={db} updateDb={updateDb} />} />
        <Route path="timetable" element={<TeacherTimetable db={db} updateDb={updateDb} />} />
        <Route path="announcements" element={<TeacherAnnouncements db={db} updateDb={updateDb} />} />
        <Route path="analytics" element={<TeacherAnalytics db={db} />} />
        <Route path="settings" element={<TeacherSettings />} />
        <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
      </Routes>
    </ShellLayout>
  )
}
