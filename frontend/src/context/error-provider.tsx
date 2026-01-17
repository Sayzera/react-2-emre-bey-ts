import { useCallback, useState, type ReactNode } from "react";
import { ErrorContext, ErrorType, type AppError, type ErrorContextType } from "./error-context";

interface ErrorProviderProps {
  children: ReactNode;
}
export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<AppError | null>(null);

  /**
   * Hatayı temizle
   */

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback(
    (error: unknown, type: ErrorType = ErrorType.UNKNOWN) => {
      let appError: AppError;

      if (error instanceof Error) {
        const errorWithCode = error as Error & {
          code?: string | number;
        };

        appError = {
          type,
          message: errorWithCode.code as string,
          details: {
            stack: error.stack,
            name: error.name,
          },
          timestamp: new Date(),
        };
      } else if (typeof error === "string") {
        appError = {
          type,
          message: error,
          timestamp: new Date(),
        };
      } else if (typeof error === "object") {
        const errorObj = error as Record<string, unknown>;

        appError = {
          type: (errorObj.type as ErrorType | undefined) || type,
          message:
            (typeof errorObj.message === "string"
              ? errorObj.message
              : undefined) || "Bilinmeyen bir hata oluştu",
          code:
            (typeof errorObj.code === "string" ||
            typeof errorObj.code === "number"
              ? errorObj.code
              : undefined) || ErrorType.UNKNOWN,
          details: errorObj.details as Record<string, unknown> | undefined,
          timestamp: new Date(),
        };
      } else {
        appError = {
            type: ErrorType.UNKNOWN,
            message: 'Bilinmeyen bir hata oluştu',
            timestamp: new Date()
        }
      }

      setError(appError)
    },
    []
  );

  const value: ErrorContextType = {
    error,
    hasError: error !==null,
    setError,
    clearError,
    handleError
  }

  return <ErrorContext.Provider value={value}>
    {children}
  </ErrorContext.Provider>
}
