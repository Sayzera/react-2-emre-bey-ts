import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
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

// Yeni örnekler
import NestedRoutesExample, { 
  NestedRoutesIndex, 
  NestedUsersPage, 
  NestedPostsPage, 
  NestedSettingsPage 
} from './pages/NestedRoutesExample'
import DynamicRoutesExample, { 
  ProductDetailPage as DynamicProductDetail,
  UserProfilePage,
  CategoryProductPage
} from './pages/DynamicRoutesExample'
import ProtectedRoutesExample, {
  LoginPage as ProtectedLoginPage,
  ProtectedDashboard,
  ProtectedProfile,
  ProtectedAdmin
} from './pages/ProtectedRoutesExample'
import { AuthProvider } from './components/AuthProvider'
import { ProtectedRoute as NewProtectedRoute } from './components/AuthProtectedRoute'
import LazyLoadingExample, {
  LazyChartPage,
  LazyTablePage
} from './pages/LazyLoadingExample'
import RouteParamsQueryExample, {
  UserDetailWithParams,
  PostDetailWithParams,
  ProductDetailWithBoth
} from './pages/RouteParamsQueryExample'
import NavigationGuardsExample, {
  FormGuardPage,
  ProtectedPageGuard,
  LoginPageGuard,
  LocationTrackerPage
} from './pages/NavigationGuardsExample'
import ErrorHandlingExample, {
  ErrorBoundaryPage,
  ForbiddenPage,
  ServerErrorPage
} from './pages/ErrorHandlingExample'
import ProgrammaticNavigationExample, {
  SuccessPage,
  AboutPage as ProgAboutPage,
  UserPage,
  ReplacedPage,
  RelativePage,
  LoginPage as ProgLoginPage,
  DashboardPage as ProgDashboardPage
} from './pages/ProgrammaticNavigationExample'
import ClassComponentExample, {
  UserDetailClass,
  ProductListClass,
  NavigationClass
} from './pages/ClassComponentExample'

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
            
            {/* Yeni Örnekler */}
            <NavLink 
              to="/nested-routes" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Nested Routes
            </NavLink>
            
            <NavLink 
              to="/dynamic-routes" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Dynamic Routes
            </NavLink>
            
            <NavLink 
              to="/protected-routes" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Protected Routes
            </NavLink>
            
            <NavLink 
              to="/lazy-loading" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Lazy Loading
            </NavLink>
            
            <NavLink 
              to="/route-params-query" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Params & Query
            </NavLink>
            
            <NavLink 
              to="/navigation-guards" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Navigation Guards
            </NavLink>
            
            <NavLink 
              to="/error-handling" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Error Handling
            </NavLink>
            
            <NavLink 
              to="/programmatic-navigation" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Programmatic Nav
            </NavLink>
            
            <NavLink 
              to="/class-component" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Class Component
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
            
            {/* YENİ ÖRNEKLER */}
            
            {/* 1. Nested Routes Example */}
            <Route path="/nested-routes" element={<NestedRoutesExample />}>
              <Route index element={<NestedRoutesIndex />} />
              <Route path="users" element={<NestedUsersPage />} />
              <Route path="posts" element={<NestedPostsPage />} />
              <Route path="settings" element={<NestedSettingsPage />} />
            </Route>
            
            {/* 2. Dynamic Routes Example */}
            <Route path="/dynamic-routes" element={<DynamicRoutesExample />} />
            <Route path="/dynamic-routes/product/:id" element={<DynamicProductDetail />} />
            <Route path="/dynamic-routes/user/:username" element={<UserProfilePage />} />
            <Route path="/dynamic-routes/category/:category/product/:slug" element={<CategoryProductPage />} />
            
            {/* 3. Protected Routes Example */}
            <Route 
              path="/protected-routes" 
              element={
                <AuthProvider>
                  <ProtectedRoutesExample />
                </AuthProvider>
              } 
            />
            <Route 
              path="/protected-routes/login" 
              element={
                <AuthProvider>
                  <ProtectedLoginPage />
                </AuthProvider>
              } 
            />
            <Route 
              path="/protected-routes/dashboard" 
              element={
                <AuthProvider>
                  <NewProtectedRoute>
                    <ProtectedDashboard />
                  </NewProtectedRoute>
                </AuthProvider>
              } 
            />
            <Route 
              path="/protected-routes/profile" 
              element={
                <AuthProvider>
                  <NewProtectedRoute>
                    <ProtectedProfile />
                  </NewProtectedRoute>
                </AuthProvider>
              } 
            />
            <Route 
              path="/protected-routes/admin" 
              element={
                <AuthProvider>
                  <NewProtectedRoute>
                    <ProtectedAdmin />
                  </NewProtectedRoute>
                </AuthProvider>
              } 
            />
            
            {/* 4. Lazy Loading Example */}
            <Route path="/lazy-loading" element={<LazyLoadingExample />}>
              <Route path="chart" element={<LazyChartPage />} />
              <Route path="table" element={<LazyTablePage />} />
            </Route>
            
            {/* 5. Route Parameters & Query Strings Example */}
            <Route path="/route-params-query" element={<RouteParamsQueryExample />} />
            <Route path="/route-params-query/user/:userId" element={<UserDetailWithParams />} />
            <Route path="/route-params-query/post/:slug" element={<PostDetailWithParams />} />
            <Route path="/route-params-query/product/:productId" element={<ProductDetailWithBoth />} />
            
            {/* 6. Navigation Guards Example */}
            <Route path="/navigation-guards" element={<NavigationGuardsExample />} />
            <Route path="/navigation-guards/form" element={<FormGuardPage />} />
            <Route path="/navigation-guards/protected" element={<ProtectedPageGuard />} />
            <Route path="/navigation-guards/login" element={<LoginPageGuard />} />
            <Route path="/navigation-guards/tracker" element={<LocationTrackerPage />} />
            
            {/* 7. Error Handling Example */}
            <Route path="/error-handling" element={<ErrorHandlingExample />} />
            <Route path="/error-handling/error-boundary" element={<ErrorBoundaryPage />} />
            <Route path="/error-handling/403" element={<ForbiddenPage />} />
            <Route path="/error-handling/500" element={<ServerErrorPage />} />
            
            {/* 8. Programmatic Navigation Example */}
            <Route path="/programmatic-navigation" element={<ProgrammaticNavigationExample />} />
            <Route path="/programmatic-navigation/success" element={<SuccessPage />} />
            <Route path="/programmatic-navigation/about" element={<ProgAboutPage />} />
            <Route path="/programmatic-navigation/user" element={<UserPage />} />
            <Route path="/programmatic-navigation/replaced" element={<ReplacedPage />} />
            <Route path="/programmatic-navigation/relative-page" element={<RelativePage />} />
            <Route path="/programmatic-navigation/login" element={<ProgLoginPage />} />
            <Route path="/programmatic-navigation/dashboard" element={<ProgDashboardPage />} />
            
            {/* 9. Class Component Example */}
            <Route path="/class-component" element={<ClassComponentExample />} />
            <Route path="/class-component/user/:id" element={<UserDetailClass />} />
            <Route path="/class-component/products" element={<ProductListClass />} />
            <Route path="/class-component/navigation" element={<NavigationClass />} />
            
            {/* 404 Not Found: Tüm eşleşmeyen route'lar için */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default ReactRouterExample

