import { getAllMemberships } from "@/functions/functions";
import type { IWorldCode, IWorldMembers } from "@/types/interface";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Admin = () => {
  const { id } = useParams();
  const [worldCode, setWorldCode] = useState<IWorldCode | null>(null);
  const [worldMembers, setWorldMembers] = useState<IWorldMembers[]>([]);

  const fetchAllMemberships = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }

    const response = await getAllMemberships({ id });

    const { code, members } = await response.json();

    setWorldCode(code);
    setWorldMembers(members);
  }, [id]);

  console.log(worldCode);
  console.log(worldMembers);

  useEffect(() => {
    fetchAllMemberships();
  }, [fetchAllMemberships]);

  return (
    <div className="border-2 px-4 md:px-16 lg:px-32 xl:px-52">
      <h2>Admin</h2>
    </div>
  );
};
