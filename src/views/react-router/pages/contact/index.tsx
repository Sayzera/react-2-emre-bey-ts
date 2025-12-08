import { use, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Contact() {
  /**
   * TODO: Query String kullanarak useEffect içersinde default olarak
   * name, email alanlarında random değer atayınız burda değer atayacağımız kısımda sayfa kesinlikle
   * yenilenmemelidir.
   *
   * Parametreleri ayarla kısmında random değerler ekleyeceğiz (name,email)
   * reset ile bu değerleri ve urlde olan query stirngleri temizleyeceğiz
   */

  const [searchParams, setSearchParams] = useSearchParams();
  const [isReset, setIsReset] = useState(false);
  
  let randomName = "";
  let randomEmail = "";

  useEffect(() => {
    // const urlName = searchParams.get("name")
    // const urlEmail = searchParams.get("email")
    // setSearchParams({ name: randomName, email: randomEmail })
    if (isReset) {
      return;
    }
  }, [searchParams]);

  const createRandom = () => {
    setIsReset(false);
    randomName = `User${Math.floor(Math.random() * 1000)}`;
    randomEmail = `${randomName.toLowerCase()}@example.com`;
    setSearchParams({ name: randomName, email: randomEmail });
  };

  const resetButton = () => {
    setIsReset(true);
    // setSearchParams({ name: "", email: "" })
    setSearchParams({});
  };

  return (
    <div className="page-container">
      <h1>📧 İletişim</h1>

      <div className="info-box">
        <h3>Query Parametreleri:</h3>
        <p>
          <strong>name:</strong>
          {searchParams.get("name")}
        </p>
        <p>
          <strong>email:</strong>
          {searchParams.get("email")}
        </p>

        <div className="button-group">
          <button className="btn btn-primary" onClick={createRandom}>
            Parametreleri Ayarla
          </button>
          <button className="btn btn-secondary" onClick={resetButton}>
            Parametreleri Temizle
          </button>
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
