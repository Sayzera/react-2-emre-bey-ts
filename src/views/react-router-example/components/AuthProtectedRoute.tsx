import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * ProtectedRoute - Korumalı Route Component
 * 
 * Bu component, authentication durumuna göre route'ları korur.
 * Fast Refresh için component dosyasında tutulmuştur.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/protected-routes/login" replace />
  }

  return <>{children}</>
}

