import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * ProtectedRoutesExample - Korumalı Rotalar Örneği
 * 
 * Bu örnek, authentication durumuna göre route'ları korumayı gösterir.
 * 
 * Öğrenilenler:
 * - Protected route component oluşturma
 * - Authentication state yönetimi
 * - Navigate component ile yönlendirme
 * - Conditional rendering
 * - Context API ile auth state paylaşımı
 */

// Ana Sayfa
function ProtectedRoutesExample() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <h1>🔒 Korumalı Rotalar (Protected Routes)</h1>
      
      <div className="info-box">
        <h3>Protected Routes Nedir?</h3>
        <p>
          Korumalı route'lar, sadece yetkili (authenticated) kullanıcıların erişebileceği sayfalardır.
          Kullanıcı giriş yapmamışsa, login sayfasına yönlendirilir.
        </p>
      </div>

      <div className="auth-status">
        {isAuthenticated ? (
          <div className="card success">
            <h3>✅ Giriş Yapılmış</h3>
            <p>Kullanıcı: <strong>{user?.name}</strong></p>
            <p>Email: <strong>{user?.email}</strong></p>
            <button onClick={logout} className="btn btn-danger">
              Çıkış Yap
            </button>
          </div>
        ) : (
          <div className="card warning">
            <h3>❌ Giriş Yapılmamış</h3>
            <p>Korumalı sayfalara erişmek için giriş yapmalısınız.</p>
            <button 
              onClick={() => navigate('/protected-routes/login')}
              className="btn btn-primary"
            >
              Giriş Yap
            </button>
          </div>
        )}
      </div>

      <div className="protected-links">
        <h3>Korumalı Sayfalar:</h3>
        <div className="button-group">
          <Link to="/protected-routes/dashboard" className="btn btn-primary">
            📊 Dashboard
          </Link>
          <Link to="/protected-routes/profile" className="btn btn-primary">
            👤 Profil
          </Link>
          <Link to="/protected-routes/admin" className="btn btn-primary">
            ⚙️ Admin Panel
          </Link>
        </div>
      </div>

      <div className="info-box">
        <h3>Bu örnekte öğrenilenler:</h3>
        <ul>
          <li><code>ProtectedRoute</code> component ile route koruma</li>
          <li><code>Navigate</code> component ile otomatik yönlendirme</li>
          <li>Authentication state yönetimi</li>
          <li>Context API ile auth state paylaşımı</li>
          <li>Conditional rendering ile erişim kontrolü</li>
        </ul>
      </div>
    </div>
  )
}

// Login Sayfası
export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
    navigate('/protected-routes/dashboard')
  }

  return (
    <div className="page-container">
      <h1>🔐 Giriş Yap</h1>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Şifre (min 4 karakter):</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi girin"
            minLength={4}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Giriş Yap
        </button>
      </form>

      <div className="hint-box">
        <p><strong>Test için:</strong> Herhangi bir email ve en az 4 karakterlik şifre girin.</p>
      </div>
    </div>
  )
}

// Dashboard Sayfası (Korumalı)
export function ProtectedDashboard() {
  const { user } = useAuth()

  return (
    <div className="page-container">
      <h1>📊 Dashboard</h1>
      <p>Hoş geldiniz, <strong>{user?.name}</strong>!</p>
      
      <div className="card">
        <h3>Bu sayfa korumalıdır</h3>
        <p>Sadece giriş yapmış kullanıcılar bu sayfayı görebilir.</p>
      </div>

      <div className="info-box">
        <p>URL: <code>/protected-routes/dashboard</code></p>
        <p>Bu route, <code>ProtectedRoute</code> component ile korunmaktadır.</p>
      </div>
    </div>
  )
}

// Profil Sayfası (Korumalı)
export function ProtectedProfile() {
  const { user } = useAuth()

  return (
    <div className="page-container">
      <h1>👤 Profil</h1>
      
      <div className="card">
        <h3>Kullanıcı Bilgileri</h3>
        <p><strong>İsim:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <div className="info-box">
        <p>URL: <code>/protected-routes/profile</code></p>
        <p>Bu sayfa da korumalıdır ve sadece authenticated kullanıcılar erişebilir.</p>
      </div>
    </div>
  )
}

// Admin Panel (Korumalı)
export function ProtectedAdmin() {
  const { user } = useAuth()

  return (
    <div className="page-container">
      <h1>⚙️ Admin Panel</h1>
      
      <div className="card">
        <h3>Admin Kontrol Paneli</h3>
        <p>Hoş geldiniz, <strong>{user?.name}</strong>!</p>
        <p>Bu sayfa sadece giriş yapmış kullanıcılar için erişilebilir.</p>
      </div>

      <div className="info-box">
        <p>URL: <code>/protected-routes/admin</code></p>
      </div>
    </div>
  )
}

export default ProtectedRoutesExample

