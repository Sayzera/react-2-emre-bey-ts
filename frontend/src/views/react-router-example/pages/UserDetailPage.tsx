import { useParams, useNavigate } from 'react-router-dom'

/**
 * UserDetailPage - Kullanıcı Detay Sayfası
 * 
 * Öğrenilenler:
 * - useParams hook ile URL parametrelerini okuma
 * - Dinamik route'lar (:id gibi)
 */
function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <h1>👤 Kullanıcı Detayı</h1>
      
      <div className="info-box">
        <h3>URL Parametresi:</h3>
        <p>Kullanıcı ID: <strong>{id}</strong></p>
        <p className="hint">
          URL formatı: /user/:id (örnek: /user/123)
        </p>
      </div>

      <div className="button-group">
        <button 
          onClick={() => navigate('/user/456')} 
          className="btn btn-primary"
        >
          Farklı Kullanıcıya Git (ID: 456)
        </button>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-secondary"
        >
          Geri Git
        </button>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li><code>useParams</code> hook ile URL parametrelerini okuma</li>
          <li>Dinamik route tanımlama (<code>:id</code>)</li>
          <li><code>navigate(-1)</code> ile geri gitme</li>
        </ul>
      </div>
    </div>
  )
}

export default UserDetailPage

