import { Component } from 'react'
import { 
  Link, 
  useParams, 
  useNavigate, 
  useLocation,
  useSearchParams,
  type NavigateFunction,
  type Location,
  type Params
} from 'react-router-dom'

/**
 * CLASS COMPONENT ÖRNEĞİ - REACT ROUTER İLE KULLANIMI
 * 
 * Bu örnek, React Router'ın class component'lerle nasıl kullanıldığını öğretir.
 * 
 * ÖNEMLİ NOT:
 * React Router v6'da hook'lar (useNavigate, useParams, useLocation vb.) 
 * sadece functional component'lerde kullanılabilir. Class component'lerde
 * bu hook'ları kullanamayız. Bu yüzden iki yöntem kullanabiliriz:
 * 
 * 1. HOC (Higher Order Component) Pattern: Class component'i sarmalayarak
 *    hook'ları props olarak geçirmek
 * 2. React Router Context'ini doğrudan kullanmak
 * 
 * Bu örnekte her iki yöntemi de göstereceğiz.
 */

// ============================================================================
// YÖNTEM 1: HOC (Higher Order Component) Pattern
// ============================================================================

/**
 * withRouter HOC
 * 
 * Bu HOC, class component'lere React Router hook'larını props olarak geçirir.
 * Böylece class component'lerde hook'ları kullanmadan React Router özelliklerine
 * erişebiliriz.
 * 
 * @param WrappedComponent - Sarmalanacak class component
 * @returns Yeni bir component (wrapper)
 */
function withRouter<P extends object>(
  WrappedComponent: React.ComponentType<P & RouterProps>
): React.ComponentType<Record<string, never>> {
  // Functional wrapper component - hook'ları burada kullanıyoruz
  return function RouterWrapper() {
    // React Router hook'larını burada çağırıyoruz
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    // Hook'lardan aldığımız değerleri props olarak class component'e geçiriyoruz
    // Class component'lere ekstra props geçirmiyoruz, sadece RouterProps geçiriyoruz
    // TypeScript tip kontrolü için as kullanıyoruz
    const routerProps = {
      navigate,
      location,
      params,
      searchParams,
      setSearchParams
    } as P & RouterProps

    return <WrappedComponent {...routerProps} />
  }
}

/**
 * RouterProps Interface
 * 
 * Class component'lere geçirilecek React Router prop'larını tanımlar.
 */
interface RouterProps {
  navigate: NavigateFunction
  location: Location
  params: Params<string>
  searchParams: URLSearchParams
  setSearchParams: ReturnType<typeof useSearchParams>[1]
}

// ============================================================================
// ÖRNEK 1: Route Parametrelerini Okuma (Class Component)
// ============================================================================

/**
 * UserDetailClass Component Props
 */
type UserDetailClassProps = RouterProps

/**
 * UserDetailClass Component State
 */
interface UserDetailClassState {
  userData: {
    id: string
    name: string
    email: string
  } | null
  loading: boolean
}

/**
 * UserDetailClass - Class Component ile Route Parametrelerini Okuma
 * 
 * Bu component, URL'deki parametreleri (örneğin /user/:id) okumayı gösterir.
 * 
 * Öğrenilenler:
 * - Class component'lerde params'a props üzerinden erişim
 * - componentDidMount lifecycle metodunda veri çekme
 * - State yönetimi
 */
class UserDetailClass extends Component<UserDetailClassProps, UserDetailClassState> {
  constructor(props: UserDetailClassProps) {
    super(props)

    // State'i başlatıyoruz
    this.state = {
      userData: null,
      loading: true
    }
  }

  /**
   * componentDidMount
   * 
   * Component mount olduğunda (sayfa yüklendiğinde) çalışır.
   * Burada API çağrısı yapabilir veya başlangıç verilerini yükleyebiliriz.
   */
  componentDidMount() {
    // URL'den parametreyi alıyoruz (props üzerinden)
    const userId = this.props.params.id

    if (userId) {
      // Simüle edilmiş API çağrısı
      this.fetchUserData(userId)
    } else {
      this.setState({ loading: false })
    }
  }

  /**
   * componentDidUpdate
   * 
   * Component güncellendiğinde çalışır. URL değiştiğinde
   * (örneğin /user/1'den /user/2'ye geçildiğinde) yeni veriyi çekmek için kullanılır.
   * 
   * @param prevProps - Önceki props
   */
  componentDidUpdate(prevProps: UserDetailClassProps) {
    // URL parametresi değişti mi kontrol ediyoruz
    if (prevProps.params.id !== this.props.params.id) {
      const userId = this.props.params.id
      if (userId) {
        this.setState({ loading: true })
        this.fetchUserData(userId)
      }
    }
  }

  /**
   * fetchUserData
   * 
   * Kullanıcı verilerini çeken metod (simüle edilmiş)
   * 
   * @param userId - Kullanıcı ID'si
   */
  fetchUserData = async (userId: string) => {
    // Gerçek uygulamada burada API çağrısı yapılır
    // Şimdilik simüle ediyoruz
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simüle edilmiş kullanıcı verisi
    const mockUsers: Record<string, { id: string; name: string; email: string }> = {
      '1': { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com' },
      '2': { id: '2', name: 'Ayşe Demir', email: 'ayse@example.com' },
      '3': { id: '3', name: 'Mehmet Kaya', email: 'mehmet@example.com' }
    }

    const userData = mockUsers[userId] || null

    this.setState({
      userData,
      loading: false
    })
  }

  /**
   * render
   * 
   * Component'in UI'ını render eder.
   */
  render() {
    const { params, navigate } = this.props
    const { userData, loading } = this.state

    return (
      <div className="page-container">
        <h1>👤 Kullanıcı Detayı (Class Component)</h1>

        {/* URL'den alınan parametreyi gösteriyoruz */}
        <div className="info-box">
          <h3>URL Parametresi:</h3>
          <p>
            <strong>User ID:</strong> {params.id || 'Belirtilmemiş'}
          </p>
          <p>
            <strong>Tam URL:</strong> {this.props.location.pathname}
          </p>
        </div>

        {/* Loading durumu */}
        {loading && (
          <div className="info-box">
            <p>Yükleniyor...</p>
          </div>
        )}

        {/* Kullanıcı verisi */}
        {!loading && userData && (
          <div className="card">
            <h2>{userData.name}</h2>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
        )}

        {/* Kullanıcı bulunamadı */}
        {!loading && !userData && (
          <div className="info-box">
            <p>Kullanıcı bulunamadı!</p>
          </div>
        )}

        {/* Navigasyon butonları */}
        <div className="button-group">
          <button
            onClick={() => navigate('/class-component')}
            className="btn btn-primary"
          >
            ← Geri Dön
          </button>
          <button
            onClick={() => navigate(`/class-component/user/${Number(params.id || 1) + 1}`)}
            className="btn btn-secondary"
          >
            Sonraki Kullanıcı
          </button>
        </div>

        {/* Öğrenilenler */}
        <div className="info-box">
          <h3>Bu örnekte öğrenilenler:</h3>
          <ul>
            <li>Class component'lerde <code>params</code> prop'u ile URL parametrelerini okuma</li>
            <li><code>componentDidMount</code> ile veri yükleme</li>
            <li><code>componentDidUpdate</code> ile URL değişikliklerini takip etme</li>
            <li><code>navigate</code> prop'u ile programatik yönlendirme</li>
            <li><code>location</code> prop'u ile mevcut konum bilgisi</li>
          </ul>
        </div>
      </div>
    )
  }
}

// HOC ile sarmalıyoruz
const UserDetailClassWithRouter = withRouter(UserDetailClass)

// ============================================================================
// ÖRNEK 2: Query String Parametrelerini Okuma (Class Component)
// ============================================================================

/**
 * ProductListClass Component Props
 */
type ProductListClassProps = RouterProps

/**
 * ProductListClass Component State
 */
interface ProductListClassState {
  products: Array<{ id: number; name: string; price: number; category: string }>
  filteredProducts: Array<{ id: number; name: string; price: number; category: string }>
}

/**
 * ProductListClass - Class Component ile Query String Okuma
 * 
 * Bu component, URL'deki query parametrelerini (örneğin ?category=electronics&price=100)
 * okumayı ve filtreleme yapmayı gösterir.
 * 
 * Öğrenilenler:
 * - Class component'lerde searchParams'a props üzerinden erişim
 * - Query parametrelerini okuma ve güncelleme
 * - componentDidMount ve componentDidUpdate ile filtreleme
 */
class ProductListClass extends Component<ProductListClassProps, ProductListClassState> {
  constructor(props: ProductListClassProps) {
    super(props)

    // Başlangıç state'i
    this.state = {
      products: [
        { id: 1, name: 'Laptop', price: 15000, category: 'electronics' },
        { id: 2, name: 'Telefon', price: 8000, category: 'electronics' },
        { id: 3, name: 'Kulaklık', price: 500, category: 'electronics' },
        { id: 4, name: 'Masa', price: 2000, category: 'furniture' },
        { id: 5, name: 'Sandalye', price: 1500, category: 'furniture' },
        { id: 6, name: 'Kitap', price: 50, category: 'books' },
        { id: 7, name: 'Kalem', price: 10, category: 'books' }
      ],
      filteredProducts: []
    }
  }

  /**
   * componentDidMount
   * 
   * İlk yüklemede query parametrelerine göre filtreleme yapıyoruz.
   */
  componentDidMount() {
    this.applyFilters()
  }

  /**
   * componentDidUpdate
   * 
   * Query parametreleri değiştiğinde filtrelemeyi yeniden uyguluyoruz.
   */
  componentDidUpdate(prevProps: ProductListClassProps) {
    // Query parametreleri değişti mi kontrol ediyoruz
    if (
      prevProps.searchParams.toString() !== this.props.searchParams.toString()
    ) {
      this.applyFilters()
    }
  }

  /**
   * applyFilters
   * 
   * Query parametrelerine göre ürünleri filtreler.
   */
  applyFilters = () => {
    const { searchParams } = this.props
    const { products } = this.state

    let filtered = [...products]

    // Kategori filtresi
    const category = searchParams.get('category')
    if (category) {
      filtered = filtered.filter(p => p.category === category)
    }

    // Fiyat filtresi
    const maxPrice = searchParams.get('maxPrice')
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice))
    }

    // Arama filtresi
    const search = searchParams.get('search')
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    this.setState({ filteredProducts: filtered })
  }

  /**
   * updateQueryParam
   * 
   * Query parametresini günceller.
   * 
   * @param key - Parametre adı
   * @param value - Parametre değeri (null ise silinir)
   */
  updateQueryParam = (key: string, value: string | null) => {
    const { searchParams, setSearchParams } = this.props
    const newSearchParams = new URLSearchParams(searchParams)

    if (value) {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }

    setSearchParams(newSearchParams)
  }

  render() {
    const { searchParams } = this.props
    const { products, filteredProducts } = this.state

    // Mevcut query parametrelerini alıyoruz
    const currentCategory = searchParams.get('category') || 'all'
    const currentMaxPrice = searchParams.get('maxPrice') || ''
    const currentSearch = searchParams.get('search') || ''

    return (
      <div className="page-container">
        <h1>🛍️ Ürün Listesi (Class Component)</h1>

        {/* Query parametrelerini gösteriyoruz */}
        <div className="info-box">
          <h3>Mevcut Query Parametreleri:</h3>
          <p>
            <strong>Category:</strong> {currentCategory}
          </p>
          <p>
            <strong>Max Price:</strong> {currentMaxPrice || 'Belirtilmemiş'}
          </p>
          <p>
            <strong>Search:</strong> {currentSearch || 'Belirtilmemiş'}
          </p>
          <p>
            <strong>Tam Query String:</strong> {searchParams.toString() || 'Yok'}
          </p>
        </div>

        {/* Filtreleme kontrolleri */}
        <div className="card">
          <h3>Filtreler</h3>

          {/* Kategori filtresi */}
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Kategori:
              <select
                value={currentCategory}
                onChange={(e) =>
                  this.updateQueryParam('category', e.target.value === 'all' ? null : e.target.value)
                }
                style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
              >
                <option value="all">Tümü</option>
                <option value="electronics">Elektronik</option>
                <option value="furniture">Mobilya</option>
                <option value="books">Kitap</option>
              </select>
            </label>
          </div>

          {/* Fiyat filtresi */}
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Max Fiyat:
              <input
                type="number"
                value={currentMaxPrice}
                onChange={(e) =>
                  this.updateQueryParam('maxPrice', e.target.value || null)
                }
                placeholder="Fiyat limiti"
                style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
              />
            </label>
          </div>

          {/* Arama filtresi */}
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Arama:
              <input
                type="text"
                value={currentSearch}
                onChange={(e) =>
                  this.updateQueryParam('search', e.target.value || null)
                }
                placeholder="Ürün adı ara..."
                style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
              />
            </label>
          </div>

          {/* Filtreleri temizle */}
          <button
            onClick={() => {
              this.props.setSearchParams(new URLSearchParams())
            }}
            className="btn btn-secondary"
          >
            Filtreleri Temizle
          </button>
        </div>

        {/* Ürün listesi */}
        <div className="card">
          <h3>
            Ürünler ({filteredProducts.length} / {products.length})
          </h3>
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product) => (
                <li key={product.id} style={{ marginBottom: '0.5rem' }}>
                  <strong>{product.name}</strong> - {product.price}₺ -{' '}
                  {product.category}
                </li>
              ))}
            </ul>
          ) : (
            <p>Ürün bulunamadı.</p>
          )}
        </div>

        {/* Öğrenilenler */}
        <div className="info-box">
          <h3>Bu örnekte öğrenilenler:</h3>
          <ul>
            <li>Class component'lerde <code>searchParams</code> prop'u ile query string okuma</li>
            <li><code>setSearchParams</code> ile query parametrelerini güncelleme</li>
            <li><code>componentDidUpdate</code> ile query değişikliklerini takip etme</li>
            <li>URLSearchParams API kullanımı</li>
          </ul>
        </div>
      </div>
    )
  }
}

// HOC ile sarmalıyoruz
const ProductListClassWithRouter = withRouter(ProductListClass)

// ============================================================================
// ÖRNEK 3: Programatik Navigasyon (Class Component)
// ============================================================================

/**
 * NavigationClass Component Props
 */
type NavigationClassProps = RouterProps

/**
 * NavigationClass Component State
 */
interface NavigationClassState {
  navigationHistory: string[]
}

/**
 * NavigationClass - Class Component ile Programatik Navigasyon
 * 
 * Bu component, class component'lerde programatik yönlendirme yapmayı gösterir.
 * 
 * Öğrenilenler:
 * - navigate prop'u ile programatik yönlendirme
 * - navigate ile state geçirme
 * - navigate ile replace kullanımı
 * - Location state okuma
 */
class NavigationClass extends Component<NavigationClassProps, NavigationClassState> {
  constructor(props: NavigationClassProps) {
    super(props)

    this.state = {
      navigationHistory: []
    }
  }

  /**
   * componentDidMount
   * 
   * İlk yüklemede mevcut konumu history'ye ekliyoruz.
   */
  componentDidMount() {
    this.addToHistory(this.props.location.pathname)
  }

  /**
   * componentDidUpdate
   * 
   * Konum değiştiğinde history'ye ekliyoruz.
   */
  componentDidUpdate(prevProps: NavigationClassProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.addToHistory(this.props.location.pathname)
    }
  }

  /**
   * addToHistory
   * 
   * Gezinme geçmişine yeni bir konum ekler.
   * 
   * @param path - Eklenen path
   */
  addToHistory = (path: string) => {
    this.setState((prevState) => ({
      navigationHistory: [...prevState.navigationHistory, path]
    }))
  }

  /**
   * handleNavigate
   * 
   * Normal yönlendirme yapar (history'ye ekler).
   */
  handleNavigate = (path: string) => {
    this.props.navigate(path)
  }

  /**
   * handleNavigateWithState
   * 
   * State ile birlikte yönlendirme yapar.
   */
  handleNavigateWithState = (path: string, state: object) => {
    this.props.navigate(path, { state })
  }

  /**
   * handleReplace
   * 
   * Replace ile yönlendirme yapar (history'ye eklemez, mevcut entry'yi değiştirir).
   */
  handleReplace = (path: string) => {
    this.props.navigate(path, { replace: true })
  }

  /**
   * handleGoBack
   * 
   * Geri gitme işlemi.
   */
  handleGoBack = () => {
    this.props.navigate(-1)
  }

  /**
   * handleGoForward
   * 
   * İleri gitme işlemi.
   */
  handleGoForward = () => {
    this.props.navigate(1)
  }

  render() {
    const { location } = this.props
    const { navigationHistory } = this.state

    // Location state'ini okuyoruz (eğer varsa)
    const locationState = location.state as { message?: string } | null

    return (
      <div className="page-container">
        <h1>🧭 Programatik Navigasyon (Class Component)</h1>

        {/* Mevcut konum bilgisi */}
        <div className="info-box">
          <h3>Mevcut Konum:</h3>
          <p>
            <strong>Pathname:</strong> {location.pathname}
          </p>
          <p>
            <strong>Search:</strong> {location.search || 'Yok'}
          </p>
          <p>
            <strong>Hash:</strong> {location.hash || 'Yok'}
          </p>
          {locationState?.message && (
            <p>
              <strong>State Message:</strong> {locationState.message}
            </p>
          )}
        </div>

        {/* Navigasyon butonları */}
        <div className="card">
          <h3>Navigasyon İşlemleri</h3>

          <div className="button-group" style={{ flexDirection: 'column', gap: '0.5rem' }}>
            {/* Normal yönlendirme */}
            <button
              onClick={() => this.handleNavigate('/class-component/user/1')}
              className="btn btn-primary"
            >
              Kullanıcı 1'e Git (Normal)
            </button>

            {/* State ile yönlendirme */}
            <button
              onClick={() =>
                this.handleNavigateWithState('/class-component/user/2', {
                  message: 'State ile gönderilen mesaj!'
                })
              }
              className="btn btn-primary"
            >
              Kullanıcı 2'ye Git (State ile)
            </button>

            {/* Replace ile yönlendirme */}
            <button
              onClick={() => this.handleReplace('/class-component/user/3')}
              className="btn btn-secondary"
            >
              Kullanıcı 3'e Git (Replace)
            </button>

            {/* Geri/İleri */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={this.handleGoBack} className="btn btn-secondary">
                ← Geri
              </button>
              <button onClick={this.handleGoForward} className="btn btn-secondary">
                İleri →
              </button>
            </div>
          </div>
        </div>

        {/* Navigasyon geçmişi */}
        <div className="card">
          <h3>Navigasyon Geçmişi</h3>
          {navigationHistory.length > 0 ? (
            <ul>
              {navigationHistory.map((path, index) => (
                <li key={index}>{path}</li>
              ))}
            </ul>
          ) : (
            <p>Henüz gezinme yapılmadı.</p>
          )}
        </div>

        {/* Öğrenilenler */}
        <div className="info-box">
          <h3>Bu örnekte öğrenilenler:</h3>
          <ul>
            <li><code>navigate</code> prop'u ile programatik yönlendirme</li>
            <li><code>navigate(path, {'{'} state: ... {'}'})</code> ile state geçirme</li>
            <li><code>navigate(path, {'{'} replace: true {'}'})</code> ile replace kullanımı</li>
            <li><code>navigate(-1)</code> ve <code>navigate(1)</code> ile geri/ileri gitme</li>
            <li><code>location</code> prop'u ile mevcut konum bilgisi</li>
            <li><code>location.state</code> ile state okuma</li>
          </ul>
        </div>
      </div>
    )
  }
}

// HOC ile sarmalıyoruz
const NavigationClassWithRouter = withRouter(NavigationClass)

// ============================================================================
// ANA SAYFA - Tüm örnekleri gösteren menü
// ============================================================================

/**
 * ClassComponentExample - Ana Sayfa
 * 
 * Tüm class component örneklerini gösteren menü sayfası.
 */
function ClassComponentExample() {
  return (
    <div className="page-container">
      <h1>📚 Class Component ile React Router</h1>

      <div className="info-box">
        <h3>Class Component Nedir?</h3>
        <p>
          Class component'ler, React'in eski component yazım şeklidir. 
          Functional component'ler ve hook'lar React 16.8'de geldi, ancak
          class component'ler hala kullanılabilir ve bazı durumlarda gerekli olabilir
          (örneğin Error Boundary için).
        </p>
        <p>
          <strong>Önemli:</strong> React Router v6'da hook'lar sadece functional
          component'lerde kullanılabilir. Class component'lerde hook'ları kullanamayız,
          bu yüzden HOC (Higher Order Component) pattern'i kullanarak hook'ları
          props olarak geçiriyoruz.
        </p>
      </div>

      <div className="info-box">
        <h3>Bu örnekte öğrenilecekler:</h3>
        <ul>
          <li>✅ Class component tanımı ve kullanımı</li>
          <li>✅ HOC (Higher Order Component) pattern'i</li>
          <li>✅ Class component'lerde React Router kullanımı</li>
          <li>✅ Route parametrelerini okuma (params)</li>
          <li>✅ Query string parametrelerini okuma (searchParams)</li>
          <li>✅ Programatik yönlendirme (navigate)</li>
          <li>✅ Location bilgisi okuma</li>
          <li>✅ Lifecycle metodları (componentDidMount, componentDidUpdate)</li>
          <li>✅ State yönetimi</li>
        </ul>
      </div>

      <div className="card">
        <h2>Örnekler</h2>
        <div className="button-group" style={{ flexDirection: 'column', gap: '1rem' }}>
          <Link
            to="/class-component/user/1"
            className="btn btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
          >
            1. Route Parametrelerini Okuma
            <br />
            <small>URL'den parametre okuma ve kullanıcı detayı gösterme</small>
          </Link>

          <Link
            to="/class-component/products"
            className="btn btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
          >
            2. Query String Parametrelerini Okuma
            <br />
            <small>Query parametreleri ile filtreleme</small>
          </Link>

          <Link
            to="/class-component/navigation"
            className="btn btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
          >
            3. Programatik Navigasyon
            <br />
            <small>navigate ile yönlendirme ve state geçirme</small>
          </Link>
        </div>
      </div>

      <div className="info-box">
        <h3>HOC Pattern Açıklaması:</h3>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// 1. HOC fonksiyonu oluşturuyoruz
function withRouter(WrappedComponent) {
  return function RouterWrapper(props) {
    // Hook'ları burada kullanıyoruz
    const navigate = useNavigate()
    const params = useParams()
    // ...
    
    // Props olarak class component'e geçiriyoruz
    return (
      <WrappedComponent
        {...props}
        navigate={navigate}
        params={params}
      />
    )
  }
}

// 2. Class component'i HOC ile sarmalıyoruz
const MyClassComponentWithRouter = withRouter(MyClassComponent)

// 3. Artık class component'te props.navigate, props.params kullanabiliriz`}
        </pre>
      </div>
    </div>
  )
}

// Export ediyoruz
export default ClassComponentExample
export { UserDetailClassWithRouter as UserDetailClass }
export { ProductListClassWithRouter as ProductListClass }
export { NavigationClassWithRouter as NavigationClass }

