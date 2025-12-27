import { ErrorContext } from "@/context/error-context"
import { useContext } from "react"


export const useError = () => {
    const ctx = useContext(ErrorContext)
    if(!ctx) {
        throw new Error("Lütfen ErrorProvider ile sarınız")
    }

    return ctx;
}