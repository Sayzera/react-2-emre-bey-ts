import {Link,Outlet} from 'react-router-dom'

function Dashboard() {
  return (
    <div className="page-container">
      <h1>📊 Dashboard</h1>
      <p className="success-message">
        ✅ Bu sayfa korumalıdır. Giriş yapmadan erişemezsiniz!
      </p>

      <div className="dashboard-nav">
        <Link to="/dashboard/profile" className="btn btn-link">
          Profil
        </Link>
        <Link to="/dashboard/settings" className="btn btn-link">
          Ayarlar
        </Link>
      </div>

      {/* Nested protected routes */}
      <div className="nested-route-container">
        <Outlet />
      </div>

      <div className="info-box">
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>Protected route (korumalı sayfa) kavramı</li>
          <li>Authentication kontrolü</li>
          <li>Nested protected routes</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard