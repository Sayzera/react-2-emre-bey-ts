import { useState } from "react";
import type { ReactNode } from "react";
import { CounterContext } from "./counter-context";

export function CounterProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);
  const setCountValue = (value: number) => setCount(value);

  return (
    <CounterContext.Provider
      value={{ count, increment, decrement, reset, setCount: setCountValue }}
    >
      {children}
    </CounterContext.Provider>
  );
}

