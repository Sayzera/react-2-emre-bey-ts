import type { PersonalInfo } from "./types";

const validatePersonalInfo = (data: PersonalInfo): Partial<PersonalInfo> => {
  const erros: Partial<PersonalInfo> = {};

  if (!data.firstName.trim()) erros.firstName = "Ad alanı gereklidir";
  if (!data.lastName.trim()) erros.lastName = "Soyad alanı gereklidir";
    //   if (!data.email.trim()) erros.email = "E-Posta alanı gereklidir";
    //   if (!data.phone.trim()) erros.phone = "Telefon alanı gereklidir";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  const phonePattern = /^[0-9]{10,11}$/.test(data.phone.replace(/\s/g, ""));


  if(!emailPattern) erros.email = "Lütfen geçerli bir E-Posta giriniz";
  if(!phonePattern) erros.phone = "Lütfen geçerli bir telefon numarası giriniz";

  return erros;


};

export {
    validatePersonalInfo
}