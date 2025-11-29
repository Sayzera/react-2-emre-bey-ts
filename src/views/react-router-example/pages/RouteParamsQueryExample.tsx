import { useState } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'

/**
 * RouteParamsQueryExample - Route Parameters & Query Strings Örneği
 * 
 * Bu örnek, URL parametreleri ve query string kullanımını gösterir.
 * 
 * Öğrenilenler:
 * - useParams ile route parametrelerini okuma
 * - useSearchParams ile query string parametrelerini okuma/yazma
 * - URL parametreleri vs Query string farkı
 * - Query string ile filtreleme ve sıralama
 */

// Ana Sayfa
function RouteParamsQueryExample() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Query string'den değerleri oku
  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'name'
  const page = searchParams.get('page') || '1'

  const products = [
    { id: 1, name: 'Laptop', category: 'elektronik', price: 15000 },
    { id: 2, name: 'Telefon', category: 'elektronik', price: 8000 },
    { id: 3, name: 'Kitap', category: 'kultur', price: 50 },
    { id: 4, name: 'Masa', category: 'mobilya', price: 2000 },
    { id: 5, name: 'Sandalye', category: 'mobilya', price: 1500 },
  ]

  // Filtreleme
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category === category)

  // Sıralama
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name)
    if (sort === 'price') return a.price - b.price
    return 0
  })

  const handleCategoryChange = (newCategory: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set('category', newCategory)
      newParams.set('page', '1') // Sayfa sıfırla
      return newParams
    })
  }

  const handleSortChange = (newSort: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set('sort', newSort)
      return newParams
    })
  }

  return (
    <div className="page-container">
      <h1>🔗 Route Parameters & Query Strings</h1>
      
      <div className="info-box">
        <h3>Route Params vs Query Strings</h3>
        <ul>
          <li><strong>Route Params:</strong> URL'in bir parçasıdır (örn: <code>/user/:id</code>)</li>
          <li><strong>Query Strings:</strong> URL'in sonunda <code>?</code> ile başlar (örn: <code>?category=elektronik&sort=price</code>)</li>
        </ul>
      </div>

      <div className="params-query-examples">
        {/* Route Params Örneği */}
        <section className="example-section">
          <h2>1. Route Parameters (useParams)</h2>
          <p>URL'deki dinamik parametreler:</p>
          <div className="button-group">
            <Link to="/route-params-query/user/123" className="btn btn-primary">
              Kullanıcı 123
            </Link>
            <Link to="/route-params-query/user/456" className="btn btn-primary">
              Kullanıcı 456
            </Link>
            <Link to="/route-params-query/post/react-router-guide" className="btn btn-primary">
              Post: react-router-guide
            </Link>
          </div>
        </section>

        {/* Query String Örneği */}
        <section className="example-section">
          <h2>2. Query Strings (useSearchParams)</h2>
          
          <div className="filters">
            <div className="filter-group">
              <label>Kategori:</label>
              <select 
                value={category} 
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="form-select"
              >
                <option value="all">Tümü</option>
                <option value="elektronik">Elektronik</option>
                <option value="mobilya">Mobilya</option>
                <option value="kultur">Kültür</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sıralama:</label>
              <select 
                value={sort} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="form-select"
              >
                <option value="name">İsme Göre</option>
                <option value="price">Fiyata Göre</option>
              </select>
            </div>
          </div>

          <div className="current-url">
            <p><strong>Mevcut URL:</strong></p>
            <code>/route-params-query?category={category}&sort={sort}&page={page}</code>
          </div>

          <div className="products-list">
            {sortedProducts.map(product => (
              <div key={product.id} className="card">
                <h3>{product.name}</h3>
                <p>Kategori: {product.category}</p>
                <p>Fiyat: {product.price}₺</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kombine Örnek */}
        <section className="example-section">
          <h2>3. Route Params + Query Strings</h2>
          <p>Her ikisini birlikte kullanma:</p>
          <div className="button-group">
            <Link 
              to="/route-params-query/product/1?color=red&size=large"
              className="btn btn-primary"
            >
              Ürün 1 (Kırmızı, Büyük)
            </Link>
            <Link 
              to="/route-params-query/product/2?color=blue&size=medium"
              className="btn btn-primary"
            >
              Ürün 2 (Mavi, Orta)
            </Link>
          </div>
        </section>
      </div>

      <div className="info-box">
        <h3>Bu örnekte öğrenilenler:</h3>
        <ul>
          <li><code>useParams</code> ile route parametrelerini okuma</li>
          <li><code>useSearchParams</code> ile query string okuma/yazma</li>
          <li>Query string ile filtreleme ve sıralama</li>
          <li>URLSearchParams API kullanımı</li>
          <li>Route params ve query strings'i birlikte kullanma</li>
        </ul>
      </div>
    </div>
  )
}

// User Detail (Route Params)
export function UserDetailWithParams() {
  const { userId } = useParams<{ userId: string }>()
  const [searchParams] = useSearchParams()
  
  // Query string'den değerleri oku
  const tab = searchParams.get('tab') || 'profile'
  const view = searchParams.get('view') || 'grid'

  return (
    <div className="page-container">
      <h1>👤 Kullanıcı Detayı</h1>
      
      <div className="info-box">
        <h3>Route Parameter:</h3>
        <p>User ID: <strong>{userId}</strong></p>
        <p>URL: <code>/route-params-query/user/{userId}</code></p>
      </div>

      <div className="info-box">
        <h3>Query Parameters:</h3>
        <p>Tab: <strong>{tab}</strong></p>
        <p>View: <strong>{view}</strong></p>
        <p>Full URL: <code>/route-params-query/user/{userId}?tab={tab}&view={view}</code></p>
      </div>

      <div className="button-group">
        <Link 
          to={`/route-params-query/user/${userId}?tab=profile&view=grid`}
          className="btn btn-primary"
        >
          Profile Tab (Grid)
        </Link>
        <Link 
          to={`/route-params-query/user/${userId}?tab=settings&view=list`}
          className="btn btn-primary"
        >
          Settings Tab (List)
        </Link>
      </div>
    </div>
  )
}

// Post Detail (Route Params)
export function PostDetailWithParams() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  
  const highlight = searchParams.get('highlight')
  const lang = searchParams.get('lang') || 'tr'

  return (
    <div className="page-container">
      <h1>📝 Post Detayı</h1>
      
      <div className="info-box">
        <h3>Route Parameter:</h3>
        <p>Slug: <strong>{slug}</strong></p>
      </div>

      <div className="info-box">
        <h3>Query Parameters:</h3>
        <p>Highlight: <strong>{highlight || 'Yok'}</strong></p>
        <p>Language: <strong>{lang}</strong></p>
      </div>

      <div className="card">
        <h2>Post: {slug?.replace(/-/g, ' ')}</h2>
        <p>Bu post, route param (<code>:slug</code>) ve query string kullanıyor.</p>
      </div>
    </div>
  )
}

// Product Detail (Route Params + Query Strings)
export function ProductDetailWithBoth() {
  const { productId } = useParams<{ productId: string }>()
  const [searchParams] = useSearchParams()
  
  const color = searchParams.get('color')
  const size = searchParams.get('size')

  return (
    <div className="page-container">
      <h1>📦 Ürün Detayı</h1>
      
      <div className="info-box">
        <h3>Route Parameter:</h3>
        <p>Product ID: <strong>{productId}</strong></p>
      </div>

      <div className="info-box">
        <h3>Query Parameters:</h3>
        <p>Renk: <strong>{color || 'Belirtilmemiş'}</strong></p>
        <p>Beden: <strong>{size || 'Belirtilmemiş'}</strong></p>
      </div>

      <div className="card">
        <h2>Ürün {productId}</h2>
        <p>Renk: {color}</p>
        <p>Beden: {size}</p>
        <p>
          Bu örnek, hem route param (<code>:productId</code>) hem de 
          query string (<code>?color=red&size=large</code>) kullanımını gösterir.
        </p>
      </div>
    </div>
  )
}

export default RouteParamsQueryExample

