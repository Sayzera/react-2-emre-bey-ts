import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

/**
 * ProgrammaticNavigationExample - Programmatic Navigation Örneği
 * 
 * Bu örnek, useNavigate hook ile programatik yönlendirme yapmayı gösterir.
 * 
 * Öğrenilenler:
 * - useNavigate hook ile programatik yönlendirme
 * - navigate() ile farklı yönlendirme yöntemleri
 * - State ile veri geçirme
 * - History API kullanımı
 * - Relative navigation
 */

// Ana Sayfa
function ProgrammaticNavigationExample() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="page-container">
      <h1>🧭 Programmatic Navigation</h1>
      
      <div className="info-box">
        <h3>Programmatic Navigation Nedir?</h3>
        <p>
          Programmatic navigation, kod içinden (JavaScript ile) sayfa yönlendirmesi yapmaktır.
          <code>useNavigate</code> hook'u ile bu işlem gerçekleştirilir.
        </p>
      </div>

      <div className="navigation-examples">
        <section className="example-section">
          <h2>1. Basit Yönlendirme</h2>
          <div className="button-group">
            <button 
              onClick={() => navigate('/programmatic-navigation/success')}
              className="btn btn-primary"
            >
              Başarı Sayfasına Git
            </button>
            <button 
              onClick={() => navigate('/programmatic-navigation/about')}
              className="btn btn-primary"
            >
              Hakkında Sayfasına Git
            </button>
          </div>
        </section>

        <section className="example-section">
          <h2>2. State ile Veri Geçirme</h2>
          <p>Yönlendirme sırasında state ile veri gönderme:</p>
          <div className="button-group">
            <button 
              onClick={() => navigate('/programmatic-navigation/user', {
                state: { 
                  name: 'Ahmet Yılmaz',
                  email: 'ahmet@example.com',
                  from: 'programmatic-navigation'
                }
              })}
              className="btn btn-primary"
            >
              Kullanıcı Sayfasına Git (State ile)
            </button>
          </div>
        </section>

        <section className="example-section">
          <h2>3. Replace Navigation</h2>
          <p>History'ye eklemeden yönlendirme (geri butonu çalışmaz):</p>
          <div className="button-group">
            <button 
              onClick={() => navigate('/programmatic-navigation/replaced', { replace: true })}
              className="btn btn-primary"
            >
              Replace ile Git
            </button>
          </div>
        </section>

        <section className="example-section">
          <h2>4. Relative Navigation</h2>
          <p>Mevcut path'e göre relative yönlendirme:</p>
          <div className="button-group">
            <button 
              onClick={() => navigate('relative-page')}
              className="btn btn-primary"
            >
              Relative Sayfaya Git
            </button>
            <button 
              onClick={() => navigate('../')}
              className="btn btn-primary"
            >
              Bir Üst Dizine Git (../)
            </button>
          </div>
        </section>

        <section className="example-section">
          <h2>5. History Navigation</h2>
          <p>Tarayıcı geçmişinde ileri/geri gitme:</p>
          <div className="button-group">
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
            >
              ← Geri Git (-1)
            </button>
            <button 
              onClick={() => navigate(1)}
              className="btn btn-secondary"
            >
              İleri Git (+1) →
            </button>
            <button 
              onClick={() => navigate(-2)}
              className="btn btn-secondary"
            >
              İki Adım Geri (-2)
            </button>
          </div>
        </section>

        <section className="example-section">
          <h2>6. Conditional Navigation</h2>
          <p>Koşula bağlı yönlendirme:</p>
          <ConditionalNavigationDemo />
        </section>

        <section className="example-section">
          <h2>7. Delayed Navigation</h2>
          <p>Gecikmeli yönlendirme (örnek: form gönderimi sonrası):</p>
          <DelayedNavigationDemo />
        </section>
      </div>

      <div className="info-box">
        <h3>Mevcut Konum:</h3>
        <p><strong>Pathname:</strong> {location.pathname}</p>
        <p><strong>State:</strong> {location.state ? JSON.stringify(location.state) : 'Yok'}</p>
      </div>

      <div className="info-box">
        <h3>Bu örnekte öğrenilenler:</h3>
        <ul>
          <li><code>useNavigate</code> hook ile programatik yönlendirme</li>
          <li><code>navigate(path)</code> - Basit yönlendirme</li>
          <li><code>navigate(path, {'{'} state {'}'})</code> - State ile veri geçirme</li>
          <li><code>navigate(path, {'{'} replace: true {'}'})</code> - Replace navigation</li>
          <li><code>navigate(relativePath)</code> - Relative navigation</li>
          <li><code>navigate(-1)</code> - Geri gitme</li>
          <li><code>navigate(1)</code> - İleri gitme</li>
          <li>Conditional ve delayed navigation</li>
        </ul>
      </div>
    </div>
  )
}

// Conditional Navigation Demo
function ConditionalNavigationDemo() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleNavigate = () => {
    if (isLoggedIn) {
      navigate('/programmatic-navigation/dashboard')
    } else {
      navigate('/programmatic-navigation/login')
    }
  }

  return (
    <div className="card">
      <p>Giriş Durumu: {isLoggedIn ? '✅ Giriş Yapılmış' : '❌ Giriş Yapılmamış'}</p>
      <div className="button-group">
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="btn btn-secondary"
        >
          {isLoggedIn ? 'Çıkış Yap' : 'Giriş Yap'}
        </button>
        <button 
          onClick={handleNavigate}
          className="btn btn-primary"
        >
          {isLoggedIn ? 'Dashboard\'a Git' : 'Login Sayfasına Git'}
        </button>
      </div>
    </div>
  )
}

// Delayed Navigation Demo
function DelayedNavigationDemo() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    
    // Simüle edilmiş form gönderimi
    setTimeout(() => {
      setIsSubmitting(false)
      navigate('/programmatic-navigation/success', {
        state: { message: 'Form başarıyla gönderildi!' }
      })
    }, 2000)
  }

  return (
    <div className="card">
      <button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="btn btn-primary"
      >
        {isSubmitting ? 'Gönderiliyor...' : 'Formu Gönder (2 saniye sonra yönlendir)'}
      </button>
    </div>
  )
}

// Success Page
export function SuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const message = (location.state as { message?: string })?.message || 'İşlem başarılı!'

  return (
    <div className="page-container">
      <h1>✅ Başarılı!</h1>
      <div className="card success">
        <p>{message}</p>
      </div>
      <div className="button-group">
        <button 
          onClick={() => navigate('/programmatic-navigation')}
          className="btn btn-primary"
        >
          Ana Sayfaya Dön
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
        >
          Geri Git
        </button>
      </div>
    </div>
  )
}

// About Page
export function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <h1>📖 Hakkında</h1>
      <div className="card">
        <p>Bu sayfa programmatic navigation ile açıldı.</p>
      </div>
      <button 
        onClick={() => navigate('/programmatic-navigation')}
        className="btn btn-primary"
      >
        Ana Sayfaya Dön
      </button>
    </div>
  )
}

// User Page (State ile)
export function UserPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { name?: string; email?: string; from?: string } | null

  return (
    <div className="page-container">
      <h1>👤 Kullanıcı Sayfası</h1>
      
      {state ? (
        <div className="card">
          <h3>State ile Gelen Veriler:</h3>
          <p><strong>İsim:</strong> {state.name}</p>
          <p><strong>Email:</strong> {state.email}</p>
          <p><strong>Geldiği Sayfa:</strong> {state.from}</p>
        </div>
      ) : (
        <div className="card warning">
          <p>State ile veri gelmedi. Doğrudan bu sayfaya geldiniz.</p>
        </div>
      )}

      <div className="button-group">
        <button 
          onClick={() => navigate('/programmatic-navigation')}
          className="btn btn-primary"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  )
}

// Replaced Page
export function ReplacedPage() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <h1>🔄 Replace Navigation</h1>
      <div className="card">
        <p>
          Bu sayfa <code>replace: true</code> ile açıldı.
          Geri butonuna basarsanız, bu sayfayı görmeyeceksiniz.
        </p>
      </div>
      <button 
        onClick={() => navigate('/programmatic-navigation')}
        className="btn btn-primary"
      >
        Ana Sayfaya Dön
      </button>
    </div>
  )
}

// Relative Page
export function RelativePage() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <h1>📍 Relative Navigation</h1>
      <div className="card">
        <p>
          Bu sayfa relative path ile açıldı.
          URL: <code>/programmatic-navigation/relative-page</code>
        </p>
      </div>
      <div className="button-group">
        <button 
          onClick={() => navigate('../')}
          className="btn btn-primary"
        >
          Bir Üst Dizine Git (../)
        </button>
        <button 
          onClick={() => navigate('/programmatic-navigation')}
          className="btn btn-secondary"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  )
}

// Login Page
export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleLogin = () => {
    if (email) {
      navigate('/programmatic-navigation/dashboard', {
        state: { user: email }
      })
    }
  }

  return (
    <div className="page-container">
      <h1>🔐 Giriş Yap</h1>
      <div className="form-container">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email girin"
          />
        </div>
        <button onClick={handleLogin} className="btn btn-primary">
          Giriş Yap
        </button>
      </div>
    </div>
  )
}

// Dashboard Page
export function DashboardPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = (location.state as { user?: string })?.user

  return (
    <div className="page-container">
      <h1>📊 Dashboard</h1>
      {user && (
        <div className="card">
          <p>Hoş geldiniz, <strong>{user}</strong>!</p>
        </div>
      )}
      <button 
        onClick={() => navigate('/programmatic-navigation')}
        className="btn btn-primary"
      >
        Ana Sayfaya Dön
      </button>
    </div>
  )
}

export default ProgrammaticNavigationExample

