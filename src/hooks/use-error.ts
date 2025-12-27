import { useContext } from "react";
import { ErrorContext } from "@/context/error-context";

/**
 * useError Hook
 * 
 * Error Context'e erişmek için kullanılan custom hook.
 * Bu hook ile herhangi bir bileşenden hata yönetimi yapılabilir.
 * 
 * @example
 * const { error, handleError, clearError } = useError();
 * 
 * try {
 *   await someAsyncOperation();
 * } catch (err) {
 *   handleError(err, ErrorType.NETWORK);
 * }
 */
export function useError() {
  const context = useContext(ErrorContext);

  if (context === undefined) {
    throw new Error("useError hook'u ErrorProvider içinde kullanılmalıdır!");
  }

  return context;
}

