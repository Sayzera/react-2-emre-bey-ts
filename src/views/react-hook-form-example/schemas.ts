import { z } from "zod";

/**
 * React Hook Form - Zod Schema Örnekleri
 * 
 * Bu dosya, form validasyonu için Zod schema'larını içerir.
 */

/**
 * Temel Kullanıcı Bilgileri Schema
 */
export const userInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(50, "İsim en fazla 50 karakter olabilir"),
  lastName: z
    .string()
    .min(2, "Soyisim en az 2 karakter olmalıdır")
    .max(50, "Soyisim en fazla 50 karakter olabilir"),
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(1, "Email zorunludur"),
  age: z
    .number()
    .min(18, "Yaş en az 18 olmalıdır")
    .max(100, "Yaş en fazla 100 olabilir")
    .optional(),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Telefon numarası 10-11 haneli olmalıdır")
    .optional(),
});

/**
 * Adres Bilgileri Schema
 */
export const addressSchema = z.object({
  country: z.string().min(1, "Ülke seçimi zorunludur"),
  city: z.string().min(1, "Şehir zorunludur"),
  address: z.string().min(10, "Adres en az 10 karakter olmalıdır"),
  zipCode: z.string().regex(/^[0-9]{5}$/, "Posta kodu 5 haneli olmalıdır"),
});

/**
 * Tercih ve Ayarlar Schema
 */
export const preferencesSchema = z.object({
  newsletter: z.boolean().default(false),
  notifications: z.boolean().default(false),
  theme: z.enum(["light", "dark", "auto"]),
  language: z.string().min(1, "Dil seçimi zorunludur"),
  interests: z.array(z.string()).min(1, "En az bir ilgi alanı seçmelisiniz"),
});

/**
 * Kapsamlı Form Schema (Tüm alanları birleştiren)
 */
export const comprehensiveFormSchema = z.object({
  // Kullanıcı Bilgileri
  firstName: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(50, "İsim en fazla 50 karakter olabilir"),
  lastName: z
    .string()
    .min(2, "Soyisim en az 2 karakter olmalıdır")
    .max(50, "Soyisim en fazla 50 karakter olabilir"),
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(1, "Email zorunludur"),
  age: z
    .number()
    .min(18, "Yaş en az 18 olmalıdır")
    .max(100, "Yaş en fazla 100 olabilir")
    .optional(),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Telefon numarası 10-11 haneli olmalıdır")
    .optional(),
  
  // Adres Bilgileri
  country: z.string().min(1, "Ülke seçimi zorunludur"),
  city: z.string().min(1, "Şehir zorunludur"),
  address: z.string().min(10, "Adres en az 10 karakter olmalıdır"),
  zipCode: z.string().regex(/^[0-9]{5}$/, "Posta kodu 5 haneli olmalıdır"),
  
  // Tercihler
  newsletter: z.boolean(),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "auto"]),
  language: z.string().min(1, "Dil seçimi zorunludur"),
  interests: z.array(z.string()).min(1, "En az bir ilgi alanı seçmelisiniz"),
  
  // Mesaj
  message: z
    .string()
    .min(10, "Mesaj en az 10 karakter olmalıdır")
    .max(500, "Mesaj en fazla 500 karakter olabilir")
    .optional(),
});

/**
 * Dosya Yükleme Schema
 */
export const fileUploadSchema = z.object({
  // Profil resmi - tek dosya
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
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(files[0].type),
      "Sadece JPG, PNG veya WebP formatında resim yükleyebilirsiniz"
    ),

  // CV/Özgeçmiş - tek dosya (PDF)
  resume: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "CV yüklemek zorunludur")
    .refine(
      (files) => files[0].size <= 10 * 1024 * 1024,
      "Dosya boyutu maksimum 10MB olabilir"
    )
    .refine(
      (files) => files[0].type === "application/pdf",
      "Sadece PDF formatında dosya yükleyebilirsiniz"
    ),

  // Çoklu dosya yükleme - belgeler
  documents: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length <= 5,
      "Maksimum 5 dosya yükleyebilirsiniz"
    )
    .refine(
      (files) => {
        if (!files) return true;
        return Array.from(files).every((file) => file.size <= 10 * 1024 * 1024);
      },
      "Her dosya maksimum 10MB olabilir"
    )
    .refine(
      (files) => {
        if (!files) return true;
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/jpg",
          "image/png",
        ];
        return Array.from(files).every((file) => allowedTypes.includes(file.type));
      },
      "Sadece PDF, DOC, DOCX, JPG, PNG formatlarında dosya yükleyebilirsiniz"
    ),

  // Ek bilgiler
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  description: z.string().optional(),
});

// Type inference için
export type UserInfoFormData = z.infer<typeof userInfoSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;
export type ComprehensiveFormData = z.infer<typeof comprehensiveFormSchema>;
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;

