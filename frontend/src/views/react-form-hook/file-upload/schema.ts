import { z } from "zod";


/**
 * TODO: File dersinde yaptığımız ders ile bugunkü dersimiz birleştirilecektir
 * 
 * kullanıcının profil resmi altta profil resmi kartında önizlenecek ve isterse kaldırabilecektir
 * 
 * aynı şekilde öz geçmiş ve dökümanlar içinde olacak dökümanlarda kaç adet seçiliyse okadar gösterilecek eğer pdf veya docx gibi belgeler varsa bunlar göserilemediği için iconlaştırılacak ama png ve image formantında belgeler varsa bunlar uida gösterilecektir.
 * 
 * ve inputlara value bağlananama konusu araştırılaak ve çözümü için denemeler yapılacaktır.
 * 
 * 
 * TODO: i18n, dark light mode ve exchange mode, 
 */

export const fileUploadSchema = z.object({
  // Profil resmi - tek dosya

  profileImage: z
    .instanceof(FileList)
    .nullable()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024,
      "Dosya boyutu maksimum 5MB olabilir"
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files[0].type
        ),
      "Sadece JPG, PNG, veya WEBP formatında resim yükleyebilirsiniz"
    ),
  resume: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Cv yüklemek zorunludur")
    .refine(
      (files) => files[0].size <= 10 * 1024 * 1024,
      "Dosya boyutu maksimum 10 MB olabilir"
    )
    .refine(
      (files) => files[0].type === "application/pdf",
      "Sadece PDF formatında olmalıdır"
    ),

  documents: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length <= 5,
      "Maksimum 5 dosya yükleyebilirsiniz"
    )
    .refine((files) => {
      if (!files) return true;

      return Array.from(files).every((file) => file.size <= 10 * 1024 * 1024);
    }, "Her dosya maksimum 10MB olabilir")
    .refine((files) => {
      if (!files) return true;

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];

      return Array.from(files).every((file) =>
        allowedTypes.includes(file.type)
      );
    }, "Sadece PDF, DOC, JPG, PNG formatlarıyla dosya yükleyebilirsiniz"),

  // Ek bilgiler
  // name: z.string().min(1, "İsim alanı zorunludur")
  name: z.string().min(2, "İsim alanı en az 2 karekter olmak zorundadır"),
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Lütfen geçerli bir e-posta giriniz" })),
  description: z.string().optional(),
});

// type interface
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;
