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

    const response = await fetch("http://localhost:6842/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);
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

    const response = await fetch("http://localhost:6842/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const authToken = response.json();
    console.log(authToken);
  };

  return (
    <AuthContext.Provider value={{ signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
