import { CreateWorld } from "@/components/create-world";
import { JoinWorld } from "@/components/join-world";
import { Navbar } from "@/components/navbar";
import { WorldCard } from "@/components/world-card";
import { getUserWorlds } from "@/functions/functions";
import { useAuthContext } from "@/hooks/useAuthContext";
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

  const fetchUserWorlds = async () => {
    const response = await getUserWorlds();

    if (!response) {
      throw new Error("Failed to fetch worlds.");
    }

    const { userWorldMemberships } = await response.json();
    setWorlds(userWorldMemberships);
  };

  useEffect(() => {
    fetchUserWorlds();
  }, []);

  return (
    <section className="flex flex-col min-h-screen bg-[#A8D5BA] text-[#2E4630]">
      <Navbar handleSignOut={handleSignOut} />
      <div className="border-2 border-[#D4AF37] flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52">
        <h2 className="text-3xl mt-12 mx-auto mb-12 text-[#2E8B57]">
          YOUR WORLDS
        </h2>
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
