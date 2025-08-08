import { CreateWorld } from "@/components/create-world";
import { JoinWorld } from "@/components/join-world";
import { Navbar } from "@/components/navbar";
import { WorldCard } from "@/components/world-card";
import { useAuthContext } from "@/hooks/useAuthContext";
import { BACKEND_URL } from "@/lib/utils";
import type { IUserWorlds } from "@/types/interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();
  const [worlds, setWorlds] = useState<IUserWorlds[]>([]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  useEffect(() => {
    const fetchUserWorlds = async () => {
      const response = await fetch(`${BACKEND_URL}/api/world/fetchUserWorlds`, {
        method: "GET",
        credentials: "include",
      });

      const { userWorldMemberships } = await response.json();
      setWorlds(userWorldMemberships);
    };

    fetchUserWorlds();
  }, []);

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar handleSignOut={handleSignOut} />
      <div className="border-2 flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52">
        <h2 className="text-3xl mt-12 mx-auto mb-12">YOUR WORLDS</h2>
        <div className="flex gap-10">
          <CreateWorld />
          <JoinWorld />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto my-12">
          {worlds.map((world) => (
            <WorldCard
              key={world.world.id}
              id={world.world.id}
              name={world.world.name}
              description={world.world.description}
              role={world.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
