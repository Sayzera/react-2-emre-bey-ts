import { createContext } from "react";

export const ThemeContext = createContext<
  | {
      theme?: 'dark' | 'light';
      toggleTheme?: () => void;
    }
  | undefined
>(undefined);
