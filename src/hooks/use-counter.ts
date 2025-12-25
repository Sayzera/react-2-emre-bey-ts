import { useContext } from "react";
import { CounterContext } from "@/context/counter-context";

export function useCounter() {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("useCounter hook'u CounterProvider içinde kullanılmalıdır!");
  }

  return context;
}

