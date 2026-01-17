import { createContext } from "react";

export const ErrorType = {
  NETWORK: "NETWORK",
  VALIDATION: "VALIDATION",
  AUTHENTICATION: "AUTHENTICATION",
  UNKNOWN :"UNKNOWN"
} as const;
export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
  timestamp: Date;
}

export interface ErrorContextType {
  error: AppError | null;
  hasError: boolean;
  setError: (error: AppError | null) => void;
  clearError: () => void;
  handleError: (error: unknown, type?: ErrorType) => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined
);
