import { Navigate } from 'react-router-dom'
import { useState } from 'react'

/**
 * ProtectedRoute - Korumalı Route Component
 * 
 * Öğrenilenler:
 * - Route koruma mantığı
 * - Navigate component ile yönlendirme
 * - Conditional rendering
 */
interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Gerçek uygulamada bu değer authentication context'ten gelir
  const [isAuthenticated] = useState(true) // Örnek için true

  if (!isAuthenticated) {
    // Kullanıcı giriş yapmamışsa ana sayfaya yönlendir
    return <Navigate to="/" replace />
  }

  // Kullanıcı giriş yapmışsa içeriği göster
  return <>{children}</>
}

export default ProtectedRoute

