import { useSearchParams, Link } from 'react-router-dom'
import { useMemo } from 'react'

/**
 * FilteredProductsPage - Filtrelenmiş Ürünler Sayfası
 * 
 * Ders 13: Query Parameters ile Filtreleme
 * 
 * Öğrenilenler:
 * - Query parameters ile filtreleme
 * - URL'den state senkronizasyonu
 * - Filtre state'ini URL'de tutma
 */
function FilteredProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // URL'den filtreleri oku (Ders 13)
  const category = searchParams.get('category') || 'all'
  const minPrice = searchParams.get('minPrice') || '0'
  const maxPrice = searchParams.get('maxPrice') || '50000'
  const sortBy = searchParams.get('sortBy') || 'name'

  const products = [
    { id: 1, name: 'Laptop', price: 15000, category: 'Elektronik' },
    { id: 2, name: 'Telefon', price: 8000, category: 'Elektronik' },
    { id: 3, name: 'Tablet', price: 5000, category: 'Elektronik' },
    { id: 4, name: 'Koltuk', price: 3000, category: 'Mobilya' },
    { id: 5, name: 'Masa', price: 2000, category: 'Mobilya' },
  ]

  // Filtreleme ve sıralama
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => {
      if (category !== 'all' && p.category !== category) return false
      if (p.price < Number(minPrice) || p.price > Number(maxPrice)) return false
      return true
    })

    // Sıralama
    filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

    return filtered
  }, [category, minPrice, maxPrice, sortBy])

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === '' || value === 'all') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setSearchParams(newParams)
  }

  return (
    <div className="page-container">
      <h1>🔍 Filtrelenmiş Ürünler</h1>
      
      <div className="filters-container">
        <h3>Filtreler:</h3>
        
        <div className="filter-group">
          <label>Kategori:</label>
          <select 
            value={category} 
            onChange={(e) => updateFilter('category', e.target.value)}
            className="form-input"
          >
            <option value="all">Tümü</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Mobilya">Mobilya</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Min Fiyat:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="filter-group">
          <label>Max Fiyat:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="form-input"
          />
        </div>

        <div className="filter-group">
          <label>Sıralama:</label>
          <select 
            value={sortBy} 
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="form-input"
          >
            <option value="name">İsme Göre</option>
            <option value="price">Fiyata Göre</option>
          </select>
        </div>
      </div>

      <div className="info-box">
        <h3>Mevcut URL:</h3>
        <code>{window.location.href}</code>
        <p className="hint">
          Filtreler URL'de tutuluyor. Bu sayfayı bookmark'layabilir veya paylaşabilirsiniz!
        </p>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Fiyat: {product.price}₺</p>
            <p>Kategori: {product.category}</p>
          </div>
        ))}
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>Query parameters ile filtreleme</li>
          <li>URL'den state senkronizasyonu</li>
          <li>Filtre state'ini URL'de tutma</li>
          <li>Bookmark ve paylaşılabilir URL'ler</li>
          <li><code>useSearchParams</code> ile filtre yönetimi</li>
        </ul>
      </div>
    </div>
  )
}

export default FilteredProductsPage

