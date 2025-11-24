import { useLocation } from 'react-router-dom'

/**
 * AboutPage - Hakkında Sayfası
 * 
 * Öğrenilenler:
 * - useLocation hook ile mevcut konum bilgisi
 */
function AboutPage() {
  const location = useLocation()

  return (
    <div className="page-container">
      <h1>📖 Hakkında</h1>
      <p>Bu sayfa React Router'ın temel kavramlarını öğretmek için hazırlanmıştır.</p>
      
      <div className="info-box">
        <h3>Mevcut Konum Bilgisi:</h3>
        <pre>{JSON.stringify(location, null, 2)}</pre>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li><code>useLocation</code> hook ile konum bilgisi alma</li>
          <li>Location objesinin içeriği (pathname, search, hash, state)</li>
        </ul>
      </div>
    </div>
  )
}

export default AboutPage

