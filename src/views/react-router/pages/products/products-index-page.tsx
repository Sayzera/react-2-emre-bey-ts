

const ProductsIndexPage = () => {
  return (
   <div className="page-container">
      <h2>📦 Ürünler Listesi</h2>
      <p>Bu sayfa index route olarak render edildi.</p>
      <p className="hint">
        URL: /products (index route)
        <br />
        Bu sayfa /products'a gidildiğinde ve başka bir child route seçilmediğinde gösterilir.
      </p>
      
      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>Index route nedir ve ne zaman kullanılır</li>
          <li>Varsayılan child route tanımlama</li>
          <li>Nested route'larda default sayfa</li>
          <li><code>&lt;Route index /&gt;</code> kullanımı</li>
        </ul>
      </div>
    </div>
  )
}

export default ProductsIndexPage