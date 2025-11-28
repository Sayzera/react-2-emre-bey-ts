import { useLocation, useSearchParams } from "react-router-dom";
import RefreshComponent from "./components/refresh-component";
import { useEffect } from "react";

const state: {
  [key: string]: unknown;
} = {};

function AboutPage() {
  // TODO: Hash nedir ?
  // TODO: url karekter sınırı nedir
  const location = useLocation();
  state[location.key] = "deneme";
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = searchParams.get("pageNumber");
  const userId = searchParams.get("userId");

  useEffect(() => {
    const el = document.getElementById(location.hash.replace("#", ""));

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  const changeQueryString = (key: string, value: string) => {
    setSearchParams({
      [key]: value,
    });
  };

  return (
    <div className="page-container">
      <h1>📖 Hakkında</h1>
      <p>
        Bu sayfa React Router'ın temel kavramlarını öğretmek için
        hazırlanmıştır.

        {pageNumber} {userId}
      </p>

      <div className="info-box">
        <h3>
          Mevcut Konum Bilgisi:
          <pre>{JSON.stringify(location, null, 2)}</pre>
          <RefreshComponent key={location.key} />
        </h3>
      </div>

      <div className="info-box">
        <h3>
          Mevcut Konum Bilgisi:
          <pre>{JSON.stringify(location, null, 2)}</pre>
          <RefreshComponent key={location.key} />
        </h3>
      </div>

      <div className="info-box">
        <h3>
          Mevcut Konum Bilgisi:
          <pre>{JSON.stringify(location, null, 2)}</pre>
          <RefreshComponent key={location.key} />
        </h3>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>
            <code>useLocation</code> hook ile konum bilgisi alma
          </li>
          <li>Location objesinin içeriği (pathname, search, hash, state)</li>
        </ul>
      </div>

      <div className="info-box" id="deneme">
        <h3>Query String Değiştir</h3>
        <button
          className="btn btn-secondary"
          onClick={() => {
            changeQueryString(
              "pageNumber",
              Math.floor(Math.random() * 10).toString()
            );
          }}
        >
          Page Number Değerini Değiştir
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
