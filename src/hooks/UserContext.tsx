"use client";
import { UserJson } from "@/core/domain/model";
import { createContext, ReactNode, useContext } from "react";

interface UserContext {
  user: UserJson | null;
}

const userContext = createContext<UserContext>({
  user: null,
});

export const useUserContext = () => {
  const { user } = useContext(userContext);
  return user;
};

export const UserContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: UserJson | null;
}) => {
  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
};
