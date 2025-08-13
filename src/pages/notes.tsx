import { AddNote } from "@/components/add-note";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { getNotes } from "@/functions/functions";
import type { INote } from "@/types/interface";
import { Notebook } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Notes = () => {
  const { id } = useParams();
  const [worldNotes, setWorldNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotes = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }
    const response = await getNotes({ id });

    const { notes } = await response.json();
    setWorldNotes(notes);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="flex flex-col px-4 md:px-16 lg:px-32 xl:px-52">
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <span>Loading notes...</span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between my-8">
            <div className="flex items-center gap-2 text-purple-700">
              <Notebook className="w-6 h-6" />
              <h2 className="text-2xl drop-shadow-lg">TEAM NOTES</h2>
            </div>
            <AddNote />
          </div>
          <div className="flex flex-col gap-4 mb-12">
            {worldNotes.map((note) => (
              <Card
                key={note.id}
                className="border-2 bg-gradient-to-br from-[#472d67] via-[#3d2759] to-[#2b193d] text-purple-200 hover:shadow-lg hover:shadow-purple-600/70"
              >
                <CardHeader>
                  <CardTitle className="text-purple-100 drop-shadow-md">
                    {note.title.toUpperCase()}
                  </CardTitle>
                  <CardDescription className="text-xs text-purple-400">
                    By: {note.author.username}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{note.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
