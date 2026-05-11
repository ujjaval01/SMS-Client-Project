import { Navigate } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'

export function ProtectedRoute({ roles, children }) {
  const session = useAppStore((s) => s.session)
  if (!session) return <Navigate to="/role" replace />
  if (!roles.includes(session.role)) return <Navigate to="/unauthorized" replace />
  return children
}
