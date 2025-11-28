import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/about");
  };

  const handleUserNavigate = () => {
    navigate("/user/123?pageNumber=2&userId=44", {
      state: {
       
        userId: 1,
        userName: "Sezer Bölük",
        token: "312321>£#we213>£#wqe13213e",
      },
    });
  };
  return (
    <div className="page-container">
      <h1>🏠 Ana Sayfa</h1>
      <p>React Router öğretim örneğine hoş geldiniz!</p>

      <div className="button-group">
        <button onClick={handleNavigate} className="btn btn-primary">
          useNavigate ile Hakkında'ya Git
        </button>

        <button onClick={handleUserNavigate} className="btn btn-secondary">
          Kullanıcı Detayına Git (ID: 123)
        </button>

        <Link to="/products" className="btn btn-link">
          Link ile Ürünlere Git
        </Link>

        <Link
          to={{
            hash:'#deneme',
            pathname: '/about',
              search: "?pageNumber=2&userId=44",
          }}
          className="btn btn-link"
      
        >
          Hakkında Sayfasına Git
        </Link>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>
            <code>useNavigate</code> hook ile programatik yönlendirme
          </li>
          <li>
            <code>Link</code> component ile sayfa geçişi
          </li>
          <li>Parametreli route'lara yönlendirme</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
