function Contact() {
    
    /**
     * TODO: Query String kullanarak useEffect içersinde default olarak
     * name, email alanlarında random değer atayınız burda değer atayacağımız kısımda sayfa kesinlikle
     * yenilenmemelidir.
     * 
     * Parametreleri ayarla kısmında random değerler ekleyeceğiz (name,email)
     * reset ile bu değerleri ve urlde olan query stirngleri temizleyeceğiz
     */
  return (
    <div className="page-container">
      <h1>📧 İletişim</h1>

      <div className="info-box">
        <h3>Query Parametreleri:</h3>
        <p>
          <strong>name:</strong>{" "}
        </p>
        <p>
          <strong>email:</strong>{" "}
        </p>

        <div className="button-group">
          <button className="btn btn-primary">Parametreleri Ayarla</button>
          <button className="btn btn-secondary">Parametreleri Temizle</button>
        </div>

        <p className="hint">
          URL'yi şu şekilde değiştirebilirsiniz:
          /contact?name=Emre&email=emre@example.com
        </p>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>
            <code>useSearchParams</code> hook ile query string okuma
          </li>
          <li>Query parametrelerini güncelleme</li>
          <li>URL'deki ?name=value&email=value formatı</li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;
