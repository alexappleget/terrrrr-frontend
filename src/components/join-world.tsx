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
import { BACKEND_URL } from "@/lib/utils";

export const JoinWorld = () => {
  const [joinCode, setJoinCode] = useState<string>("");

  const handleJoinWorld = async () => {
    const response = await fetch(`${BACKEND_URL}/api/world/joinWorld`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ code: joinCode }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Join World
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join World</DialogTitle>
          <DialogDescription>
            Enter a join code to join an existing world
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="join-code">Join Code</Label>
            <Input
              id="join-code"
              name="join-code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleJoinWorld}>
            Join World
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
