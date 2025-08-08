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
import { BACKEND_URL } from "@/lib/utils";

export const CreateWorld = () => {
  const [worldName, setWorldName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateWorld = async () => {
    const response = await fetch(`${BACKEND_URL}/api/world/createWorld`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name: worldName, description }),
    });

    const { worldId } = await response.json();
    navigate(`/world/${worldId}/bosses`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Create World</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New World</DialogTitle>
          <DialogDescription>
            Set up a new world for your team to conquer together
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="world-name">World Name</Label>
            <Input
              id="world-name"
              name="worldName"
              value={worldName}
              onChange={(e) => setWorldName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateWorld}>
            Create World
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
