import { Link, useNavigate } from 'react-router-dom'

/**
 * HomePage - Ana Sayfa
 * 
 * Öğrenilenler:
 * - useNavigate hook ile programatik yönlendirme
 * - Link component ile sayfa geçişi
 */
function HomePage() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    // Programatik olarak başka bir sayfaya yönlendirme
    navigate('/about')
  }

  const handleNavigateWithParams = () => {
    // Parametre ile yönlendirme
    navigate('/user/123')
  }

  return (
    <div className="page-container">
      <h1>🏠 Ana Sayfa</h1>
      <p>React Router öğretim örneğine hoş geldiniz!</p>
      
      <div className="button-group">
        <button onClick={handleNavigate} className="btn btn-primary">
          useNavigate ile Hakkında'ya Git
        </button>
        
        <button onClick={handleNavigateWithParams} className="btn btn-secondary">
          Kullanıcı Detayına Git (ID: 123)
        </button>
        
        <Link to="/products" className="btn btn-link">
          Link ile Ürünlere Git
        </Link>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li><code>useNavigate</code> hook ile programatik yönlendirme</li>
          <li><code>Link</code> component ile sayfa geçişi</li>
          <li>Parametreli route'lara yönlendirme</li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage

