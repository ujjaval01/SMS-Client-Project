import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAppStore } from '../stores/useAppStore'
import { RoleSelection } from '../pages/RoleSelection'
import { Unauthorized } from '../pages/Unauthorized'
import { AuthPage } from '../pages/auth/AuthPage'

import LandingPage from '../pages/landing/LandingPage'
import { StudentPortal } from '../layouts/StudentPortal'
import { TeacherPortal } from '../layouts/TeacherPortal'
import { AdminPortal } from '../layouts/AdminPortal'

function RouteFallback() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="glass h-40 animate-pulse rounded-2xl" />
    </div>
  )
}

export function AppRoutes() {
  const session = useAppStore((s) => s.session)
  const role = session?.role?.toLowerCase();
  const portalHome =
    role === 'teacher' ? '/teacher/dashboard' : role === 'admin' ? '/admin/dashboard' : '/student/dashboard'

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/role" element={<RoleSelection />} />
      <Route path="/auth/:role" element={<AuthPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/app" element={session ? <Navigate to={portalHome} replace /> : <Navigate to="/role" replace />} />
      <Route
        path="/student/*"
        element={
          <ProtectedRoute roles={['student', 'STUDENT']}>
            <StudentPortal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute roles={['teacher', 'TEACHER']}>
            <TeacherPortal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute roles={['admin', 'ADMIN']}>
            <AdminPortal />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
