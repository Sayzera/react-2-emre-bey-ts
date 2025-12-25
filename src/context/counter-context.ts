import { createContext } from "react";

interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
}

export const CounterContext = createContext<CounterContextType | undefined>(
  undefined
);

