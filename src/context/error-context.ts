import { createContext } from "react";
import type { AppError, ErrorType } from "@/types/error.types";

/**
 * Error Context Type
 * 
 * Bu context, uygulama genelinde hata yönetimi için kullanılır.
 */
export interface ErrorContextType {
  error: AppError | null;
  hasError: boolean;
  setError: (error: AppError | null) => void;
  clearError: () => void;
  handleError: (error: unknown, type?: ErrorType) => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

