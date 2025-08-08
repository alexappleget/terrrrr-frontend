import type { IRoutes } from "@/types/interface";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ isAuthenticated, children }: IRoutes) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
