# Error Handling Örnekleri

Bu klasör, React'ta error handling'in farklı yöntemlerini gösteren kapsamlı bir örnek içerir.

## 📚 İçerik

### 1. Error Boundary
- **Dosya**: `src/components/error-boundary.tsx`
- **Açıklama**: React'in class component ile oluşturulan error boundary yapısı
- **Yakalar**: Render sırasında oluşan hatalar, lifecycle metodlarındaki hatalar
- **Yakalamaz**: Event handler hataları, async kod hataları

### 2. Error Context & Provider
- **Dosyalar**: 
  - `src/context/error-context.ts`
  - `src/context/error-provider.tsx`
- **Açıklama**: Global hata state yönetimi için Context API kullanımı
- **Kullanım**: Async işlemlerde, form validasyonlarında, manuel hata oluşturma

### 3. Custom Hook
- **Dosya**: `src/hooks/use-error.ts`
- **Açıklama**: Error Context'e erişim için custom hook
- **Kullanım**: `const { error, handleError, clearError } = useError();`

### 4. Error Types
- **Dosya**: `src/types/error.types.ts`
- **Açıklama**: Tüm hata türlerinin tanımlandığı dosya
- **Türler**: NETWORK, VALIDATION, AUTHENTICATION, AUTHORIZATION, NOT_FOUND, SERVER, UNKNOWN

### 5. Error Helpers
- **Dosya**: `src/utils/error-helpers.ts`
- **Fonksiyonlar**:
  - `handleApiError()`: API hatalarını AppError formatına dönüştürür
  - `handleValidationError()`: Form validasyon hatalarını işler
  - `getUserFriendlyMessage()`: Kullanıcı dostu hata mesajları döndürür

## 🎯 Kullanım Örnekleri

### API Çağrısında Hata Yakalama

```typescript
import { useError } from "@/hooks/use-error";
import { handleApiError } from "@/utils/error-helpers";

function MyComponent() {
  const { handleError } = useError();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
    } catch (err) {
      const appError = handleApiError(err);
      handleError(appError, appError.type);
    }
  };
}
```

### Form Validasyonu

```typescript
import { useError } from "@/hooks/use-error";
import { handleValidationError, ErrorType } from "@/utils/error-helpers";

function MyForm() {
  const { handleError, clearError } = useError();

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name) errors.name = "İsim zorunlu";
    if (!formData.email) errors.email = "Email zorunlu";
    
    if (Object.keys(errors).length > 0) {
      const validationError = handleValidationError(errors);
      handleError(validationError, ErrorType.VALIDATION);
      return false;
    }
    
    clearError();
    return true;
  };
}
```

### Error Boundary Kullanımı

```typescript
import { ErrorBoundary } from "@/components/error-boundary";

function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
```

## 🔍 Önemli Notlar

1. **Error Boundary** sadece render hatalarını yakalar
2. **Event handler** hataları için try-catch kullanın
3. **Async hatalar** için try-catch + Error Context kombinasyonu idealdir
4. **Kullanıcı dostu** hata mesajları gösterin
5. **Development**'ta detaylı, **production**'da genel mesajlar gösterin

## 📖 Öğrenme Hedefleri

Bu örneklerle öğrenciler şunları öğrenecek:

- ✅ Error Boundary'in ne olduğu ve nasıl kullanıldığı
- ✅ Context API ile global hata yönetimi
- ✅ Try-catch ile async hata yakalama
- ✅ Form validasyon hatalarını yönetme
- ✅ Farklı hata türlerini ayırt etme
- ✅ Kullanıcı dostu hata mesajları oluşturma

