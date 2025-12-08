# SOLID Prensipleri ile React Geliştirme Rehberi

Her kod yazarken aşağıdaki SOLID prensiplerine uygun olarak geliştirme yap:

## 🎯 SOLID Prensipleri

### 1. **Single Responsibility Principle (SRP) - Tek Sorumluluk Prensibi**
- Her component, hook veya utility fonksiyonu **sadece bir işi** yapmalı
- Component'ler sadece UI render etmeli, business logic'i custom hook'lara taşı
- Her dosya tek bir sorumluluğa sahip olmalı
- Örnek: `useFilterProducts` hook'u sadece filtreleme mantığını içermeli, UI render etmemeli

### 2. **Open/Closed Principle (OCP) - Açık/Kapalı Prensip**
- Component'ler **genişletmeye açık**, **değişikliğe kapalı** olmalı
- Props interface'lerini genişletilebilir şekilde tasarla
- Composition pattern kullan (children, render props)
- Variant'lar için `cva` (class-variance-authority) kullan
- Örnek: `Button` component'i farklı variant'ları desteklemeli ama iç mantığı değiştirilmemeli

### 3. **Liskov Substitution Principle (LSP) - Liskov Yerine Geçme Prensibi**
- Interface'ler ve type'lar tutarlı olmalı
- Aynı interface'i implement eden component'ler birbirinin yerine kullanılabilmeli
- Props interface'leri beklenen davranışı garanti etmeli
- Örnek: `BaseInput` ve `TextInput` aynı props interface'ini kullanmalı

### 4. **Interface Segregation Principle (ISP) - Arayüz Ayrımı Prensibi**
- Küçük, odaklanmış interface'ler oluştur
- Component'lere gereksiz props geçirme
- Optional props kullan, zorunlu olmayanları optional yap
- Örnek: `Card` component'i için `CardHeader`, `CardBody`, `CardFooter` ayrı component'ler olmalı

### 5. **Dependency Inversion Principle (DIP) - Bağımlılık Tersine Çevirme Prensibi**
- Üst seviye modüller alt seviye modüllere bağımlı olmamalı
- Dependency injection kullan (props, context, custom hooks)
- Service layer'ları component'lerden ayır
- Örnek: API çağrıları service dosyalarında olmalı, component'ler sadece hook'ları kullanmalı

## 📋 React Best Practices

### Component Yapısı
// ✅ İYİ: Tek sorumluluk, küçük component
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({ variant = 'primary', onClick, children }: ButtonProps) {
  // Sadece UI render
}

// ❌ KÖTÜ: Çok fazla sorumluluk
function ProductPage() {
  // API çağrısı, state yönetimi, filtreleme, render - HEPSİ BİR ARADA
}### Custom Hooks Kullanımı
// ✅ İYİ: Business logic hook'ta
function useProductFilters() {
  // Filtreleme mantığı burada
}

function ProductList() {
  const { filteredProducts } = useProductFilters();
  // Sadece render
}

// ❌ KÖTÜ: Logic component içinde
function ProductList() {
  // Tüm filtreleme mantığı burada
}### Service Layer
// ✅ İYİ: API çağrıları service'te
// services/productService.ts
export const productService = {
  getProducts: () => fetch('/api/products'),
};

// ❌ KÖTÜ: API çağrısı component'te
function ProductList() {
  useEffect(() => {
    fetch('/api/products'); // Component içinde
  }, []);
}### Type Safetyt
// ✅ İYİ: Açık interface tanımları
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ KÖTÜ: any kullanımı
function UserCard(user: any) {}## ✅ Kontrol Listesi

Her kod yazarken şunları kontrol et:

- [ ] Component tek bir sorumluluğa mı sahip?
- [ ] Business logic custom hook'a taşındı mı?
- [ ] Props interface'i genişletilebilir mi?
- [ ] Gereksiz props var mı? (ISP)
- [ ] API çağrıları service layer'da mı?
- [ ] Type safety sağlandı mı? (any kullanılmadı mı?)
- [ ] Component composition kullanıldı mı?
- [ ] Utility fonksiyonlar ayrı dosyalarda mı?
- [ ] Dependency injection kullanıldı mı?

## 🚀 Örnek Uygulama
pescript
// ✅ SOLID'e uygun örnek yapı

// 1. Types (ISP - küçük interface)
interface Product {
  id: string;
  name: string;
  price: number;
}

interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

// 2. Service (DIP - dependency injection)
// services/productService.ts
export const productService = {
  getProducts: async (): Promise<Product[]> => {
    // API çağrısı
  },
};

// 3. Custom Hook (SRP - tek sorumluluk)
// hooks/useProductFilters.ts
export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<FilterOptions>({});
  
  const filteredProducts = useMemo(() => {
    // Filtreleme mantığı
  }, [products, filters]);
  
  return { filteredProducts, filters, setFilters };
}

// 4. Component (SRP - sadece UI)
// components/ProductList.tsx
interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const { filteredProducts } = useProductFilters(products);
  
  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
## 📝 Notlar

- **Küçük component'ler** yaz, büyük component'leri parçala
- **Custom hook'lar** ile logic'i component'lerden ayır
- **Service layer** kullan, API çağrılarını component'lerden uzak tut
- **Type safety** önemli, `any` kullanma
- **Composition over inheritance** - React'te composition kullan
- **Props drilling** varsa Context API kullan