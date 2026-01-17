import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import UserDetailPage from './pages/UserDetailPage'
import ProductsPage from './pages/ProductsPage'
import ProductsIndexPage from './pages/ProductsIndexPage'
import ProductDetailPage from './pages/ProductDetailPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'
import RelativeLinksExample from './pages/RelativeLinksExample'
import FormPage from './pages/FormPage'
import FormSuccessPage from './pages/FormSuccessPage'
import FilteredProductsPage from './pages/FilteredProductsPage'
import './styles.css'

/**
 * REACT ROUTER ÖĞRETİM ÖRNEĞİ
 * 
 * Bu örnek React Router'ın temel ve ileri seviye kavramlarını öğretmek için hazırlanmıştır.
 * 
 * ÖĞRENİLECEK KONULAR:
 * 
 * 1. TEMEL KAVRAMLAR:
 *    - BrowserRouter: Uygulamayı router ile sarmalama
 *    - Routes ve Route: Rotaları tanımlama
 *    - Link ve NavLink: Sayfa arası geçiş
 *    - Outlet: Nested route'lar için placeholder
 * 
 * 2. HOOK'LAR:
 *    - useNavigate: Programatik yönlendirme
 *    - useParams: URL parametrelerini okuma
 *    - useLocation: Mevcut konum bilgisi
 *    - useSearchParams: Query string parametreleri
 * 
 * 3. İLERİ SEVİYE:
 *    - Nested Routes: İç içe rotalar
 *    - Protected Routes: Korumalı rotalar
 *    - 404 Not Found: Olmayan sayfalar için fallback
 */

function ReactRouterExample() {
  return (
    <BrowserRouter>
      <div className="router-example">
        {/* NAVİGASYON MENÜSÜ */}
        <nav className="navbar">
          <div className="nav-brand">
            <h2>React Router Örneği</h2>
          </div>
          
          <div className="nav-links">
            {/* Link: Normal link, sayfa yenilenmez */}
            <Link to="/" className="nav-link">
              Ana Sayfa
            </Link>
            
            {/* NavLink: Aktif sayfa için özel stil */}
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Hakkında
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              İletişim
            </NavLink>
            
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Ürünler
            </NavLink>
            
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Dashboard
            </NavLink>
            
            <NavLink 
              to="/form" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Form (State)
            </NavLink>
            
            <NavLink 
              to="/filtered-products" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Filtreleme
            </NavLink>
            
            <NavLink 
              to="/relative-links" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Relative Links
            </NavLink>
          </div>
        </nav>

        {/* ROUTE TANIMLAMALARI */}
        <main className="main-content">
          <Routes>
            {/* Basit Route: path ve element */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Dinamik Route: :id parametresi */}
            <Route path="/user/:id" element={<UserDetailPage />} />
            
            {/* Nested Routes: Ürünler sayfası ve alt sayfaları */}
            <Route path="/products" element={<ProductsPage />}>
              {/* Index Route: Ders 8 - Varsayılan child route */}
              <Route index element={<ProductsIndexPage />} />
              {/* Bu route'lar ProductsPage içindeki <Outlet /> ile render edilir */}
              <Route path=":productId" element={<ProductDetailPage />} />
            </Route>
            
            {/* Route State Örneği: Ders 12 */}
            <Route path="/form" element={<FormPage />} />
            <Route path="/form-success" element={<FormSuccessPage />} />
            
            {/* Query Parameters ile Filtreleme: Ders 13 */}
            <Route path="/filtered-products" element={<FilteredProductsPage />} />
            
            {/* Relative Links Örneği: Ders 10 */}
            <Route path="/relative-links" element={<RelativeLinksExample />} />
            
            {/* Protected Route: Korumalı sayfa */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            >
              {/* Nested protected routes */}
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* 404 Not Found: Tüm eşleşmeyen route'lar için */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default ReactRouterExample

