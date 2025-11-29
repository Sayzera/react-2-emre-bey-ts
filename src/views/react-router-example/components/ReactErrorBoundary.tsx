import { Component, type ReactNode } from 'react'

/**
 * ReactErrorBoundary - React Class Component Error Boundary
 *
 * Bu sınıf tabanlı component, React bileşenlerinin render aşamasında
 * fırlattığı hataları yakalamak için kullanılır.
 *
 * Neden gerekli?
 * - React Router'ın errorElement yapısı yalnızca route seviyesindeki hataları yakalar.
 * - Component render sırasında oluşan hatalar için Error Boundary gerekir.
 *
 * Props:
 *  - children: Sarılan bileşenler.
 *  - fallback: Opsiyonel. Eğer hata olursa çalışacak özel bir UI döndüren fonksiyon.
 *
 * State:
 *  - hasError: Hata olup olmadığını belirtir.
 *  - error: Yakalanan hata objesi.
 */

interface Props {
  children: ReactNode
  fallback?: (error: Error, resetError: () => void) => ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ReactErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    // Başlangıç durumu: hata yok
    this.state = { hasError: false, error: null }
  }

  /**
   * componentDidCatch
   *
   * React tarafından otomatik olarak çağrılır.
   * Render sırasında fırlatılan hataları burada yakalarız.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // State'i güncelleyerek fallback UI'nin render edilmesini sağlarız.
    this.setState({
      hasError: true,
      error
    })
  }

  /**
   * resetError
   *
   * Hata sonrası fallback UI’den normal UI’ye dönmek için state'i sıfırlar.
   */
  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  /**
   * render
   *
   * Eğer hata varsa fallback gösterilir,
   * yoksa normal children render edilir.
   */
  render() {
    if (this.state.hasError && this.state.error) {

      // Eğer kullanıcı özel bir fallback UI verdiyse onu çalıştır.
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError)
      }

      // Default fallback UI
      return (
        <div className="page-container error-page">
          <div className="error-container">
            <h1 className="error-code">⚠️</h1>
            <h2>Bir Hata Oluştu</h2>

            {/* Hata mesajını göster */}
            <p>{this.state.error.message}</p>

            {/* Hata sonrası yapılabilecek işlemler */}
            <div className="button-group">
              <button 
                onClick={this.resetError}
                className="btn btn-primary"
              >
                Tekrar Dene
              </button>

              <button 
                onClick={() => window.location.href = '/'}
                className="btn btn-secondary"
              >
                Ana Sayfaya Dön
              </button>
            </div>

            {/* Debug amaçlı stack trace gösterimi */}
            {this.state.error.stack && (
              <div className="error-details">
                <h3>Hata Detayları:</h3>
                <pre>{this.state.error.stack}</pre>
              </div>
            )}
          </div>
        </div>
      )
    }

    // Hata yoksa normal children render edilir
    return this.props.children
  }
}

/**
 * ReactErrorBoundary (Wrapper Component)
 *
 * Hooks kullanamadığımız için functional bir wrapper bırakıyoruz.
 * Asıl iş sınıf component içinde yapılıyor.
 */
export function ReactErrorBoundary({ children, fallback }: Props) {
  return (
    <ReactErrorBoundaryClass fallback={fallback}>
      {children}
    </ReactErrorBoundaryClass>
  )
}

export default ReactErrorBoundary
