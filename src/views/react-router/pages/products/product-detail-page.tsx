import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { ProductsContextType } from "./products-page";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate()

  const [pageLoading, setPageLoading] = useState(false)

  const { products, selectedCategory } =
    useOutletContext<ProductsContextType>();

  useEffect(() => {
    setPageLoading(true)
    let timer: ReturnType<typeof setTimeout> | undefined;

    if(productId) {
         timer = setTimeout(() => {
            setPageLoading(false)
         }, 1000);
    }

    return () => {
        if (timer) {
            clearInterval(timer)
        }
    }
  }, [productId])

  const selectedProduct = productId
    ? products.find((p) => p.id === Number(productId))
    : null;

    const goToProductsPage = () => {
        navigate('/urunler')
    }   

  if (!selectedProduct) {
    return <div className="page-container">
        <h2>Ürün bulunamadı</h2>
        <button onClick={goToProductsPage} className="btn btn-primary">
            Ürünlere Dön
        </button>
    </div>;
  }

  if(pageLoading) {
    return (
        <div className="flex items-center justify-center">
            <Loader className="animate-spin w-5 h-5" />
        </div>
    )
  }
  return (
     <div className="page-container">
      <h2>📦 Ürün Detayı</h2>
      
      <div className="product-detail">
        <h3>{selectedProduct.name}</h3>
        <p><strong>Fiyat:</strong> {selectedProduct.price}₺</p>
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
          onClick={() => navigate('/urunler')} 
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

export default ProductDetailPage;
