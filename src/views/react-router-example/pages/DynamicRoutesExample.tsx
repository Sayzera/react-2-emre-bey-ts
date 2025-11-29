import { Link, useParams, useNavigate } from 'react-router-dom'

/**
 * DynamicRoutesExample - Dinamik Rotalar Örneği
 * 
 * Bu örnek, URL'deki dinamik parametreleri kullanmayı gösterir.
 * 
 * Öğrenilenler:
 * - useParams hook ile URL parametrelerini okuma
 * - Dinamik route tanımlama (:id, :slug gibi)
 * - Çoklu parametre kullanımı
 * - Optional parametreler
 */

// Ana liste sayfası
function DynamicRoutesExample() {
  const products = [
    { id: 1, name: 'Laptop', category: 'elektronik', slug: 'laptop-dell-xps' },
    { id: 2, name: 'Telefon', category: 'elektronik', slug: 'telefon-iphone-15' },
    { id: 3, name: 'Tablet', category: 'elektronik', slug: 'tablet-ipad-pro' },
    { id: 4, name: 'Kulaklık', category: 'aksesuar', slug: 'kulaklik-sony-wh' },
  ]

  const users = [
    { id: 101, username: 'ahmet', name: 'Ahmet Yılmaz' },
    { id: 102, username: 'ayse', name: 'Ayşe Demir' },
    { id: 103, username: 'mehmet', name: 'Mehmet Kaya' },
  ]

  return (
    <div className="page-container">
      <h1>🔗 Dinamik Rotalar (Dynamic Routes)</h1>
      
      <div className="info-box">
        <h3>Dinamik Route Nedir?</h3>
        <p>
          Dinamik route'lar, URL'de değişken parametreler kullanmaya olanak sağlar.
          Örneğin: <code>/product/:id</code> veya <code>/user/:username</code>
        </p>
      </div>

      <div className="dynamic-examples">
        {/* Ürünler Örneği */}
        <section className="example-section">
          <h2>📦 Ürün Örnekleri</h2>
          <p>Tek parametre: <code>/dynamic-routes/product/:id</code></p>
          <div className="product-list">
            {products.map(product => (
              <Link 
                key={product.id}
                to={`/dynamic-routes/product/${product.id}`}
                className="card link-card"
              >
                <h3>{product.name}</h3>
                <p>ID: {product.id}</p>
                <p className="hint">Tıklayarak detay sayfasına git</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Kullanıcılar Örneği */}
        <section className="example-section">
          <h2>👤 Kullanıcı Örnekleri</h2>
          <p>Tek parametre: <code>/dynamic-routes/user/:username</code></p>
          <div className="user-list">
            {users.map(user => (
              <Link 
                key={user.id}
                to={`/dynamic-routes/user/${user.username}`}
                className="card link-card"
              >
                <h3>{user.name}</h3>
                <p>Username: {user.username}</p>
                <p className="hint">Tıklayarak profil sayfasına git</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Çoklu Parametre Örneği */}
        <section className="example-section">
          <h2>🔢 Çoklu Parametre Örneği</h2>
          <p>İki parametre: <code>/dynamic-routes/category/:category/product/:slug</code></p>
          <div className="category-list">
            {products.map(product => (
              <Link 
                key={product.id}
                to={`/dynamic-routes/category/${product.category}/product/${product.slug}`}
                className="card link-card"
              >
                <h3>{product.name}</h3>
                <p>Kategori: {product.category}</p>
                <p>Slug: {product.slug}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="info-box">
        <h3>Bu örnekte öğrenilenler:</h3>
        <ul>
          <li><code>useParams</code> hook ile URL parametrelerini okuma</li>
          <li>Route tanımında <code>:paramName</code> kullanımı</li>
          <li>Tek parametre kullanımı (örn: <code>:id</code>)</li>
          <li>Çoklu parametre kullanımı (örn: <code>:category/:slug</code>)</li>
          <li>TypeScript ile parametre tiplerini belirleme</li>
        </ul>
      </div>
    </div>
  )
}

// Ürün Detay Sayfası (Tek Parametre)
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Gerçek uygulamada bu veri API'den gelir
  const product = {
    id: Number(id),
    name: `Ürün ${id}`,
    price: 1000 * Number(id),
    description: `Bu, ${id} numaralı ürünün detay sayfasıdır.`
  }

  return (
    <div className="page-container">
      <h1>📦 Ürün Detayı</h1>
      
      <div className="info-box">
        <h3>URL Parametresi:</h3>
        <p>Ürün ID: <strong>{id}</strong></p>
        <p>URL: <code>/dynamic-routes/product/{id}</code></p>
      </div>

      <div className="card">
        <h2>{product.name}</h2>
        <p><strong>Fiyat:</strong> {product.price}₺</p>
        <p><strong>Açıklama:</strong> {product.description}</p>
      </div>

      <div className="button-group">
        <button 
          onClick={() => navigate('/dynamic-routes')}
          className="btn btn-primary"
        >
          ← Listeye Dön
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
        >
          Geri Git
        </button>
      </div>
    </div>
  )
}

// Kullanıcı Profil Sayfası (Tek Parametre)
export function UserProfilePage() {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()

  // Gerçek uygulamada bu veri API'den gelir
  const user = {
    username: username || '',
    name: username ? username.charAt(0).toUpperCase() + username.slice(1) : '',
    email: `${username}@example.com`,
    joinDate: '2024-01-15'
  }

  return (
    <div className="page-container">
      <h1>👤 Kullanıcı Profili</h1>
      
      <div className="info-box">
        <h3>URL Parametresi:</h3>
        <p>Username: <strong>{username}</strong></p>
        <p>URL: <code>/dynamic-routes/user/{username}</code></p>
      </div>

      <div className="card">
        <h2>{user.name}</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Katılım Tarihi:</strong> {user.joinDate}</p>
      </div>

      <div className="button-group">
        <button 
          onClick={() => navigate('/dynamic-routes')}
          className="btn btn-primary"
        >
          ← Listeye Dön
        </button>
      </div>
    </div>
  )
}

// Kategori ve Ürün Detay Sayfası (Çoklu Parametre)
export function CategoryProductPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>()
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <h1>📂 Kategori & Ürün Detayı</h1>
      
      <div className="info-box">
        <h3>URL Parametreleri:</h3>
        <p>Kategori: <strong>{category}</strong></p>
        <p>Slug: <strong>{slug}</strong></p>
        <p>URL: <code>/dynamic-routes/category/{category}/product/{slug}</code></p>
      </div>

      <div className="card">
        <h2>Ürün: {slug?.replace(/-/g, ' ')}</h2>
        <p><strong>Kategori:</strong> {category}</p>
        <p><strong>Slug:</strong> {slug}</p>
        <p>
          Bu örnek, URL'de birden fazla parametre kullanımını gösterir.
          Her parametre <code>useParams</code> ile okunabilir.
        </p>
      </div>

      <div className="button-group">
        <button 
          onClick={() => navigate('/dynamic-routes')}
          className="btn btn-primary"
        >
          ← Listeye Dön
        </button>
      </div>
    </div>
  )
}

export default DynamicRoutesExample

