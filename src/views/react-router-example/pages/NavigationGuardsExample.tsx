import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

/**
 * NavigationGuardsExample - Navigation Guards Örneği
 * 
 * Bu örnek, sayfa geçişlerini kontrol etmeyi gösterir.
 * 
 * Öğrenilenler:
 * - useBlocker ile navigation blocking
 * - useLocation ile mevcut konum takibi
 * - Form kaydedilmemiş değişiklikler için uyarı
 * - Before unload event handling
 * - Programmatic navigation kontrolü
 */

// Ana Sayfa
function NavigationGuardsExample() {
  return (
    <div className="page-container">
      <h1>🛡️ Navigation Guards</h1>
      
      <div className="info-box">
        <h3>Navigation Guards Nedir?</h3>
        <p>
          Navigation guards, kullanıcının bir sayfadan ayrılmadan önce 
          belirli kontroller yapılmasını sağlar. Örneğin, kaydedilmemiş 
          form verileri varsa kullanıcıya uyarı gösterilir.
        </p>
      </div>

      <div className="guard-examples">
        <section className="example-section">
          <h2>1. Form Guard (Kaydedilmemiş Değişiklikler)</h2>
          <p>Form doldurulmuşsa ve kaydedilmemişse, sayfadan ayrılırken uyarı gösterilir.</p>
          <Link to="/navigation-guards/form" className="btn btn-primary">
            📝 Form Sayfasına Git
          </Link>
        </section>

        <section className="example-section">
          <h2>2. Authentication Guard</h2>
          <p>Giriş yapılmamışsa belirli sayfalara erişim engellenir.</p>
          <Link to="/navigation-guards/protected" className="btn btn-primary">
            🔒 Korumalı Sayfaya Git
          </Link>
        </section>

        <section className="example-section">
          <h2>3. Location Change Tracking</h2>
          <p>Sayfa değişikliklerini takip etme.</p>
          <Link to="/navigation-guards/tracker" className="btn btn-primary">
            📍 Location Tracker
          </Link>
        </section>
      </div>

      <div className="info-box">
        <h3>Bu örnekte öğrenilenler:</h3>
        <ul>
          <li>Navigation blocking (location tracking ile)</li>
          <li><code>useLocation</code> ile konum takibi</li>
          <li>Form kaydedilmemiş değişiklik kontrolü</li>
          <li>Before unload event handling</li>
          <li>Conditional navigation kontrolü</li>
          <li className="hint">Not: <code>useBlocker</code> sadece data router'larda çalışır (createBrowserRouter). Bu örnekte <code>BrowserRouter</code> kullanıldığı için alternatif yaklaşım kullanılmıştır.</li>
        </ul>
      </div>
    </div>
  )
}

// Form Guard Sayfası
export function FormGuardPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isDirty, setIsDirty] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const navigate = useNavigate()

  // Form değişikliklerini takip et
  useEffect(() => {
    const hasChanges = !!(formData.name || formData.email || formData.message)
    setIsDirty(hasChanges && !isSaved)
  }, [formData, isSaved])

  // Before unload event (tarayıcı kapatma/kaydırma)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSaved) {
        e.preventDefault()
        e.returnValue = 'Kaydedilmemiş değişiklikler var. Sayfadan ayrılmak istediğinize emin misiniz?'
        return e.returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty, isSaved])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = () => {
    setIsSaved(true)
    setIsDirty(false)
    alert('Form kaydedildi!')
  }

  const handleNavigate = (path: string) => {
    if (isDirty && !isSaved) {
      const confirmed = window.confirm(
        'Kaydedilmemiş değişiklikler var. Sayfadan ayrılmak istediğinize emin misiniz?'
      )
      if (!confirmed) return
    }
    navigate(path)
  }

  return (
    <div className="page-container">
      <h1>📝 Form Guard Örneği</h1>


      <div className="form-container">
        <form>
          <div className="form-group">
            <label>İsim:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="İsminizi girin"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email adresinizi girin"
            />
          </div>

          <div className="form-group">
            <label>Mesaj:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mesajınızı yazın"
              rows={4}
            />
          </div>

          <div className="button-group">
            <button 
              type="button"
              onClick={handleSave}
              className="btn btn-primary"
            >
              {isSaved ? '✅ Kaydedildi' : '💾 Kaydet'}
            </button>
          </div>
        </form>

        <div className="status-info">
          {isDirty && (
            <div className="alert warning">
              ⚠️ Kaydedilmemiş değişiklikler var!
            </div>
          )}
          {isSaved && (
            <div className="alert success">
              ✅ Form kaydedildi. Güvenle sayfadan ayrılabilirsiniz.
            </div>
          )}
        </div>
      </div>

      <div className="button-group">
        <button 
          onClick={() => handleNavigate('/navigation-guards')}
          className="btn btn-secondary"
        >
          ← Ana Sayfaya Dön
        </button>
        <button 
          onClick={() => handleNavigate('/')}
          className="btn btn-secondary"
        >
          Ana Sayfaya Git
        </button>
      </div>

      <div className="info-box">
        <h3>Test:</h3>
        <ol>
          <li>Formu doldurun (kaydetmeyin)</li>
          <li>Başka bir sayfaya gitmeyi deneyin</li>
          <li>Uyarı mesajını göreceksiniz</li>
          <li>Formu kaydedin ve tekrar deneyin</li>
        </ol>
      </div>
    </div>
  )
}

// Protected Page Guard
export function ProtectedPageGuard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Eğer giriş yapılmamışsa, login sayfasına yönlendir
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/navigation-guards/login', {
        state: { from: location.pathname }
      })
    }
  }, [isAuthenticated, navigate, location])

  if (!isAuthenticated) {
    return null // Yönlendirme yapılırken hiçbir şey render etme
  }

  return (
    <div className="page-container">
      <h1>🔒 Korumalı Sayfa</h1>
      <div className="card">
        <p>Bu sayfaya sadece giriş yapmış kullanıcılar erişebilir.</p>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="btn btn-danger"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  )
}

// Login Page
export function LoginPageGuard() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: string })?.from || '/navigation-guards'

  console.log(from)

  const handleLogin = () => {
    // Basit login simülasyonu
    if (email) {
      navigate(from, { replace: true })
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
      <p className="hint">
        Giriş yaptıktan sonra, önceki sayfaya yönlendirileceksiniz.
      </p>
    </div>
  )
}

// Location Tracker
export function LocationTrackerPage() {
  const location = useLocation()
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    setHistory(prev => [...prev, location.pathname])
  }, [location])

  return (
    <div className="page-container">
      <h1>📍 Location Tracker</h1>
      
      <div className="card">
        <h3>Mevcut Konum:</h3>
        <p><strong>Pathname:</strong> {location.pathname}</p>
        <p><strong>Search:</strong> {location.search || 'Yok'}</p>
        <p><strong>Hash:</strong> {location.hash || 'Yok'}</p>
        <p><strong>State:</strong> {location.state ? JSON.stringify(location.state) : 'Yok'}</p>
      </div>

      <div className="card">
        <h3>Geçmiş:</h3>
        <ul>
          {history.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul>
      </div>

      <div className="button-group">
        <Link to="/navigation-guards" className="btn btn-primary">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}

export default NavigationGuardsExample

