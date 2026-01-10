# 📁 React Hook Form - Dosya İşlemleri Örneği

Bu örnek, React Hook Form kullanarak dosya yükleme, validasyon ve önizleme işlemlerini kapsamlı bir şekilde gösterir.

## 🎯 Özellikler

### 1. Tek Dosya Yükleme
- **Profil Resmi**: JPG, PNG, WebP formatlarında resim yükleme
- **CV/Özgeçmiş**: PDF formatında belge yükleme
- Dosya boyutu kontrolü
- Dosya tipi validasyonu
- Gerçek zamanlı önizleme

### 2. Çoklu Dosya Yükleme
- Aynı anda birden fazla dosya seçme (maksimum 5)
- Farklı dosya formatlarını destekleme (PDF, DOC, DOCX, JPG, PNG)
- Her dosya için ayrı boyut kontrolü
- Seçilen dosyaların listesini gösterme

### 3. Dosya Önizleme
- Resim dosyaları için görsel önizleme
- FileReader API kullanımı
- Base64 formatına dönüştürme
- Önizlemeyi kaldırma özelliği

### 4. Validasyon (Zod ile)
- Dosya boyutu kontrolü
- Dosya tipi/formatı kontrolü
- Zorunlu ve opsiyonel alan tanımlama
- Özel hata mesajları

## 📝 Kullanım

### Schema Tanımlama

```typescript
import { z } from "zod";

const fileUploadSchema = z.object({
  // Tek dosya - Profil resmi (opsiyonel)
  profileImage: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024,
      "Dosya boyutu maksimum 5MB olabilir"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpeg", "image/jpg", "image/png"].includes(files[0].type),
      "Sadece JPG veya PNG formatında resim yükleyebilirsiniz"
    ),

  // Tek dosya - CV (zorunlu)
  resume: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "CV yüklemek zorunludur")
    .refine(
      (files) => files[0].size <= 10 * 1024 * 1024,
      "Maksimum 10MB"
    )
    .refine(
      (files) => files[0].type === "application/pdf",
      "Sadece PDF formatı"
    ),

  // Çoklu dosya (opsiyonel)
  documents: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length <= 5,
      "Maksimum 5 dosya"
    ),
});
```

### Form Field Kullanımı

```typescript
<FormField
  control={form.control}
  name="profileImage"
  render={({ field: { onChange, value, ...field } }) => (
    <FormItem>
      <FormLabel>Profil Resmi</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={(e) => {
            onChange(e.target.files);
            handlePreview(e.target.files); // Önizleme için
          }}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Dosya Önizleme

```typescript
const [preview, setPreview] = useState<string | null>(null);

const handlePreview = (files: FileList | null) => {
  if (files && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    
    reader.readAsDataURL(file);
  } else {
    setPreview(null);
  }
};

// Önizleme gösterimi
{preview && (
  <img 
    src={preview} 
    alt="Önizleme" 
    className="w-32 h-32 object-cover rounded" 
  />
)}
```

### Dosya Boyutu Formatlama

```typescript
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

// Kullanım
const file = files[0];
console.log(formatFileSize(file.size)); // Örnek: "2.5 MB"
```

### Form Submit

```typescript
const onSubmit = (data: FileUploadFormData) => {
  // Dosyalara erişim
  const profileImage = data.profileImage?.[0];
  const resume = data.resume?.[0];
  const documents = data.documents ? Array.from(data.documents) : [];

  console.log({
    name: data.name,
    profileImage: {
      name: profileImage?.name,
      size: profileImage?.size,
      type: profileImage?.type,
    },
    resume: {
      name: resume?.name,
      size: resume?.size,
    },
    documents: documents.map(doc => ({
      name: doc.name,
      size: doc.size,
    })),
  });

  // FormData ile sunucuya gönderme
  const formData = new FormData();
  if (profileImage) formData.append("profileImage", profileImage);
  if (resume) formData.append("resume", resume);
  documents.forEach((doc, index) => {
    formData.append(`document${index}`, doc);
  });

  // API çağrısı
  fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
};
```

## 🔍 Önemli Noktalar

### 1. FileList Kullanımı
- HTML `<input type="file">` elementi `FileList` döndürür
- Tek dosya için: `files[0]`
- Çoklu dosya için: `Array.from(files)`

### 2. Field Destructuring
```typescript
render={({ field: { onChange, value, ...field } }) => (
  // onChange ve value'yu ayrı kullanmak için destructure ediyoruz
)}
```

### 3. Accept Attribute
```typescript
// Sadece resim dosyaları
accept="image/*"

// Belirli resim formatları
accept="image/jpeg,image/jpg,image/png"

// PDF dosyaları
accept="application/pdf"

// Word belgeleri
accept=".doc,.docx"
```

### 4. Multiple Attribute
```typescript
// Çoklu dosya seçimi için
<input type="file" multiple />
```

### 5. FileReader API
- `readAsDataURL()`: Base64 string olarak okur (önizleme için)
- `readAsText()`: Text olarak okur
- `readAsArrayBuffer()`: Binary data olarak okur

## 🎨 UI/UX İyileştirmeleri

### 1. Dosya Önizleme
- Resim dosyaları için görsel önizleme
- Diğer dosyalar için bilgi kartları (isim, boyut, tip)

### 2. Dosya Listesi
- Seçilen dosyaların listesi
- Her dosya için ayrı kart
- Dosya bilgileri (isim, boyut, tip)

### 3. Hata Mesajları
- Anlaşılır validasyon hataları
- Türkçe hata mesajları
- Inline hata gösterimi

### 4. Yükleme Durumu
- Form durumu göstergesi (isValid, isDirty)
- Submit butonunu devre dışı bırakma
- Loading states (opsiyonel)

## 🚀 Gelişmiş Özellikler

### 1. Sürükle-Bırak (Drag & Drop)
```typescript
const [isDragging, setIsDragging] = useState(false);

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(true);
};

const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(false);
  
  const files = e.dataTransfer.files;
  // Dosyaları işle
};

<div
  onDragOver={handleDragOver}
  onDragLeave={() => setIsDragging(false)}
  onDrop={handleDrop}
  className={isDragging ? "border-primary" : ""}
>
  Dosyaları buraya sürükleyin
</div>
```

### 2. İlerleme Çubuğu (Upload Progress)
```typescript
const [uploadProgress, setUploadProgress] = useState(0);

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();
  
  xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
      const progress = (e.loaded / e.total) * 100;
      setUploadProgress(progress);
    }
  });

  xhr.open("POST", "/api/upload");
  xhr.send(formData);
};
```

### 3. Resim Kırpma (Image Cropping)
```typescript
// react-image-crop gibi bir kütüphane kullanılabilir
import ReactCrop from "react-image-crop";

const [crop, setCrop] = useState({
  unit: "%",
  width: 50,
  aspect: 1 / 1,
});
```

### 4. Resim Sıkıştırma (Compression)
```typescript
// browser-image-compression kullanılabilir
import imageCompression from "browser-image-compression";

const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
  };
  
  const compressed = await imageCompression(file, options);
  return compressed;
};
```

## 📚 Kaynaklar

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [FileReader API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [File API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/File)
- [FormData - MDN](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

## 💡 İpuçları

1. **Güvenlik**: Sunucu tarafında da validasyon yapın
2. **Boyut Sınırı**: Büyük dosyalar için chunk upload kullanın
3. **Hata Yönetimi**: Network hatalarını handle edin
4. **Kullanıcı Deneyimi**: Yükleme sırasında feedback verin
5. **Performans**: Büyük dosyalar için lazy loading kullanın

## 🎯 Örnek Kullanım Senaryoları

1. **Profil Resmi Yükleme**: Kullanıcı profil resmini güncelleme
2. **CV Yükleme**: İş başvurusu için CV yükleme
3. **Belge Yükleme**: Kimlik belgesi, diploma vb. yükleme
4. **Galeri Oluşturma**: Birden fazla resim yükleme
5. **Dosya Paylaşımı**: Kullanıcılar arası dosya paylaşımı

---

**Not**: Bu örnek, React Hook Form ile dosya işlemlerinin en iyi pratiklerini göstermektedir. Gerçek projelerinizde güvenlik ve performans optimizasyonlarını unutmayın! 🚀
