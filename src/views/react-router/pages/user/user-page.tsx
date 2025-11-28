import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
      if(id) {
        console.log('id var', id)
      }
  }, [id])

  const goToAnotherUser = () => {
    navigate('/user/' + Math.floor( Math.random() * 10))
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="page-container">
      <h1>👤 Kullanıcı Detayı</h1>

      <div className="info-box">
        <h3>URL Parametresi:</h3>
        <p>
          Kullanıcı ID: <strong>{id}</strong>
        </p>
        <p className="hint">URL formatı: /user/:id (örnek: /user/123)</p>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={goToAnotherUser}>
          Farklı Kullanıcıya Git (ID: 456)
        </button>
        <button className="btn btn-secondary" onClick={goBack}>Geri Git</button>
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>
            <code>useParams</code> hook ile URL parametrelerini okuma
          </li>
          <li>
            Dinamik route tanımlama (<code>:id</code>)
          </li>
          <li>
            <code>navigate(-1)</code> ile geri gitme
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserPage;
