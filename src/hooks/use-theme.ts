import { ThemeContext } from "@/context/theme-context";
import { useContext } from "react";


export function useTheme() {
    const ctx = useContext(ThemeContext)

    console.log(ctx)

    if(!ctx) {
        throw new Error("lütfen ThemeProvider ile bu komponenti sarınız")
    }

    return ctx

}