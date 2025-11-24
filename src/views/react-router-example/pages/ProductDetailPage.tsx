import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import type { ProductsContextType } from './ProductsPage'

/**
 * ProductDetailPage - Ürün Detay Sayfası (Nested Route)
 * 
 * Ders 5: Nested Routes
 * Ders 9: useOutletContext
 * 
 * Öğrenilenler:
 * - Nested route'larda useParams kullanımı
 * - useOutletContext ile parent verisine erişim
 * - Relative navigation
 */
function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  
  // Parent route'tan context al (Ders 9)
  const { products, selectedCategory } = useOutletContext<ProductsContextType>()

  const product = productId ? products.find(p => p.id === Number(productId)) : null

  if (!product) {
    return (
      <div className="page-container">
        <h2>Ürün bulunamadı</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Ürünlere Dön
        </button>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h2>📦 Ürün Detayı</h2>
      
      <div className="product-detail">
        <h3>{product.name}</h3>
        <p><strong>Fiyat:</strong> {product.price}₺</p>
        <p><strong>Kategori:</strong> {selectedCategory}</p>
        <p className="hint">
          Bu sayfa nested route olarak render edildi. 
          URL: /products/{productId}
          <br />
          Bu veriler useOutletContext ile parent route'tan alındı!
        </p>
      </div>

      <div className="button-group">
        <button 
          onClick={() => navigate('/products')} 
          className="btn btn-primary"
        >
          Ürünlere Dön
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
          <li>Nested route'larda parametre okuma</li>
          <li><code>useOutletContext</code> hook ile parent verisine erişim</li>
          <li>Nested route'larda veri paylaşımı</li>
          <li>Type-safe context kullanımı</li>
          <li>Relative ve absolute navigation farkı</li>
        </ul>
      </div>
    </div>
  )
}

export default ProductDetailPage

