import { useState } from 'react'
import { Link, useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import ReactErrorBoundary from '../components/ReactErrorBoundary'

/**
 * ErrorHandlingExample - 404 Error Handling Örneği
 * 
 * Bu örnek, hata yönetimi ve 404 sayfası oluşturmayı gösterir.
 * 
 * Öğrenilenler:
 * - 404 Not Found sayfası oluşturma
 * - Error boundary ile hata yakalama
 * - useRouteError hook kullanımı
 * - Catch-all route (*)
 * - Custom error pages
 */

// Ana Sayfa
function ErrorHandlingExample() {
  return (
    <div className="page-container">
      <h1>❌ Error Handling & 404 Pages</h1>
      
      <div className="info-box">
        <h3>Error Handling Nedir?</h3>
        <p>
          Error handling, kullanıcının var olmayan sayfalara gitmeye çalıştığında
          veya bir hata oluştuğunda gösterilecek sayfaları yönetmektir.
        </p>
      </div>

      <div className="error-examples">
        <section className="example-section">
          <h2>1. 404 Not Found</h2>
          <p>Var olmayan sayfalara gitmeyi deneyin:</p>
          <div className="button-group">
            <Link to="/error-handling/nonexistent" className="btn btn-primary">
              Var Olmayan Sayfa
            </Link>
            <Link to="/error-handling/random/123/abc" className="btn btn-primary">
              Rastgele URL
            </Link>
          </div>
        </section>

        <section className="example-section">
          <h2>2. Error Boundary</h2>
          <p>Hata fırlatan bir sayfayı test edin:</p>
          <Link to="/error-handling/error-boundary" className="btn btn-primary">
            Hata Fırlatan Sayfa
          </Link>
        </section>

        <section className="example-section">
          <h2>3. Custom Error Pages</h2>
          <p>Farklı hata türleri için özel sayfalar:</p>
          <div className="button-group">
            <Link to="/error-handling/403" className="btn btn-primary">
              403 Forbidden
            </Link>
            <Link to="/error-handling/500" className="btn btn-primary">
              500 Server Error
            </Link>
          </div>
        </section>
      </div>

      <div className="info-box">
        <h3>Bu örnekte öğrenilenler:</h3>
        <ul>
          <li>Catch-all route (<code>path="*"</code>) ile 404 sayfası</li>
          <li><code>useRouteError</code> hook ile hata bilgisi alma</li>
          <li><code>isRouteErrorResponse</code> ile hata tipi kontrolü</li>
          <li>Custom error pages oluşturma</li>
          <li>Error boundary kullanımı</li>
        </ul>
      </div>
    </div>
  )
}

// 404 Not Found Sayfası
export function NotFoundErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="page-container not-found">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <h2>Sayfa Bulunamadı</h2>
        <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        
        <div className="button-group">
          <button 
            onClick={() => navigate('/error-handling')}
            className="btn btn-primary"
          >
            ← Ana Sayfaya Dön
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Geri Git
          </button>
          <Link to="/" className="btn btn-link">
            Ana Sayfa
          </Link>
        </div>

        <div className="info-box">
          <h3>Olası Nedenler:</h3>
          <ul>
            <li>URL yanlış yazılmış olabilir</li>
            <li>Sayfa silinmiş veya taşınmış olabilir</li>
            <li>Link bozuk olabilir</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Error Boundary Sayfası (Hata Fırlatan)
function ErrorBoundaryPageContent() {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('Bu bir test hatasıdır! Error Boundary tarafından yakalandı.')
  }

  return (
    <div className="page-container">
      <h1>⚠️ Error Boundary Test</h1>
      <div className="card">
        <p>Bu sayfa, error boundary'yi test etmek için hata fırlatabilir.</p>
        <p className="hint">
          "Hata Fırlat" butonuna tıkladığınızda, React ErrorBoundary hatayı yakalayacak
          ve hata sayfasını gösterecektir.
        </p>
        <button 
          onClick={() => setShouldThrow(true)}
          className="btn btn-danger"
        >
          Hata Fırlat
        </button>
      </div>
    </div>
  )
}

// ErrorBoundary ile sarmalanmış sayfa
export function ErrorBoundaryPage() {
  return (
    <ReactErrorBoundary
      fallback={(error, resetError) => (
        <div className="page-container error-page">
          <div className="error-container">
            <h1 className="error-code">⚠️</h1>
            <h2>Error Boundary Yakaladı!</h2>
            <p><strong>Hata Mesajı:</strong> {error.message}</p>
            
            <div className="info-box">
              <p>
                Bu hata, React ErrorBoundary class component'i tarafından yakalandı.
                Component render sırasında fırlatılan hatalar için ErrorBoundary kullanılmalıdır.
              </p>
            </div>
            
            <div className="button-group">
              <button 
                onClick={resetError}
                className="btn btn-primary"
              >
                Tekrar Dene
              </button>
              <button 
                onClick={() => window.location.href = '/error-handling'}
                className="btn btn-secondary"
              >
                Ana Sayfaya Dön
              </button>
            </div>

            {error.stack && (
              <div className="error-details">
                <h3>Hata Detayları:</h3>
                <pre>{error.stack}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    >
      <ErrorBoundaryPageContent />
    </ReactErrorBoundary>
  )
}

// Error Boundary Component
export function ErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage = 'Bilinmeyen bir hata oluştu'
  let errorTitle = 'Hata'

  if (isRouteErrorResponse(error)) {
    errorTitle = `Hata ${error.status}`
    errorMessage = error.statusText || error.data?.message || errorMessage
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="page-container error-page">
      <div className="error-container">
        <h1 className="error-code">{isRouteErrorResponse(error) ? error.status : '⚠️'}</h1>
        <h2>{errorTitle}</h2>
        <p>{errorMessage}</p>
        
        <div className="button-group">
          <button 
            onClick={() => navigate('/error-handling')}
            className="btn btn-primary"
          >
            Ana Sayfaya Dön
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-secondary"
          >
            Sayfayı Yenile
          </button>
        </div>

        {error instanceof Error && error.stack && (
          <div className="error-details">
            <h3>Hata Detayları:</h3>
            <pre>{error.stack}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

// 403 Forbidden Sayfası
export function ForbiddenPage() {
  return (
    <div className="page-container error-page">
      <div className="error-container">
        <h1 className="error-code">403</h1>
        <h2>Erişim Reddedildi</h2>
        <p>Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
        
        <div className="button-group">
          <Link to="/error-handling" className="btn btn-primary">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}

// 500 Server Error Sayfası
export function ServerErrorPage() {
  return (
    <div className="page-container error-page">
      <div className="error-container">
        <h1 className="error-code">500</h1>
        <h2>Sunucu Hatası</h2>
        <p>Sunucuda bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
        
        <div className="button-group">
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Sayfayı Yenile
          </button>
          <Link to="/error-handling" className="btn btn-secondary">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorHandlingExample

