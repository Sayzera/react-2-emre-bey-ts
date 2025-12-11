import { useSearchParams } from "react-router-dom";
import { filteredProducts as tempProductData } from "./products-data";
import { useMemo } from "react";

/**
 * Node / 3rd  party paketleri
 * Proje içi alias import
 * Type / Schema / utilty
 * Style, assets vs
 */

function FilteredProducts() {

  // TODO: setSearchParams kısmını nuqs kutuphanesi kullanarak yapalım 
  // TODO: Socket.io Araştırma, react ile nasıl kullanılır nodejs tarafı nasıl yapılandırılmalı ? 
  const [searchParams, setSearchParams] = useSearchParams();

  // En pahalı ürünü bul
  const maxPriceProduct =
    Array.isArray(tempProductData) && tempProductData.length > 0
      ? tempProductData.sort((a, b) => b.price - a.price)
      : null;

  const category = searchParams.get("category") || "all";
  const productName = searchParams.get("productName") || "";

  // Url'den filtreleri oku
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice =
    searchParams.get("maxPrice") ||
    maxPriceProduct?.[0].price.toString() ||
    999999;
  const sortBy = searchParams.get("sortBy") || "name";

  const filteredProducts = useMemo(() => {
    return tempProductData
      .filter((product) => {
        const categoryCondition =
          product.category === category || category === "all";
        const maxMinPriceCondition =
        Number(minPrice) <= product.price &&
        Number(maxPrice) >= product.price
        const nameFilterCondition = product.name
          .toLocaleLowerCase()
          .includes(productName.toLocaleLowerCase());

        return maxMinPriceCondition && nameFilterCondition && categoryCondition;
      })
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [productName, category, minPrice, maxPrice, sortBy]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === "" || value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value.trim());
    }

    setSearchParams(newParams);
  };

  return (
    <div>
      <div className="page-container">
        <h1>🔍 Filtrelenmiş Ürünler</h1>

        <div className="filters-container">
          <h3>Filtreler:</h3>

          <div className="filter-group">
            <label>Ürün Adı</label>
            {/* 
              Number karekter dışında veri girişi yapamamalı
            */}
            <input
              type="text"
              className="form-input"
              onChange={(e) => updateFilter("productName", e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Kategori:</label>
            <select
              className="form-input"
              onChange={(e) => updateFilter("category", e.target.value)}
            >
              <option value="all">Tümü</option>
              <option value="Elektronik">Elektronik</option>
              <option value="Mobilya">Mobilya</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min Fiyat:</label>
            {/* 
              Number karekter dışında veri girişi yapamamalı
            */}
            <input
              type="number"
              className="form-input"
              onChange={(e) => updateFilter("minPrice", e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Max Fiyat:</label>
            <input
              type="number"
              className="form-input"
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Sıralama:</label>
            <select
              className="form-input"
              onChange={(e) => updateFilter("sortBy", e.target.value)}
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
            Filtreler URL'de tutuluyor. Bu sayfayı bookmark'layabilir veya
            paylaşabilirsiniz!
          </p>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Fiyat: {product.price}</p>
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
            <li>
              <code>useSearchParams</code> ile filtre yönetimi
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FilteredProducts;
