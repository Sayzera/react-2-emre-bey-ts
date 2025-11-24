import { Link, useLocation } from 'react-router-dom'

/**
 * RelativeLinksExample - Relative Links Örneği
 * 
 * Ders 10: Relative Links ve Navigation
 * 
 * Öğrenilenler:
 * - Relative path kullanımı
 * - ./ ve ../ ile navigation
 * - to="." ve to=".." kullanımı
 */
function RelativeLinksExample() {
  const location = useLocation()

  return (
    <div className="page-container">
      <h1>🔗 Relative Links Örneği</h1>
      
      <div className="info-box">
        <h3>Mevcut Konum:</h3>
        <p><code>{location.pathname}</code></p>
      </div>

      <div className="button-group">
        <h3>Relative Links:</h3>
        {/* Mevcut route'a göre relative */}
        <Link to="." className="btn btn-primary">
          to="." (Mevcut sayfa)
        </Link>
        
        <Link to="./detail" className="btn btn-primary">
          to="./detail" (Aynı seviye)
        </Link>
        
        <Link to="../" className="btn btn-secondary">
          to="../" (Bir üst seviye)
        </Link>
        
        <Link to="../../" className="btn btn-secondary">
          to="../../" (İki üst seviye)
        </Link>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>Relative path kavramı (<code>./</code>, <code>../</code>)</li>
          <li><code>to="."</code> ile mevcut sayfa</li>
          <li><code>to=".."</code> ile parent route</li>
          <li>Absolute vs relative path farkı</li>
          <li>Nested route'larda relative link kullanımı</li>
        </ul>
      </div>
    </div>
  )
}

export default RelativeLinksExample

