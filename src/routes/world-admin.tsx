import type { IUserWorlds } from "@/types/interface";
import { Navigate, useOutletContext, useParams } from "react-router-dom";

export const WorldAdminRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const world = useOutletContext<IUserWorlds | undefined>();
  const { id } = useParams();

  if (!world) {
    return;
  }

  if (!["OWNER", "ADMIN", "SUB_ADMIN"].includes(world.role)) {
    return <Navigate to={`/world/${id}/bosses`} replace />;
  }

  return <>{children}</>;
};
