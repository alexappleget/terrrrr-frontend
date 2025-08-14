import { AddNote } from "@/components/add-note";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { deleteNote, getNotes } from "@/functions/functions";
import type { INote, IUserWorlds } from "@/types/interface";
import { Notebook } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export const Notes = () => {
  const { id } = useParams();
  const world = useOutletContext<IUserWorlds | undefined>();
  const userRole = world?.role ?? "";
  const [worldNotes, setWorldNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ [id: string]: string }>({});

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

  const handleDeleteNote = async ({ id }: { id: string }) => {
    const response = await deleteNote({ id, userRole });

    if (!response.ok) {
      setError((prev) => ({
        ...prev,
        [id]: "Error deleting note. Please try again later.",
      }));
    }

    fetchNotes();
  };

  useEffect(() => {
    Object.keys(error).forEach((noteId) => {
      if (error[noteId]) {
        const timer = setTimeout(() => {
          setError((prev) => {
            const newErr = { ...prev };
            delete newErr[noteId];
            return newErr;
          });
        }, 1000);
        return () => clearTimeout(timer);
      }
    });
  }, [error]);

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
                <Card
                  key={note.id}
                  className="border-2 bg-gradient-to-br from-[#472d67] via-[#3d2759] to-[#2b193d] text-purple-200 hover:shadow-lg hover:shadow-purple-600/70"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-100 drop-shadow-md">
                        {note.title.toUpperCase()}
                      </CardTitle>
                      <Badge className="border-2 border-purple-300 bg-purple-600">
                        {note.tag}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs text-purple-400">
                      By: {note.author.username}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm" style={{ whiteSpace: "pre-line" }}>
                        {note.content}
                      </p>
                      {["OWNER", "ADMIN", "SUB_ADMIN"].includes(
                        userRole.toUpperCase()
                      ) && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => handleDeleteNote({ id: note.id })}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                    {error[note.id] && (
                      <span className="text-xs text-red-400">
                        {error[note.id]}
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
