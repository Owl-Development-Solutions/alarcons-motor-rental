"use client";

import { createContext, useContext, useState } from "react";
import { User } from "../models/user.model";

const UserContext = createContext<{
  user: User | null | undefined;
  setUser: (u: User | null | undefined) => void;
} | null>(null);

export function UserProvider({
  initialUser,
  children,
}: {
  initialUser: User | null | undefined;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
