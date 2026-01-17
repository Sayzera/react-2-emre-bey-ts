import { useLocation, useNavigate } from 'react-router-dom'

/**
 * FormSuccessPage - Form Başarı Sayfası
 * 
 * Ders 12: Route State ile Veri Geçirme
 * 
 * Öğrenilenler:
 * - location.state ile veri okuma
 * - State'ten gelen veriyi gösterme
 */
function FormSuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // State'ten veri al (Ders 12)
  const state = location.state as { 
    formData?: { name: string; email: string; message: string }
    submittedAt?: string 
  } | null

  if (!state?.formData) {
    return (
      <div className="page-container">
        <h2>⚠️ Veri Bulunamadı</h2>
        <p>State ile gelmediğiniz için veri gösterilemiyor.</p>
        <p className="hint">
          Bu sayfaya doğrudan URL ile geldiğinizde state olmayacaktır.
          Form sayfasından göndererek gelmelisiniz.
        </p>
        <button onClick={() => navigate('/form')} className="btn btn-primary">
          Form'a Dön
        </button>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1>✅ Form Başarıyla Gönderildi!</h1>
      
      <div className="success-message">
        <h3>Gönderilen Bilgiler:</h3>
        <p><strong>İsim:</strong> {state.formData.name}</p>
        <p><strong>Email:</strong> {state.formData.email}</p>
        <p><strong>Mesaj:</strong> {state.formData.message}</p>
        <p><strong>Gönderilme Zamanı:</strong> {state.submittedAt}</p>
        <p className="hint">
          Bu veriler location.state ile alındı!
        </p>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li><code>location.state</code> ile veri okuma</li>
          <li>State'ten gelen veriyi kullanma</li>
          <li>Browser refresh durumunda state kaybı</li>
          <li>State kontrolü ve fallback UI</li>
        </ul>
      </div>

      <div className="button-group">
        <button onClick={() => navigate('/form')} className="btn btn-primary">
          Yeni Form Gönder
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Geri Git
        </button>
      </div>
    </div>
  )
}

export default FormSuccessPage

