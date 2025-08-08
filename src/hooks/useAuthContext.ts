import type { IAuthContext } from "@/types/interface";
import { createContext, useContext } from "react";

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: null,
  signUp: async () => {
    throw new Error("Signup function must be used inside the AuthProvider");
  },
  signIn: async () => {
    throw new Error("Login function must be used inside the AuthProvider");
  },
  signOut: async () => {
    throw new Error("Signout function must be used inside the AuthProvider");
  },
  user: null,
});

export const useAuthContext = () => useContext(AuthContext);
