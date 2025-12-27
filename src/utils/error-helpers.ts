import type { AppError } from "@/types/error.types";
import { ErrorType } from "@/types/error.types";

/**
 * Error Helper Functions
 * 
 * Hata yönetimi için yardımcı fonksiyonlar.
 */

/**
 * API hatalarını AppError formatına dönüştür
 */
export function handleApiError(error: unknown): AppError {
  if (error instanceof Error) {
    // Network hatası kontrolü
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return {
        type: ErrorType.NETWORK,
        message: "Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.",
        timestamp: new Date(),
      };
    }

    return {
      type: ErrorType.NETWORK,
      message: error.message,
      timestamp: new Date(),
    };
  }

  if (typeof error === "object" && error !== null) {
    const apiError = error as Record<string, unknown>;
    
    // HTTP status koduna göre hata tipi belirle
    const status = apiError.status || apiError.statusCode || apiError.code;
    
    if (status === 401) {
      return {
        type: ErrorType.AUTHENTICATION,
        message: (typeof apiError.message === "string" ? apiError.message : undefined) || "Kimlik doğrulama hatası",
        code: typeof status === "number" ? status : undefined,
        timestamp: new Date(),
      };
    }
    
    if (status === 403) {
      return {
        type: ErrorType.AUTHORIZATION,
        message: (typeof apiError.message === "string" ? apiError.message : undefined) || "Bu işlem için yetkiniz yok",
        code: typeof status === "number" ? status : undefined,
        timestamp: new Date(),
      };
    }
    
    if (status === 404) {
      return {
        type: ErrorType.NOT_FOUND,
        message: (typeof apiError.message === "string" ? apiError.message : undefined) || "İstenen kaynak bulunamadı",
        code: typeof status === "number" ? status : undefined,
        timestamp: new Date(),
      };
    }
    
    if (typeof status === "number" && status >= 500) {
      return {
        type: ErrorType.SERVER,
        message: (typeof apiError.message === "string" ? apiError.message : undefined) || "Sunucu hatası oluştu",
        code: status,
        timestamp: new Date(),
      };
    }
  }

  return {
    type: ErrorType.UNKNOWN,
    message: "Bilinmeyen bir hata oluştu",
    timestamp: new Date(),
  };
}

/**
 * Form validasyon hatalarını AppError formatına dönüştür
 */
export function handleValidationError(errors: Record<string, string>): AppError {
  const errorMessages = Object.values(errors).join(", ");
  
  return {
    type: ErrorType.VALIDATION,
    message: `Validasyon hatası: ${errorMessages}`,
    details: errors,
    timestamp: new Date(),
  };
}

/**
 * Hata mesajını kullanıcı dostu hale getir
 */
export function getUserFriendlyMessage(error: AppError): string {
  switch (error.type) {
    case ErrorType.NETWORK:
      return "Bağlantı hatası oluştu. Lütfen tekrar deneyin.";
    case ErrorType.AUTHENTICATION:
      return "Giriş yapmanız gerekiyor.";
    case ErrorType.AUTHORIZATION:
      return "Bu işlem için yetkiniz yok.";
    case ErrorType.NOT_FOUND:
      return "Aradığınız içerik bulunamadı.";
    case ErrorType.VALIDATION:
      return error.message;
    case ErrorType.SERVER:
      return "Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.";
    default:
      return error.message || "Bir hata oluştu.";
  }
}

