import { useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./user-context";
import type { User } from "./user-context";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, email: string) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedData });
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

