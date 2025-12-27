import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { ErrorContext } from "./error-context";
import type { ErrorContextType } from "./error-context";
import type { AppError } from "@/types/error.types";
import { ErrorType } from "@/types/error.types";

interface ErrorProviderProps {
  children: ReactNode;
}

/**
 * Error Provider Component
 * 
 * Bu component, uygulama genelinde hata yönetimini sağlar.
 * Herhangi bir bileşenden hata oluştuğunda bu context'e kaydedilir.
 */
export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<AppError | null>(null);

  /**
   * Hatayı temizle
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Bilinmeyen bir hatayı AppError formatına dönüştür
   */
  const handleError = useCallback((error: unknown, type: ErrorType = ErrorType.UNKNOWN) => {
    let appError: AppError;

    if (error instanceof Error) {
      // Standart Error objesi
      const errorWithCode = error as Error & { code?: string | number };
      appError = {
        type,
        message: error.message,
        code: errorWithCode.code,
        details: {
          stack: error.stack,
          name: error.name,
        },
        timestamp: new Date(),
      };
    } else if (typeof error === "string") {
      // String hata mesajı
      appError = {
        type,
        message: error,
        timestamp: new Date(),
      };
    } else if (error && typeof error === "object") {
      // Özel hata objesi
      const errorObj = error as Record<string, unknown>;
      appError = {
        type: (errorObj.type as ErrorType | undefined) || type,
        message: (typeof errorObj.message === "string" ? errorObj.message : undefined) || "Bilinmeyen bir hata oluştu",
        code: typeof errorObj.code === "string" || typeof errorObj.code === "number" ? errorObj.code : undefined,
        details: errorObj.details as Record<string, unknown> | undefined,
        timestamp: new Date(),
      };
    } else {
      // Tamamen bilinmeyen hata
      appError = {
        type: ErrorType.UNKNOWN,
        message: "Bilinmeyen bir hata oluştu",
        timestamp: new Date(),
      };
    }

    setError(appError);
  }, []);

  const value: ErrorContextType = {
    error,
    hasError: error !== null,
    setError,
    clearError,
    handleError,
  };

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
}

