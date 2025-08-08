import { useState } from "react";
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
import { Button } from "./button/button";
import { Textarea } from "./textarea";
import { useNavigate } from "react-router-dom";
import { createWorld } from "@/functions/functions";

export const CreateWorld = () => {
  const [worldName, setWorldName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateWorld = async () => {
    const response = await createWorld({ worldName, description });

    const { worldId } = await response.json();
    navigate(`/world/${worldId}/bosses`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-[#7A5230] border-2 border-[#7A5230] text-[#D9E6B9] hover:bg-[#3FA34D] hover:text-[#1E3A2F]"
        >
          Create World
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1E3A2F] border-2 border-[#7A5230] text-white">
        <DialogHeader>
          <DialogTitle className="text-[#A8D18D]">Create New World</DialogTitle>
          <DialogDescription className="text-[#D9E6B9]">
            Set up a new world for your team to conquer together
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="world-name" className="text-[#A8D18D]">
              World Name
            </Label>
            <Input
              id="world-name"
              name="worldName"
              value={worldName}
              onChange={(e) => setWorldName(e.target.value)}
              className="border-2 border-[#3FA34D] bg-[#E3D9B0] text-[#1E3A2F]"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description" className="text-[#A8D18D]">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-[#3FA34D] bg-[#E3D9B0] text-[#1E3A2F]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleCreateWorld}
            className="bg-[#7A5230] border-2 border-[#7A5230] text-[#D9E6B9] hover:bg-[#3FA34D] hover:text-[#1E3A2F]"
          >
            Create World
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
