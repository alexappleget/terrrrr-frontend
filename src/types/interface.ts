import type { ReactNode } from "react";

export interface IAuthContext {
  signUp: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface IPrivateRoutes {
  isAuthenticated: boolean | null;
  children: ReactNode;
}
