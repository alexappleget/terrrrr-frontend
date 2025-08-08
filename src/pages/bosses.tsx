import { Badge } from "@/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { BACKEND_URL } from "@/lib/utils";
import type { IBoss } from "@/types/interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Bosses = () => {
  const { id } = useParams();
  const [worldBosses, setWorldBosses] = useState<IBoss[]>([]);

  useEffect(() => {
    const fetchBosses = async () => {
      const response = await fetch(`${BACKEND_URL}/api/world/bosses/${id}`, {
        method: "GET",
        credentials: "include",
      });

      const { bosses } = await response.json();
      setWorldBosses(bosses);
    };

    fetchBosses();
  }, [id]);

  return (
    <div className="flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52">
      <h2 className="text-3xl mt-12 mx-auto">BOSS PROGRESS</h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto my-12">
        {worldBosses.map((boss) => (
          <Card
            key={boss.id}
            className={`border-2 ${
              boss.worldProgress.killed ? "border-red-400" : "border-green-400"
            }`}
          >
            <CardHeader className="pb-4">
              <CardTitle>{boss.name}</CardTitle>
              <Badge className="mt-4">
                {boss.worldProgress.killed ? "Defeated" : "Alive"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
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
