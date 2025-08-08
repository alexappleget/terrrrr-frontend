import { AddNote } from "@/components/add-note";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { BACKEND_URL } from "@/lib/utils";
import type { INote } from "@/types/interface";
import { Notebook } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Notes = () => {
  const { id } = useParams();
  const [worldNotes, setWorldNotes] = useState<INote[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`${BACKEND_URL}/api/world/notes/${id}`, {
        method: "GET",
        credentials: "include",
      });

      const { notes } = await response.json();
      setWorldNotes(notes);
    };

    fetchNotes();
  }, [id]);

  return (
    <div className="flex flex-col px-4 md:px-16 lg:px-32 xl:px-52">
      <div className="flex items-center justify-between my-8">
        <div className="flex items-center gap-2">
          <Notebook />
          <h2>TEAM NOTES</h2>
        </div>
        <AddNote />
      </div>
      <div className="flex flex-col gap-4 mb-6">
        {worldNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {note.title.toUpperCase()}
              </CardTitle>
              <CardDescription className="text-xs">
                By: {note.author.username}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
