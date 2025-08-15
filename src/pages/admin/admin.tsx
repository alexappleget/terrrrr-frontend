import { getAdminData } from "@/functions/functions";
import type { IAdminData, IMembership, IUserWorlds } from "@/types/interface";
import { Pickaxe } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { MemberManagementCard } from "./membermanagementcard";
import { WorldDetailsCard } from "./worlddetailscard";

export const Admin = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("No world ID found");
  }

  const world = useOutletContext<IUserWorlds | undefined>();
  const userRole = world?.role ?? "";
  const [data, setData] = useState<IAdminData | null>(null);

  const fetchAdminData = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }

    const response = await getAdminData({ id, userRole });

    const { adminData } = await response.json();

    adminData.memberships = adminData.memberships.sort(
      (a: IMembership, b: IMembership) =>
        a.user.username.localeCompare(b.user.username, undefined, {
          sensitivity: "base",
        })
    );

    setData(adminData);
  }, [id, userRole]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (!data) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="flex gap-2 items-center text-purple-700">
          <Pickaxe className="animate-bounce" />
          <span className="text-sm">Gathering resources...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52">
      <h2 className="text-3xl mt-12 text-purple-700 drop-shadow-lg">
        Admin Settings
      </h2>
      <div className="mt-4 w-full flex-grow grid lg:grid-cols-2">
        <div className="p-2">
          <MemberManagementCard
            data={data}
            fetchAdminData={fetchAdminData}
            userRole={userRole}
          />
        </div>
        <div className="space-y-4 p-2">
          <WorldDetailsCard data={data} id={id} userRole={userRole} />
        </div>
      </div>
    </div>
  );
};
