import React, { useState } from "react";
import { Button } from "./button/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Input } from "./input";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "@/lib/utils";

export const AddNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleCreateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`${BACKEND_URL}/api/world/notes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Add Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="mb-6">Create New Note</DialogTitle>
        </DialogHeader>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xs"
        />
        <Label htmlFor="content" className="mt-2">
          Content
        </Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-xs"
        />
        <DialogFooter>
          <Button type="button" onClick={handleCreateNote}>
            Create Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
