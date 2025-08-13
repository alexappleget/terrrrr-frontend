import { useState } from "react";
import { Button } from "./button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { useNavigate } from "react-router-dom";
import { joinWorld } from "@/functions/functions";

export const JoinWorld = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState<string>("");

  const handleJoinWorld = async () => {
    const response = await joinWorld({ joinCode });

    const { worldId } = await response.json();
    navigate(`/world/${worldId}/bosses`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="border-2 border-[#c2ff9e] bg-[#2e5a1f] text-[#c2ff9e] hover:bg-[#c2ff9e] hover:border-[#2e5a1f] hover:text-[#1E3A2F] shadow-md shadow-[#c2ff9e]"
        >
          Join World
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-4 border-[#4A2C19] bg-gradient-to-b from-[#5A3E1B] to-[#7B5E25] text-[#F0E6D2]">
        <DialogHeader>
          <DialogTitle>Join World</DialogTitle>
          <DialogDescription className="text-[#CBB993] text-xs my-2">
            Enter a join code to join an existing world
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="join-code" className="text-[#E9D99B]">
              Join Code
            </Label>
            <Input
              id="join-code"
              name="join-code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="border-2 border-[#4A2C19] bg-[#7B5E25] text-[#F0E6D2]
                placeholder-[#CBB993]
                focus:outline-none focus:ring-2 focus:ring-[#D6B77B]
                rounded-sm
                px-2 py-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="border-2 border-[#c2ff9e] bg-[#2e5a1f] text-[#c2ff9e] hover:bg-[#c2ff9e] hover:border-[#2e5a1f] hover:text-[#1E3A2F] shadow-md shadow-[#c2ff9e]"
            onClick={handleJoinWorld}
          >
            Join World
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
