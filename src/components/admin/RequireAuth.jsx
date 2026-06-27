import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0d0d0d' }}>
        <div className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: '#c5a059', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return children
}
