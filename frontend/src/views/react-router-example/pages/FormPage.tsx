import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

/**
 * FormPage - Form Sayfası (Route State Örneği)
 * 
 * Ders 12: Route State ile Veri Geçirme
 * 
 * Öğrenilenler:
 * - navigate() ile state geçirme
 * - location.state kullanımı
 * - Sayfalar arası veri aktarımı
 */
function FormPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // State ile veri geçirerek yönlendir (Ders 12)
    navigate('/form-success', { 
      state: { 
        formData,
        submittedAt: new Date().toISOString()
      } 
    })
  }

  return (
    <div className="page-container">
      <h1>📝 Form Sayfası</h1>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>İsim:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label>Mesaj:</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="form-textarea"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Gönder (State ile)
        </button>
      </form>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li><code>navigate()</code> ile state geçirme</li>
          <li>Form verilerini state ile taşıma</li>
          <li>Sayfalar arası veri aktarımı</li>
          <li>State objesi ile kompleks veri geçirme</li>
        </ul>
      </div>
    </div>
  )
}

export default FormPage

