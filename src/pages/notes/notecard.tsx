import { Badge } from "@/components/badge";
import { Button } from "@/components/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import type { INote } from "@/types/interface";

export const NoteCard = ({
  error,
  handleDeleteNote,
  note,
  userRole,
}: {
  error: { [id: string]: string };
  handleDeleteNote: ({ id }: { id: string }) => void;
  note: INote;
  userRole: string;
}) => {
  return (
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
          {["OWNER", "ADMIN", "SUB_ADMIN"].includes(userRole.toUpperCase()) && (
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
          <span className="text-xs text-red-400">{error[note.id]}</span>
        )}
      </CardContent>
    </Card>
  );
};
