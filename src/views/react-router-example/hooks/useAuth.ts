import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

/**
 * useAuth - Authentication Hook
 * 
 * Fast Refresh için hook'lar component dosyalarından ayrı tutulmalıdır.
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

