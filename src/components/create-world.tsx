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
          className="bg-[#4CAF50] text-[#F0F8E8] border-2 border-[#2e5a1f] hover:bg-[#66BB66] hover:text-[#1E3A2F] shadow-md shadow-[#2e5a1f]"
        >
          Create World
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-4 border-[#4A2C19] bg-gradient-to-b from-[#5A3E1B] to-[#7B5E25] text-[#F0E6D2]">
        <DialogHeader>
          <DialogTitle>Create New World</DialogTitle>
          <DialogDescription className="text-[#CBB993] text-xs my-2">
            Set up a new world for your team to conquer together
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="world-name" className="text-[#E9D99B]">
              World Name
            </Label>
            <Input
              id="world-name"
              name="worldName"
              value={worldName}
              onChange={(e) => setWorldName(e.target.value)}
              className="border-2 border-[#4A2C19] bg-[#7B5E25] text-[#F0E6D2] focus:outline-none focus:ring-2 focus:ring-[#D6B77B]"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description" className="text-[#E9D99B]">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={40}
              className="border-2 border-[#4A2C19] bg-[#7B5E25] text-[#F0E6D2] focus:outline-none focus:ring-2 focus:ring-[#D6B77B]"
            />
            <span className="text-xs">
              {40 - description.length} characters left
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleCreateWorld}
            className="bg-[#4CAF50] text-[#F0F8E8] border-2 border-[#2e5a1f] hover:bg-[#66BB66] hover:text-[#1E3A2F] shadow-md shadow-[#2e5a1f] px-4 py-2"
          >
            Create World
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
