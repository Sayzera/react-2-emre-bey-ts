/**
 * Error Handling Types
 * 
 * Bu dosya uygulamadaki tüm hata türlerini tanımlar.
 */

export const ErrorType = {
  NETWORK: "NETWORK",
  VALIDATION: "VALIDATION",
  AUTHENTICATION: "AUTHENTICATION",
  AUTHORIZATION: "AUTHORIZATION",
  NOT_FOUND: "NOT_FOUND",
  SERVER: "SERVER",
  UNKNOWN: "UNKNOWN",
} as const;

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
  timestamp: Date;
}

export interface ErrorState {
  error: AppError | null;
  hasError: boolean;
}

