import { z } from "zod";

const errorMessages = {
  string: "Lütfen geçerli bir değer giriniz",
};

export const comprehensiveFormSchema = z.object({
  firstName: z
    .string({ error: errorMessages.string })
    .min(2, "İsim en az 2 karekter olmalıdır")
    .max(50, "İsim maksimum 50 karekter olmalıdır"),
  lastName: z
    .string({ error: errorMessages.string })
    .min(2, "Soyad en az 2 karekter olmalıdır")
    .max(50, "Soyad maksimum 50 karekter olmalıdır"),
  email: z
    .string({ error: errorMessages.string })
    .trim()
    .pipe(z.email({ error: "Lütfen geçerli bir e-posta giriniz" })),
  age: z
    .number()
    .min(18, "Yaş en 18 olmalıdır")
    .max(100, "Yaş en fazla 100 olmalıdır")
    .optional(),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Telefon numarası 10-11 haneli olmalıdır")
    .optional(),

  // Adres Bilgileri
  /**
   * TODO: Shadcn selectbox veya comboboxlara bakmanız gerekiyor
   */
  country: z
    .string({ error: errorMessages.string })
    .min(1, "Ülke seçimi zorunludur"),
  city: z
    .string({ error: errorMessages.string })
    .min(1, "Şehir seçimi zorunludur"),
  adres: z
    .string({ error: errorMessages.string })
    .min(10, "Adres en az 10 karekter olmalıdır"),
  zipCode: z.string().regex(/^[0-9]{5}$/, "Posta kodu 5 haneli olmaldır"),
});


export type ComprehensiveFormData = z.infer<typeof comprehensiveFormSchema>;
