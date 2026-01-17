import { useSearchParams } from 'react-router-dom'

/**
 * ContactPage - İletişim Sayfası
 * 
 * Öğrenilenler:
 * - useSearchParams hook ile query string parametreleri
 */
function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Query parametrelerini okuma
  const name = searchParams.get('name') || ''
  const email = searchParams.get('email') || ''

  const handleSetParams = () => {
    // Query parametrelerini güncelleme
    setSearchParams({ name: 'Emre', email: 'emre@example.com' })
  }

  const handleClearParams = () => {
    // Query parametrelerini temizleme
    setSearchParams({})
  }

  return (
    <div className="page-container">
      <h1>📧 İletişim</h1>
      
      <div className="info-box">
        <h3>Query Parametreleri:</h3>
        <p><strong>name:</strong> {name || 'Yok'}</p>
        <p><strong>email:</strong> {email || 'Yok'}</p>
        
        <div className="button-group">
          <button onClick={handleSetParams} className="btn btn-primary">
            Parametreleri Ayarla
          </button>
          <button onClick={handleClearParams} className="btn btn-secondary">
            Parametreleri Temizle
          </button>
        </div>
        
        <p className="hint">
          URL'yi şu şekilde değiştirebilirsiniz: /contact?name=Emre&email=emre@example.com
        </p>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li><code>useSearchParams</code> hook ile query string okuma</li>
          <li>Query parametrelerini güncelleme</li>
          <li>URL'deki ?name=value&email=value formatı</li>
        </ul>
      </div>
    </div>
  )
}

export default ContactPage

