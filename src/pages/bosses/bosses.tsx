import { getBosses } from "@/functions/functions";
import type { IBoss } from "@/types/interface";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BossCard } from "./bosscard";

export const Bosses = () => {
  const { id } = useParams();
  const [worldBosses, setWorldBosses] = useState<IBoss[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBosses = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }

    const response = await getBosses({ id });

    const { bosses } = await response.json();
    setWorldBosses(bosses);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchBosses();
  }, [fetchBosses]);

  return (
    <div className="flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52">
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <span>Loading boss data...</span>
        </div>
      ) : (
        <>
          <h2 className="text-3xl mt-12 text-purple-700 drop-shadow-lg">
            BOSS PROGRESS
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 my-12">
            {worldBosses.map((boss) => (
              <BossCard key={boss.id} boss={boss} fetchBosses={fetchBosses} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
