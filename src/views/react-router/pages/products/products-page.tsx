import { Link, Outlet, useParams } from 'react-router-dom'
import { products } from './products-data'


export interface ProductsContextType {
  products: Array<{id: number; name:string; category:string; price:number}>
  selectedCategory?:string;
}


function ProductsPage() {
  const {
    productId
  } = useParams();

  const contextValue:ProductsContextType = {
    products,
    selectedCategory: 'Elektronik'
  }



  return (
    <div className='page-container'>

      <h1>Ürünler</h1>

      <div className='products-grid'>
        {
          products.map((product) => (
            <div key={product.id} className={`product-card ${product.id === Number(productId) ? 'product-card-active' : ''}`}>
              <h3>{product.name}</h3>
              <p>Fiyat: {product.price}</p>
              <Link
               className='btn btn-primary '
               to={`/urunler/${product.id}`}
              >
              Detayları Gör</Link>
            </div>
          ))
        }

      </div>
      
      <Outlet context={contextValue} />

    </div>
  )
}

export default ProductsPage