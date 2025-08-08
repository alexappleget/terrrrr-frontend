import { BACKEND_URL } from "@/lib/utils";
import type { IWorldCode, IWorldMembers } from "@/types/interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Admin = () => {
  const { id } = useParams();
  const [worldCode, setWorldCode] = useState<IWorldCode | null>(null);
  const [worldMembers, setWorldMembers] = useState<IWorldMembers[]>([]);

  useEffect(() => {
    const fetchAllMemberships = async () => {
      const response = await fetch(
        `${BACKEND_URL}/api/world/allMemberships/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const { code, members } = await response.json();

      setWorldCode(code);
      setWorldMembers(members);
    };

    fetchAllMemberships();
  }, [id]);

  return <></>;
};
