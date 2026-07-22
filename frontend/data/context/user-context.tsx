"use client";

import { createContext, useContext, useState, useTransition } from "react";
import { User } from "../models/user.model";

const UserContext = createContext<{
  user: User | null | undefined;
  setUser: (u: User | null | undefined) => void;
  isRefreshing: boolean;
  refresh: (fn: () => void) => void;
} | null>(null);

export function UserProvider({
  initialUser,
  children,
}: {
  initialUser: User | null | undefined;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(initialUser);
  const [isRefreshing, startTransition] = useTransition();

  const refresh = (fn: () => void) => startTransition(fn);

  return (
    <UserContext.Provider value={{ user, setUser, isRefreshing, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
