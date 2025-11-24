import { Link, useNavigate } from 'react-router-dom'

/**
 * NotFoundPage - 404 Sayfası
 * 
 * Öğrenilenler:
 * - Catch-all route (*)
 * - 404 sayfası oluşturma
 */
function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="page-container not-found">
      <h1>404</h1>
      <h2>Sayfa Bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil.</p>
      
      <div className="button-group">
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-primary"
        >
          Ana Sayfaya Dön
        </button>
        <Link to="/" className="btn btn-link">
          Link ile Ana Sayfaya Git
        </Link>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>Catch-all route (<code>path="*"</code>)</li>
          <li>404 sayfası oluşturma</li>
          <li>Eşleşmeyen tüm route'ları yakalama</li>
        </ul>
      </div>
    </div>
  )
}

export default NotFoundPage

