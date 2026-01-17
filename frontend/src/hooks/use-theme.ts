import { ThemeContext } from "@/context/theme-context";
import { useContext } from "react";

export function useTheme() {
    const ctx = useContext(ThemeContext)

    if(!ctx) {
        throw new Error('Lütfen ThemeProvider ile komponenti sarınız')
    }

    return ctx;
}