import { AddNote } from "@/components/add-note";
import { getNotes } from "@/functions/functions";
import type { INote } from "@/types/interface";
import { Notebook } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NoteCard } from "./notecard";

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
            {[...worldNotes]
              .sort(
                (older, newer) =>
                  new Date(newer.createdAt).getTime() -
                  new Date(older.createdAt).getTime()
              )
              .map((note) => (
                <NoteCard key={note.id} note={note} fetchNotes={fetchNotes} />
              ))}
          </div>
          {worldNotes.length === 0 && (
            <div className="rounded-md border p-6 text-center text-sm text-purple-700">
              No notes have been added. Share strategies, reminders, or ideas to
              help your group!
            </div>
          )}
        </>
      )}
    </div>
  );
};
