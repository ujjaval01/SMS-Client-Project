import { Navigate, Route, Routes } from 'react-router-dom'
import { ShellLayout } from './ShellLayout'
import { adminNav } from '../components/navigation/adminNav'
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { AdminAnalytics } from '../pages/admin/AdminAnalytics'
import { AdminUsers } from '../pages/admin/AdminUsers'
import { AdminClasses } from '../pages/admin/AdminClasses'
import { AdminFees } from '../pages/admin/AdminFees'
import { AdminReports } from '../pages/admin/AdminReports'
import { AdminBroadcasts } from '../pages/admin/AdminBroadcasts'
import { AdminActivity } from '../pages/admin/AdminActivity'
import { AdminSettings } from '../pages/admin/AdminSettings'
import { useAppStore } from '../stores/useAppStore'

export function AdminPortal() {
  const db = useAppStore((s) => s.db)
  const session = useAppStore((s) => s.session)
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)
  const logout = useAppStore((s) => s.logout)
  const updateDb = useAppStore((s) => s.updateDb)
  const toast = useAppStore((s) => s.toast)

  return (
    <ShellLayout
      title="Admin Console"
      navItems={adminNav}
      basePath="/admin"
      session={session}
      theme={theme}
      setTheme={setTheme}
      logout={logout}
      className="admin-shell"
    >
      <Routes>
        <Route path="dashboard" element={<AdminDashboard db={db} />} />
        <Route path="analytics" element={<AdminAnalytics db={db} />} />
        <Route path="users" element={<AdminUsers db={db} updateDb={updateDb} toast={toast} />} />
        <Route path="classes" element={<AdminClasses db={db} updateDb={updateDb} toast={toast} />} />
        <Route path="fees" element={<AdminFees db={db} />} />
        <Route path="reports" element={<AdminReports db={db} toast={toast} />} />
        <Route path="broadcasts" element={<AdminBroadcasts db={db} updateDb={updateDb} toast={toast} />} />
        <Route path="activity" element={<AdminActivity db={db} />} />
        <Route path="settings" element={<AdminSettings db={db} />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </ShellLayout>
  )
}
