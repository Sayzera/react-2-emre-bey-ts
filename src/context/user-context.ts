import { createContext } from "react"

export interface User {
    id: string
    name: string
    email: string
    avatar?:string
}

interface UserContextType {
    user: User | null
    login: (name: string, email:string) => void
    logout: () => void
    updateUser: (user: Partial<User>) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)