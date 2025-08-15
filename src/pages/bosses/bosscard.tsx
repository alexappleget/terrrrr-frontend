import { Badge } from "@/components/badge";
import { Button } from "@/components/button/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { setBossKilledState } from "@/functions/functions";
import type { IBoss, IUserWorlds } from "@/types/interface";
import { useOutletContext } from "react-router-dom";

export const BossCard = ({
  boss,
  fetchBosses,
}: {
  boss: IBoss;
  fetchBosses: () => void;
}) => {
  const world = useOutletContext<IUserWorlds | undefined>();
  const userRole = world?.role ?? "";

  const handleSetBossKilledState = async ({
    id,
    userRole,
    killed,
  }: {
    id: string;
    userRole: string;
    killed: boolean;
  }) => {
    const response = await setBossKilledState({ id, userRole, killed });

    if (response.ok) {
      fetchBosses();
    }
  };

  return (
    <Card
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
      {["OWNER", "ADMIN", "SUB_ADMIN"].includes(userRole) && (
        <CardFooter className="flex items-center md:justify-center">
          {boss.worldProgress.killed ? (
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-green-100"
              onClick={() => {
                handleSetBossKilledState({
                  id: boss.worldProgress.id,
                  userRole,
                  killed: false,
                });
              }}
            >
              Mark Alive
            </Button>
          ) : (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                handleSetBossKilledState({
                  id: boss.worldProgress.id,
                  userRole,
                  killed: true,
                });
              }}
            >
              Mark Killed
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
