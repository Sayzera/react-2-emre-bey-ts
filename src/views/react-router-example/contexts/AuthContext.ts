import { createContext } from 'react'

/**
 * AuthContext - Authentication Context Definition
 * 
 * Bu dosya sadece context tanımını içerir.
 * Fast Refresh için component'lerden ayrı tutulmuştur.
 */

// Auth Context Type
export interface AuthContextType {
  isAuthenticated: boolean
  user: { name: string; email: string } | null
  login: (email: string, password: string) => void
  logout: () => void
}

// Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

