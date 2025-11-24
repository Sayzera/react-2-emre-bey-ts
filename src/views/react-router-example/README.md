# React Router Öğretim Rehberi

Bu örnek, React Router'ı sıfırdan öğrenmek için hazırlanmış kapsamlı bir eğitim materyalidir.

## 📚 Öğrenilecek Konular

### 1. Temel Kavramlar

#### BrowserRouter
- Uygulamayı router ile sarmalama
- Browser history API kullanımı
- URL değişikliklerini yönetme

#### Routes ve Route
- Rotaları tanımlama
- Path ve element prop'ları
- Route eşleştirme mantığı

#### Link ve NavLink
- Sayfa arası geçiş
- Sayfa yenilenmeden navigation
- Aktif sayfa için özel stil (NavLink)

#### Outlet
- Nested route'lar için placeholder
- Parent route içinde child route render etme

### 2. Hook'lar

#### useNavigate
```tsx
const navigate = useNavigate()
navigate('/about')           // Yönlendirme
navigate(-1)                // Geri git
navigate('/user/123', { replace: true }) // Replace ile yönlendirme
```

#### useParams
```tsx
const { id } = useParams<{ id: string }>()
// URL: /user/123 -> id = "123"
```

#### useLocation
```tsx
const location = useLocation()
// location.pathname, location.search, location.hash, location.state
```

#### useSearchParams
```tsx
const [searchParams, setSearchParams] = useSearchParams()
const name = searchParams.get('name')
setSearchParams({ name: 'Emre' })
```

### 3. İleri Seviye Konular

#### Nested Routes
- İç içe route yapısı
- Parent ve child route'lar
- Relative path kullanımı

#### Protected Routes
- Authentication kontrolü
- Korumalı sayfalar
- Navigate component ile yönlendirme

#### 404 Not Found
- Catch-all route (`path="*"`)
- Eşleşmeyen route'ları yakalama

## 🚀 Kullanım

1. `App.tsx` dosyasında `ReactRouterExample` component'ini import edin ve kullanın:

```tsx
import ReactRouterExample from "./views/react-router-example"

function App() {
  return <ReactRouterExample />
}
```

2. Tarayıcıda farklı route'ları test edin:
   - `/` - Ana sayfa
   - `/about` - Hakkında
   - `/contact` - İletişim
   - `/user/123` - Kullanıcı detayı
   - `/products` - Ürünler listesi
   - `/products/1` - Ürün detayı (nested)
   - `/dashboard` - Dashboard (protected)
   - `/dashboard/profile` - Profil (nested protected)
   - `/olmayan-sayfa` - 404 sayfası

## 📝 Öğretim Sırası Önerisi

1. **Temel Routing** (HomePage, AboutPage, ContactPage)
   - BrowserRouter, Routes, Route
   - Link ve NavLink

2. **Dinamik Routes** (UserDetailPage)
   - useParams hook
   - URL parametreleri

3. **Navigation Hook'ları** (HomePage)
   - useNavigate
   - Programatik yönlendirme

4. **Location ve Search Params** (AboutPage, ContactPage)
   - useLocation
   - useSearchParams

5. **Nested Routes** (ProductsPage, ProductDetailPage)
   - Outlet component
   - İç içe route yapısı

6. **Protected Routes** (DashboardPage, ProtectedRoute)
   - Route koruma mantığı
   - Navigate component

7. **404 Sayfası** (NotFoundPage)
   - Catch-all route

## 🎯 Pratik Ödevler

1. Yeni bir "Blog" sayfası ekleyin ve blog yazılarını listeleyin
2. Her blog yazısı için dinamik route oluşturun (`/blog/:slug`)
3. Blog yazılarında kategori filtreleme için search params kullanın
4. Admin paneli için protected route oluşturun
5. Admin paneli içinde nested route'lar ekleyin (posts, users, settings)

## 📖 Ek Kaynaklar

- [React Router Resmi Dokümantasyonu](https://reactrouter.com/)
- [React Router v6 Migration Guide](https://reactrouter.com/en/main/upgrading/v5)

