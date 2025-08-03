import { AuthContext } from "@/hooks/useAuthContext";
import type { ReactNode } from "react";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const signUp = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    await fetch("http://localhost:6842/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
  };

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    await fetch("http://localhost:6842/api/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
  };

  const signOut = async () => {
    await fetch("http://localhost:6842/api/user/signout", {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
