import { createContext, useContext, useState, useEffect } from 'react'
import { me, logout as apiLogout } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { setLoading(false); return }

    me()
      .then(u => setUser(u))
      .catch(() => localStorage.removeItem('admin_token'))
      .finally(() => setLoading(false))
  }, [])

  const loginSuccess = (token, userData) => {
    localStorage.setItem('admin_token', token)
    setUser(userData)
  }

  const logoutUser = async () => {
    try { await apiLogout() } catch (_) {}
    localStorage.removeItem('admin_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginSuccess, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
