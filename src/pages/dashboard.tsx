import { CreateWorld } from "@/components/create-world";
import { JoinWorld } from "@/components/join-world";
import { Navbar } from "@/components/navbar";
import { WorldCard } from "@/components/world-card";
import { getUserWorlds } from "@/functions/functions";
import { useAuthContext } from "@/hooks/useAuthContext";
import type { IUserWorlds } from "@/types/interface";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();
  const [worlds, setWorlds] = useState<IUserWorlds[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(false);
  };

  useEffect(() => {
    fetchUserWorlds();
  }, []);

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar handleSignOut={handleSignOut} />
      <div className="flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52 bg-gradient-to-b from-[#7A5230] to-[#5B3920]">
        {loading ? (
          <div className="flex-grow flex items-center justify-center gap-2 text-[#EAD7B7]">
            <Globe className="animate-bounce" />
            <span>Gathering Your Worlds...</span>
          </div>
        ) : (
          <>
            <h2 className="text-3xl mt-12 mb-12 text-[#EAD7B7]">YOUR WORLDS</h2>
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
                  members={world.world._count?.memberships ?? 1}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
