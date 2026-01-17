# React Router Öğretim Planı

## 🎯 Öğretim Hedefleri

Bu örnek ile öğrenciniz React Router'ın tüm temel ve ileri seviye kavramlarını öğrenecek.

---

## 📖 React Router Nedir? Ne İşe Yarar?

### React Router Nedir?

**React Router**, React uygulamalarında **client-side routing** (istemci tarafı yönlendirme) yapmak için kullanılan popüler bir kütüphanedir. React uygulamalarında sayfa geçişlerini ve URL yönetimini sağlar.

### Neden React Router Kullanılır?

#### 1. **Single Page Application (SPA) Desteği**
- React uygulamaları tek bir HTML sayfasından oluşur
- Sayfa yenilenmeden farklı içerikler gösterilir
- React Router, URL değişikliklerini yöneterek farklı sayfaları gösterir

#### 2. **URL Yönetimi**
- Her sayfa için anlamlı URL'ler oluşturulur (`/products`, `/about`)
- Kullanıcılar URL'i bookmark'layabilir veya paylaşabilir
- Tarayıcı geri/ileri butonları çalışır

#### 3. **Sayfa Geçişleri**
- Sayfa yenilenmeden hızlı geçişler
- Smooth kullanıcı deneyimi
- State kaybı olmadan navigasyon

#### 4. **Dinamik Routing**
- URL parametreleri ile dinamik içerik (`/user/123`)
- Query string ile filtreleme (`/products?category=elektronik`)
- Koşullu yönlendirme ve korumalı sayfalar

#### 5. **SEO ve Bookmark Desteği**
- Her sayfa için benzersiz URL
- Arama motorları için optimize edilmiş
- Kullanıcılar bookmark'layabilir

### React Router Olmadan Ne Olurdu?

❌ **Sorunlar:**
- Tüm içerik tek bir sayfada olurdu
- URL değişmezdi (her zaman `/`)
- Bookmark ve paylaşım çalışmazdı
- Browser geri/ileri butonları çalışmazdı
- Sayfa yenileme gerektiğinde state kaybolurdu

✅ **React Router ile:**
- Her sayfa için benzersiz URL
- Sayfa yenilenmeden geçişler
- Bookmark ve paylaşım desteği
- Browser history yönetimi
- State korunur

### Temel Kullanım Senaryoları

1. **E-ticaret Sitesi**
   - `/products` - Ürün listesi
   - `/products/123` - Ürün detayı
   - `/cart` - Sepet
   - `/checkout` - Ödeme

2. **Blog Sitesi**
   - `/blog` - Blog listesi
   - `/blog/post-slug` - Blog yazısı
   - `/blog/category/teknoloji` - Kategori sayfası

3. **Admin Paneli**
   - `/dashboard` - Ana sayfa (korumalı)
   - `/dashboard/users` - Kullanıcılar (korumalı)
   - `/login` - Giriş sayfası

### React Router'ın Avantajları

✅ **Performans:** Sayfa yenilenmeden hızlı geçişler  
✅ **UX:** Smooth kullanıcı deneyimi  
✅ **SEO:** Arama motorları için optimize  
✅ **Bookmark:** URL'leri kaydetme ve paylaşma  
✅ **History:** Browser geri/ileri desteği  
✅ **State Management:** Sayfa geçişlerinde state korunur  
✅ **Code Splitting:** Route bazlı kod bölme  

### React Router Versiyonları

- **React Router v6** (Güncel): En yeni versiyon, bu örnekte kullanılıyor
- **React Router v5**: Eski versiyon, hala yaygın kullanılıyor
- **React Router DOM**: Web uygulamaları için
- **React Router Native**: React Native uygulamaları için

---

## 📚 Konu Özeti (Öğretim Sırası)

### Temel Seviye (Ders 1-7)
1. **Temel Routing Kavramları** - BrowserRouter, Routes, Route, Link, NavLink
2. **Dinamik Routes** - useParams, URL parametreleri
3. **Navigation Hook'ları** - useNavigate, programatik yönlendirme
4. **Location ve Search Params** - useLocation, useSearchParams
5. **Nested Routes** - Outlet, parent/child routes
6. **Protected Routes** - Route koruma, Navigate component
7. **404 Sayfası** - Catch-all route

### Orta Seviye (Ders 8-14)
8. **Index Routes** - Varsayılan child route
9. **useOutletContext** - Parent'tan child'a veri geçirme
10. **Relative Links** - ./ ve ../ kullanımı
11. **Navigate Component** - Koşullu redirect
12. **Route State** - navigate() ile state geçirme
13. **Query Parameters ile Filtreleme** - URL'de filtre state'i
14. **Breadcrumb Navigation** - useMatches hook

### İleri Seviye (Ders 15-21)
15. **Error Boundaries** - Route hata yönetimi
16. **Modal Routes** - Overlay route pattern
17. **Route Transitions** - Sayfa geçiş animasyonları
18. **Role-based Routing** - Kullanıcı rolleri ile koruma
19. **Deep Linking** - Bookmark ve paylaşılabilir URL'ler
20. **Route Groups ve Layout Routes** - Ortak layout'lar
21. **Lazy Loading** - Code splitting ve performans

---

## 📁 Sayfa ve Component Eşleştirmesi

### Mevcut Sayfalar ve Kullanıldıkları Dersler:

**Temel Sayfalar:**
- `pages/HomePage.tsx` → Ders 1, Ders 3
- `pages/AboutPage.tsx` → Ders 1, Ders 4
- `pages/ContactPage.tsx` → Ders 1, Ders 4
- `pages/UserDetailPage.tsx` → Ders 2
- `pages/NotFoundPage.tsx` → Ders 7

**Nested Routes:**
- `pages/ProductsPage.tsx` → Ders 5, Ders 8, Ders 9
- `pages/ProductsIndexPage.tsx` → Ders 8
- `pages/ProductDetailPage.tsx` → Ders 5, Ders 9

**Protected Routes:**
- `components/ProtectedRoute.tsx` → Ders 6, Ders 11
- `pages/DashboardPage.tsx` → Ders 6
- `pages/ProfilePage.tsx` → Ders 6
- `pages/SettingsPage.tsx` → Ders 6

**Orta Seviye Örnekler:**
- `pages/RelativeLinksExample.tsx` → Ders 10
- `pages/FormPage.tsx` → Ders 12
- `pages/FormSuccessPage.tsx` → Ders 12
- `pages/FilteredProductsPage.tsx` → Ders 13, Ders 19

**Ana Routing Dosyası:**
- `index.tsx` → Tüm dersler (routing yapısı)

**Oluşturulacak Component'ler:**
- `components/Breadcrumb.tsx` → Ders 14
- `components/RouteErrorBoundary.tsx` → Ders 15
- `components/ModalRoute.tsx` → Ders 16
- `components/RouteTransition.tsx` → Ders 17
- `components/RoleProtectedRoute.tsx` → Ders 18
- `components/PublicLayout.tsx`, `components/AdminLayout.tsx` → Ders 20

---

## 📋 Ders Planı (Önerilen Sıralama)

### Ders 1: Temel Routing Kavramları (30-45 dk)

**Konular:**
- React Router nedir? Neden kullanılır?
- BrowserRouter, Routes, Route yapısı
- Link ve NavLink component'leri
- Basit sayfa geçişleri

**Pratik:**
- `HomePage`, `AboutPage`, `ContactPage` sayfalarını inceleme (`pages/HomePage.tsx`, `pages/AboutPage.tsx`, `pages/ContactPage.tsx`)
- Navbar'daki link'leri test etme (`index.tsx`)
- NavLink'in aktif stil özelliğini gözlemleme

**Öğrenci Etkinliği:**
- Yeni bir "Hizmetler" sayfası ekleme
- Navbar'a link ekleme

---

### Ders 2: Dinamik Routes ve useParams (30-45 dk)

**Konular:**
- URL parametreleri (`:id` gibi)
- `useParams` hook kullanımı
- Dinamik route tanımlama

**Pratik:**
- `UserDetailPage` sayfasını inceleme (`pages/UserDetailPage.tsx`)
- Farklı ID'lerle test etme (`/user/123`, `/user/456`)

**Öğrenci Etkinliği:**
- Blog yazıları için dinamik route oluşturma (`/blog/:slug`)

---

### Ders 3: Navigation Hook'ları (30-45 dk)

**Konular:**
- `useNavigate` hook
- Programatik yönlendirme
- `navigate(-1)` ile geri gitme
- `replace` parametresi

**Pratik:**
- `HomePage`'deki butonları test etme (`pages/HomePage.tsx`)
- Farklı yönlendirme yöntemlerini deneme

**Öğrenci Etkinliği:**
- Form submit sonrası yönlendirme örneği oluşturma

---

### Ders 4: Location ve Search Params (30-45 dk)

**Konular:**
- `useLocation` hook
- Location objesi (pathname, search, hash, state)
- `useSearchParams` hook
- Query string parametreleri (`?name=value`)

**Pratik:**
- `AboutPage`'de location bilgisini inceleme (`pages/AboutPage.tsx`)
- `ContactPage`'de search params ile oynama (`pages/ContactPage.tsx`)
- URL'yi manuel olarak değiştirme (`/contact?name=Emre&email=test@test.com`)

**Öğrenci Etkinliği:**
- Filtreleme için search params kullanma (ürün listesi filtreleme)

---

### Ders 5: Nested Routes (45-60 dk)

**Konular:**
- Nested route kavramı
- `Outlet` component
- Parent ve child route'lar
- Relative path kullanımı

**Pratik:**
- `ProductsPage` ve `ProductDetailPage` yapısını inceleme (`pages/ProductsPage.tsx`, `pages/ProductDetailPage.tsx`)
- Ürün detay sayfasının nasıl render edildiğini anlama
- URL yapısını gözlemleme (`/products` → `/products/1`)

**Öğrenci Etkinliği:**
- Dashboard içinde nested route'lar oluşturma
- Blog kategorileri için nested route yapısı

---

### Ders 6: Protected Routes (45-60 dk)

**Konular:**
- Route koruma mantığı
- Authentication kontrolü
- `Navigate` component
- Conditional rendering

**Pratik:**
- `ProtectedRoute` component'ini inceleme (`components/ProtectedRoute.tsx`)
- `DashboardPage` ve alt sayfalarını test etme (`pages/DashboardPage.tsx`, `pages/ProfilePage.tsx`, `pages/SettingsPage.tsx`)
- Authentication durumunu değiştirip test etme

**Öğrenci Etkinliği:**
- Gerçek bir authentication sistemi entegre etme
- Admin paneli için protected route oluşturma

---

### Ders 7: 404 Sayfası ve Catch-all Route (20-30 dk)

**Konular:**
- Catch-all route (`path="*"`)
- 404 sayfası oluşturma
- Eşleşmeyen route'ları yakalama

**Pratik:**
- `NotFoundPage` sayfasını inceleme (`pages/NotFoundPage.tsx`)
- Olmayan bir URL'e gitme (`/olmayan-sayfa`)

**Öğrenci Etkinliği:**
- Özel 404 sayfası tasarlama

---

### Ders 8: Index Routes (30-45 dk)

**Konular:**
- Index route kavramı
- Varsayılan child route tanımlama
- `index` prop kullanımı
- Nested route'larda default sayfa

**Pratik:**
- Products sayfasında index route ekleme (`pages/ProductsPage.tsx`, `pages/ProductsIndexPage.tsx`)
- `/products` ve `/products/index` ayrımını anlama
- Index route'un ne zaman render edildiğini gözlemleme
- `ProductsIndexPage` sayfasını inceleme (`pages/ProductsIndexPage.tsx`)

**Öğrenci Etkinliği:**
- Blog kategorilerinde index route oluşturma
- Dashboard'ta varsayılan sayfa ekleme

---

### Ders 9: useOutletContext (30-45 dk)

**Konular:**
- `useOutletContext` hook
- Parent route'tan child route'a veri geçirme
- `Outlet` component'e context geçirme
- Nested route'larda veri paylaşımı
- Type-safe context kullanımı

**Pratik:**
- `ProductsPage`'den `ProductDetailPage`'e veri geçirme (`pages/ProductsPage.tsx`, `pages/ProductDetailPage.tsx`)
- Context ile ürün listesini paylaşma
- Child route'larda parent verisine erişim
- Context tipi tanımlama

**Öğrenci Etkinliği:**
- Dashboard'ta kullanıcı bilgilerini nested route'lara geçirme
- Blog kategorilerinde kategori bilgisini paylaşma

---

### Ders 10: Relative Links ve Navigation (30-45 dk)

**Konular:**
- Relative path kavramı
- `./` ve `../` kullanımı
- `to="."` ve `to=".."` ile navigation
- Mevcut route'a göre relative link'ler
- Absolute vs relative path farkı

**Pratik:**
- Nested route'larda relative link kullanımı
- Parent route'a relative navigation
- `RelativeLinksExample` sayfasını inceleme (`pages/RelativeLinksExample.tsx`)
- Farklı relative path örnekleri

**Öğrenci Etkinliği:**
- Ürün detay sayfasında relative link'ler oluşturma
- Breadcrumb navigation'da relative path kullanma

---

### Ders 11: Navigate Component ve Conditional Redirect (30-45 dk)

**Konular:**
- `Navigate` component detaylı kullanımı
- Koşullu yönlendirme
- `replace` prop ile history yönetimi
- Redirect kuralları
- ProtectedRoute'da Navigate kullanımı

**Pratik:**
- ProtectedRoute component'ini detaylı inceleme (`components/ProtectedRoute.tsx`)
- Koşullu redirect örnekleri
- History stack yönetimi
- `replace` vs normal navigation farkı

**Öğrenci Etkinliği:**
- Form validation sonrası redirect
- Kullanıcı durumuna göre yönlendirme

---

### Ders 12: Route State ile Veri Geçirme (45-60 dk)

**Konular:**
- `navigate()` ile state geçirme
- `location.state` kullanımı
- Sayfalar arası veri aktarımı
- Form verilerini state ile taşıma
- Browser refresh durumunda state kaybı

**Pratik:**
- `FormPage` ve `FormSuccessPage` sayfalarını inceleme (`pages/FormPage.tsx`, `pages/FormSuccessPage.tsx`)
- Form submit sonrası state ile yönlendirme
- Başarı sayfasında state'ten veri okuma
- State ile veri geçirme örnekleri

**Öğrenci Etkinliği:**
- Multi-step form'da state ile veri taşıma
- Ürün sepetinden checkout'a state geçirme

---

### Ders 13: Query Parameters ile Filtreleme (45-60 dk)

**Konular:**
- URL'de filtreleme state'i tutma
- `useSearchParams` ile filtre yönetimi
- URL'den state senkronizasyonu
- Filtreleme ve sıralama örneği
- Bookmark ve paylaşılabilir URL'ler

**Pratik:**
- `FilteredProductsPage` sayfasını inceleme (`pages/FilteredProductsPage.tsx`)
- Ürün listesinde kategori, fiyat, sıralama filtreleri
- URL'den filtreleri okuma ve uygulama
- Filtre değişikliklerini URL'e yansıtma

**Öğrenci Etkinliği:**
- Blog yazılarında kategori ve tarih filtreleme
- E-ticaret sitesinde gelişmiş filtreleme

---

### Ders 14: Breadcrumb Navigation (30-45 dk)

**Konular:**
- Breadcrumb navigation kavramı
- `useMatches` hook kullanımı
- Sayfa hiyerarşisi gösterme
- Dinamik breadcrumb oluşturma
- Route handle kullanımı

**Pratik:**
- `Breadcrumb` component'ini inceleme (`components/Breadcrumb.tsx` - oluşturulacak)
- Route hiyerarşisinden breadcrumb çıkarma
- Nested route'larda breadcrumb gösterimi
- Breadcrumb styling ve UX

**Öğrenci Etkinliği:**
- Tüm sayfalarda breadcrumb ekleme
- Özelleştirilmiş breadcrumb tasarımı

---

### Ders 15: Error Boundaries ile Route Hata Yönetimi (30-45 dk)

**Konular:**
- Error Boundary kavramı
- Route bazlı error boundary
- Hata sayfaları oluşturma
- Error handling stratejileri
- Fallback UI oluşturma

**Pratik:**
- `RouteErrorBoundary` component'ini inceleme (`components/RouteErrorBoundary.tsx` - oluşturulacak)
- Route'larda error boundary ekleme
- Hata durumlarını yakalama ve gösterme
- `useRouteError` hook kullanımı

**Öğrenci Etkinliği:**
- Her route için error boundary ekleme
- Özel hata sayfaları tasarlama

---

### Ders 16: Modal Routes (Overlay Routes) (45-60 dk)

**Konular:**
- Modal'ları route olarak yönetme
- URL ile modal açma/kapama
- Overlay route pattern
- Modal state'i URL'de tutma
- Query parameter ile modal kontrolü

**Pratik:**
- `ModalRoute` component'ini inceleme (`components/ModalRoute.tsx` - oluşturulacak)
- Ürün detayını modal olarak gösterme
- URL ile modal kontrolü (`/products/1?modal=true`)
- Modal açıkken URL değişikliği

**Öğrenci Etkinliği:**
- Resim galerisi modal route'u
- Form modal'ı route olarak yönetme

---

### Ders 17: Route Transitions ve Animations (45-60 dk)

**Konular:**
- Sayfa geçiş animasyonları
- CSS transitions ile route animasyonları
- Framer Motion entegrasyonu (opsiyonel)
- Loading states ve transitions
- `AnimatePresence` kullanımı

**Pratik:**
- `RouteTransition` component'ini inceleme (`components/RouteTransition.tsx` - oluşturulacak)
- Sayfa geçişlerinde fade animasyonu
- Slide transition efektleri
- Route değişiminde loading gösterimi

**Öğrenci Etkinliği:**
- Özel transition animasyonları ekleme
- Sayfa geçişlerinde smooth animasyonlar

---

### Ders 18: Role-based Routing (45-60 dk)

**Konular:**
- Kullanıcı rolleri ile route koruma
- Admin/User ayrımı
- Role-based access control
- Çoklu rol yönetimi
- `RoleProtectedRoute` component

**Pratik:**
- `RoleProtectedRoute` component'ini inceleme (`components/RoleProtectedRoute.tsx` - oluşturulacak)
- Admin ve User route'ları oluşturma
- Role kontrolü ile protected route
- Farklı rollere göre navigasyon

**Öğrenci Etkinliği:**
- Admin paneli için role-based routing
- Kullanıcı tipine göre farklı dashboard'lar

---

### Ders 19: Deep Linking ve Bookmark Desteği (20-30 dk)

**Konular:**
- Deep linking kavramı
- Doğrudan URL ile sayfa açma
- Bookmark desteği
- Shareable URL'ler
- State'i URL'de tutma stratejileri

**Pratik:**
- Filtrelenmiş ürün listesini bookmark'lama (`pages/FilteredProductsPage.tsx`)
- URL'i paylaşma ve açma
- Query parameters ile deep linking
- Route state vs URL state

**Öğrenci Etkinliği:**
- Paylaşılabilir filtreli liste URL'leri
- Bookmark ile sayfa durumunu kaydetme

---

### Ders 20: Route Groups ve Layout Routes (45-60 dk)

**Konular:**
- Ortak layout'lar oluşturma
- Route gruplama
- Layout component pattern
- Nested layout'lar
- `LayoutRoute` component

**Pratik:**
- `PublicLayout` ve `AdminLayout` oluşturma (`components/PublicLayout.tsx`, `components/AdminLayout.tsx` - oluşturulacak)
- Admin ve Public layout'ları ayırma
- Ortak header/footer layout'u
- Route gruplarına göre layout seçimi

**Öğrenci Etkinliği:**
- Farklı layout'larla route yapısı oluşturma
- Responsive layout'lar için route gruplama

---

### Ders 21: Lazy Loading ve Code Splitting (45-60 dk)

**Konular:**
- `React.lazy()` kullanımı
- `Suspense` component
- Route-based code splitting
- Performance optimizasyonu
- Loading fallback'leri

**Pratik:**
- Route'ları lazy load etme (`index.tsx` - güncellenecek)
- Code splitting ile bundle boyutunu azaltma
- Loading state yönetimi
- Performance metriklerini ölçme

**Öğrenci Etkinliği:**
- Tüm route'ları lazy load'a çevirme
- Bundle analizi yapma

---

## 🎓 Öğretim İpuçları

### 1. Adım Adım Yaklaşım
- Her kavramı tek tek öğretin
- Bir önceki konuyu tam anlamadan diğerine geçmeyin
- Her konuda pratik yapma fırsatı verin

### 2. Görsel Öğrenme
- Tarayıcıda URL değişikliklerini gösterin
- DevTools'da Network tab'ını açık tutun
- Console'da hook'ların döndürdüğü değerleri gösterin

### 3. Pratik Örnekler
- Her konudan sonra küçük bir ödev verin
- Gerçek hayat senaryoları kullanın
- Öğrencinin kendi projesine uygulamasını sağlayın

### 4. Hata Yönetimi
- Yaygın hataları gösterin (ör: BrowserRouter eksikliği)
- Hata mesajlarını nasıl okuyacaklarını öğretin
- Debug tekniklerini gösterin

---

## 📝 Öğrenci Değerlendirme Soruları

### Temel Seviye (Ders 1-7)
1. React Router nedir ve neden kullanılır?
2. Link ve NavLink arasındaki fark nedir?
3. `useParams` hook'u ne işe yarar?
4. `useNavigate` ile nasıl yönlendirme yapılır?
5. Nested route nedir ve nasıl kullanılır?
6. `Outlet` component'i ne işe yarar?
7. Protected route nasıl oluşturulur?
8. Search params ile nasıl çalışılır?

### Orta Seviye (Ders 8-14)
9. Index route nedir ve ne zaman kullanılır?
10. `useOutletContext` ile nasıl veri geçirilir?
11. Relative link'ler ne zaman kullanılır?
12. `Navigate` component ile koşullu redirect nasıl yapılır?
13. Route state ile veri nasıl geçirilir?
14. Query parameters ile filtreleme nasıl yapılır?
15. Breadcrumb navigation nasıl oluşturulur?

### İleri Seviye (Ders 15-21)
16. Error boundary ile route hataları nasıl yönetilir?
17. Modal'ları route olarak nasıl yönetirsiniz?
18. Route transition animasyonları nasıl eklenir?
19. Role-based routing nasıl implement edilir?
20. Deep linking nedir ve nasıl kullanılır?
21. Route groups ve layout routes nasıl kullanılır?
22. Lazy loading ile route'ları nasıl optimize edersiniz?
23. Route-based code splitting nasıl yapılır?

---

## 🚀 İleri Seviye Konular (Opsiyonel)

Bu temel konuları öğrendikten sonra şunları da öğretebilirsiniz:

1. **Lazy Loading**
   - `React.lazy()` ve `Suspense`
   - Route-based code splitting
   - Performance optimizasyonu

2. **Route State**
   - `navigate()` ile state geçirme
   - `location.state` kullanımı
   - State ile veri aktarımı

3. **Route Transitions**
   - Sayfa geçiş animasyonları
   - Loading states
   - Transition kütüphaneleri

4. **Advanced Patterns**
   - Route guards
   - Role-based routing
   - Multi-step forms ile routing
   - Deep linking

---

## 📚 Ek Kaynaklar

- [React Router Resmi Dokümantasyonu](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [React Router Examples](https://github.com/remix-run/react-router/tree/main/examples)

---

## ✅ Kontrol Listesi

Öğrenciniz şunları yapabiliyor mu?

### Temel Konular (Ders 1-7)
- [ ] Temel route yapısını anlıyor
- [ ] Link ve NavLink kullanabiliyor
- [ ] Dinamik route'lar oluşturabiliyor
- [ ] useParams ile parametre okuyabiliyor
- [ ] useNavigate ile yönlendirme yapabiliyor
- [ ] useLocation ve useSearchParams kullanabiliyor
- [ ] Nested route yapısını anlıyor
- [ ] Protected route oluşturabiliyor
- [ ] 404 sayfası ekleyebiliyor

### Orta Seviye Konular (Ders 8-14)
- [ ] Index route kullanabiliyor
- [ ] useOutletContext ile veri geçirebiliyor
- [ ] Relative link'ler kullanabiliyor
- [ ] Navigate component ile redirect yapabiliyor
- [ ] Route state ile veri geçirebiliyor
- [ ] Query parameters ile filtreleme yapabiliyor
- [ ] Breadcrumb navigation oluşturabiliyor

### İleri Seviye Konular (Ders 15-21)
- [ ] Error boundary ile hata yönetimi yapabiliyor
- [ ] Modal route'ları yönetebiliyor
- [ ] Route transition animasyonları ekleyebiliyor
- [ ] Role-based routing implement edebiliyor
- [ ] Deep linking kullanabiliyor
- [ ] Route groups ve layout routes kullanabiliyor
- [ ] Lazy loading ile code splitting yapabiliyor
- [ ] Kendi projesinde React Router'ı profesyonelce kullanabiliyor

---

**Toplam Ders Süresi: ~15-20 saat**
**İyi dersler! 🎉**

