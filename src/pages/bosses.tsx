import { Badge } from "@/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { getBosses } from "@/functions/functions";
import type { IBoss } from "@/types/interface";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Bosses = () => {
  const { id } = useParams();
  const [worldBosses, setWorldBosses] = useState<IBoss[]>([]);

  const fetchBosses = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }
    const response = await getBosses({ id });

    const { bosses } = await response.json();
    setWorldBosses(bosses);
  }, [id]);

  useEffect(() => {
    fetchBosses();
  }, [fetchBosses]);

  return (
    <div className="flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52">
      <h2 className="text-3xl mt-12 text-purple-700 drop-shadow-lg">
        BOSS PROGRESS
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 my-12">
        {worldBosses.map((boss) => (
          <Card
            key={boss.id}
            className={`border-2 bg-gradient-to-br from-[#472d67] via-[#3d2759] to-[#2b193d] text-purple-200 hover:shadow-lg hover:shadow-purple-600/70 ${
              boss.worldProgress.killed
                ? "border-red-500 shadow-red-600/40"
                : "border-green-400 shadow-green-600/30"
            }`}
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-purple-100 drop-shadow-md">
                {boss.name}
              </CardTitle>
              <Badge
                className={`mt-4 ${
                  boss.worldProgress.killed
                    ? "bg-red-600 text-red-100"
                    : "bg-green-700 text-green-100"
                }`}
              >
                {boss.worldProgress.killed ? "Defeated" : "Alive"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>HEALTH:</span>
                  <span>{boss.health}</span>
                </div>
                <div className="flex justify-between">
                  <span>STAGE:</span>
                  <span>{boss.stage.toUpperCase()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
