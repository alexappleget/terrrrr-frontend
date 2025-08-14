import { useParams } from "react-router-dom";
import { Button } from "./button/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import React, { useState } from "react";
import { createEvent } from "@/functions/functions";

export const AddEvent = () => {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [scheduledAt, setScheduledAt] = useState<string>("");

  const handleCreateEvent = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!id) {
      throw new Error("World ID not found.");
    }

    const response = await createEvent({ id, name, description, scheduledAt });

    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="text-xs">
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="mb-6">Create New Event</DialogTitle>
        </DialogHeader>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-xs"
          maxLength={25}
        />
        <Label htmlFor="description" className="mt-2">
          Content
        </Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-xs"
          maxLength={125}
        />
        <Label htmlFor="scheduledAt" className="mt-2">
          Date & Time
        </Label>
        <Input
          id="scheduledAt"
          name="scheduledAt"
          type="datetime-local"
          min={new Date().toISOString().slice(0, 16)}
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="text-xs"
        />
        <DialogFooter>
          <Button type="button" onClick={handleCreateEvent}>
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
