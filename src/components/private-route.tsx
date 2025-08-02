import type { IPrivateRoutes } from "@/types/interface";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated, children }: IPrivateRoutes) => {
  if (isAuthenticated === false) {
    return <Navigate to="/signin" />;
  }
  return children;
};
