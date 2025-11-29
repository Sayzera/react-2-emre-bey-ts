import { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import type { AuthContextType } from '../contexts/AuthContext'

/**
 * AuthProvider - Authentication Provider Component
 * 
 * Bu component, authentication state'ini yönetir ve context sağlar.
 * Fast Refresh için sadece component içerir.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const login = (email: string, password: string) => {
    // Gerçek uygulamada API çağrısı yapılır
    if (password.length >= 4) {
      setIsAuthenticated(true)
      setUser({
        name: email.split('@')[0],
        email: email
      })
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const value: AuthContextType = { isAuthenticated, user, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

