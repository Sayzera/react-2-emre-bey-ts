import { UserContext } from "@/context/user-context"
import { useContext } from "react"


export const useUser = () => {
    const ctx = useContext(UserContext)

    if(!ctx) {
        throw new Error('Lütfen UserProvider ile sarınız')
    }

    return ctx;
}