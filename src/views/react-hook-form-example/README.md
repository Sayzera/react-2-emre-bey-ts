# React Hook Form Kapsamlı Örnek

Bu klasör, React Hook Form'un tüm özelliklerini gösteren kapsamlı bir örnek içerir.

## 📚 İçerik

### 1. Zod Schema Tanımları (`schemas.ts`)
- Form validasyonu için Zod schema'ları
- Type inference ile TypeScript tip güvenliği
- Farklı validasyon kuralları örnekleri

### 2. Ana Form Örneği (`index.tsx`)
- Kapsamlı form örneği
- Farklı input türleri (text, email, number, select, checkbox, radio, textarea)
- Form state yönetimi
- Hata mesajları gösterimi

## 🎯 Öğrenilenler

### Temel Kullanım

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema tanımla
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Form oluştur
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    email: "",
    password: "",
  },
});

// Submit işlemi
const onSubmit = (data) => {
  console.log(data);
};
```

### FormField Kullanımı

```typescript
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Watch ile Form Değerlerini İzleme

```typescript
// Tüm formu izle
const watchedValues = form.watch();

// Tek bir alanı izle
const email = form.watch("email");

// Birden fazla alanı izle
const [firstName, email] = form.watch(["firstName", "email"]);
```

### Form Metodları

#### setValue - Programatik Değer Atama
```typescript
form.setValue("firstName", "Ahmet");
form.setValue("email", "ahmet@example.com");
```

#### reset - Formu Sıfırlama
```typescript
// Tüm formu sıfırla
form.reset();

// Belirli değerlerle sıfırla
form.reset({
  firstName: "Yeni İsim",
  email: "yeni@email.com"
});
```

#### getValues - Değerleri Okuma
```typescript
// Tüm değerleri al
const allValues = form.getValues();

// Tek bir değer al
const firstName = form.getValues("firstName");

// Birden fazla değer al
const { firstName, email } = form.getValues(["firstName", "email"]);
```

#### trigger - Validasyonu Tetikleme
```typescript
// Tek bir alanı validate et
await form.trigger("email");

// Birden fazla alanı validate et
await form.trigger(["email", "firstName"]);

// Tüm formu validate et
await form.trigger();
```

## 🔑 Form State Özellikleri

- **isValid**: Form geçerli mi?
- **isDirty**: Form değiştirildi mi?
- **isSubmitting**: Form gönderiliyor mu?
- **errors**: Form hataları
- **touchedFields**: Dokunulan alanlar

## 📖 Input Türleri

### Text Input
```typescript
<FormField
  control={form.control}
  name="firstName"
  render={({ field }) => (
    <Input {...field} placeholder="Adınız" />
  )}
/>
```

### Email Input
```typescript
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <Input type="email" {...field} />
  )}
/>
```

### Number Input
```typescript
<FormField
  control={form.control}
  name="age"
  render={({ field }) => (
    <Input
      type="number"
      {...field}
      onChange={(e) => field.onChange(parseInt(e.target.value))}
    />
  )}
/>
```

### Select Dropdown
```typescript
<FormField
  control={form.control}
  name="country"
  render={({ field }) => (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Ülke seçiniz" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="turkey">Türkiye</SelectItem>
        <SelectItem value="usa">ABD</SelectItem>
      </SelectContent>
    </Select>
  )}
/>
```

### Checkbox
```typescript
<FormField
  control={form.control}
  name="newsletter"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormLabel>Bülten aboneliği</FormLabel>
    </FormItem>
  )}
/>
```

### Radio Group
```typescript
<FormField
  control={form.control}
  name="theme"
  render={({ field }) => (
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="light" id="light" />
        <label htmlFor="light">Açık</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="dark" id="dark" />
        <label htmlFor="dark">Koyu</label>
      </div>
    </RadioGroup>
  )}
/>
```

### Textarea
```typescript
<FormField
  control={form.control}
  name="message"
  render={({ field }) => (
    <Textarea {...field} placeholder="Mesajınız" />
  )}
/>
```

### Checkbox Array (Multiple Selection)
```typescript
<FormField
  control={form.control}
  name="interests"
  render={() => (
    <FormItem>
      {["teknoloji", "spor", "müzik"].map((item) => (
        <FormField
          key={item}
          control={form.control}
          name="interests"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item])
                        : field.onChange(
                            field.value?.filter((value) => value !== item)
                          );
                    }}
                  />
                </FormControl>
                <FormLabel>{item}</FormLabel>
              </FormItem>
            );
          }}
        />
      ))}
    </FormItem>
  )}
/>
```

## 🎨 Form Validation Modes

React Hook Form'un farklı validation modları:

- **onChange**: Her değişiklikte validate et
- **onBlur**: Input'tan çıkıldığında validate et
- **onSubmit**: Form gönderildiğinde validate et (varsayılan)
- **onTouched**: İlk dokunulduğunda validate et, sonra onChange
- **all**: onChange ve onBlur'da validate et

```typescript
const form = useForm({
  mode: "onChange", // veya "onBlur", "onSubmit", "onTouched", "all"
});
```

## 💡 İpuçları

1. **Performance**: React Hook Form minimum re-render ile çalışır
2. **TypeScript**: Zod schema ile tam tip güvenliği sağlanır
3. **Validasyon**: Zod ile güçlü validasyon kuralları tanımlanabilir
4. **Hata Mesajları**: FormMessage component'i otomatik hata mesajlarını gösterir
5. **Form State**: formState ile form durumunu kontrol edebilirsiniz

## 📚 Kaynaklar

- [React Hook Form Dokümantasyonu](https://react-hook-form.com/)
- [Zod Dokümantasyonu](https://zod.dev/)
- [Shadcn UI Form Components](https://ui.shadcn.com/docs/components/form)

