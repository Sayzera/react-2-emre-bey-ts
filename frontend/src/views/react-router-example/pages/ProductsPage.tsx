import { Link, Outlet, useNavigate } from 'react-router-dom'

/**
 * ProductsPage - Ürünler Sayfası (Nested Route Örneği)
 * 
 * Ders 5: Nested Routes
 * Ders 9: useOutletContext
 * 
 * Öğrenilenler:
 * - Outlet component ile nested route'ları render etme
 * - Nested routing yapısı
 * - useOutletContext ile veri geçirme
 */

// Context tipi tanımla (Ders 9)
export interface ProductsContextType {
  products: Array<{ id: number; name: string; price: number; category: string }>
  selectedCategory?: string
}

function ProductsPage() {
  const navigate = useNavigate()

  const products = [
    { id: 1, name: 'Laptop', price: 15000, category: 'Elektronik' },
    { id: 2, name: 'Telefon', price: 8000, category: 'Elektronik' },
    { id: 3, name: 'Tablet', price: 5000, category: 'Elektronik' },
  ]

  // Context değeri oluştur (Ders 9)
  const contextValue: ProductsContextType = {
    products,
    selectedCategory: 'Elektronik'
  }

  return (
    <div className="page-container">
      <h1>🛍️ Ürünler</h1>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Fiyat: {product.price}₺</p>
            {/* Nested route'a yönlendirme */}
            <Link 
              to={`/products/${product.id}`}
              className="btn btn-primary"
            >
              Detayları Gör
            </Link>
          </div>
        ))}
      </div>

      {/* Outlet: Nested route'lar buraya render edilir */}
      {/* Context geçirme (Ders 9) */}
      <div className="nested-route-container">
        <Outlet context={contextValue} />
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li><code>Outlet</code> component ile nested route render etme</li>
          <li>İç içe route yapısı (parent/child routes)</li>
          <li><code>Outlet</code> component'e context geçirme</li>
          <li>Parent route'tan child route'a veri aktarımı</li>
        </ul>
      </div>
    </div>
  )
}

export default ProductsPage

