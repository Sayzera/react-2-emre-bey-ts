import { useState, type ReactNode } from "react";
import { UserContext, type User } from "./user-context";

interface UserProviderProps {
    children: ReactNode
}
export function UserProvider({children}: UserProviderProps) {
    const [user, setUser] = useState<User | null >(null)

    const login = (name:string, email:string) => {
        setUser({
            id:Math.random().toString(36),
            name,
            email
        })
    }

    const logout = () => {
        setUser(null)
    }

    const updateUser = (updatedData: Partial<User>) => {
        if(user) {
            setUser((prev) =>  ({
                ...(prev as User),
                ...updatedData
            }))
        }
    }

    const value = {
        user,
        login,
        logout,
        updateUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}