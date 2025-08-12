import type { IRoutes } from "@/types/interface";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated, children }: IRoutes) => {
  if (isAuthenticated === false) {
    return <Navigate to="/signin" />;
  }
  return children;
};
