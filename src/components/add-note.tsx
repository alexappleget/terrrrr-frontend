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
import { createNote } from "@/functions/functions";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { tags } from "@/constants/tags";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "./command";

export const AddNote = () => {
  const { id } = useParams();
  const [noteTag, setNoteTag] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleCreateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!id) {
      throw new Error("World ID not found.");
    }

    if (noteTag === "" || title === "" || content === "") {
      setError("Please fill out all fields.");
      return;
    }

    const response = await createNote({ id, title, content, tag: noteTag });

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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="text-xs"
            >
              {noteTag
                ? tags.find((tag) => tag.value === noteTag)?.label
                : "Select tag..."}
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandList>
                <CommandGroup>
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag.value}
                      value={tag.value}
                      onSelect={(currentValue) => {
                        setNoteTag(
                          currentValue === noteTag ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      {tag.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xs"
          required
        />
        <Label htmlFor="content" className="mt-2">
          Content
        </Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-xs max-h-96"
          required
        />
        <DialogFooter>
          <Button type="button" onClick={handleCreateNote}>
            Create Note
          </Button>
          {error && <span className="text-xs text-red-400">{error}</span>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
