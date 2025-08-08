import { AuthContext } from "@/hooks/useAuthContext";
import type { IUser } from "@/types/interface";
import { useEffect, useState, type ReactNode } from "react";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:6842/api/auth/session", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        const response = await fetch(
          "http://localhost:6842/api/user/fetchUserById",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const { user } = await response.json();

        setUser(user);
      } else {
        setUser(null);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]);

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

    setIsAuthenticated(true);
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

    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await fetch("http://localhost:6842/api/user/signout", {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signUp, signIn, signOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
