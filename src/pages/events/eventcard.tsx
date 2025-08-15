import { Badge } from "@/components/badge";
import { Button } from "@/components/button/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { useAuthContext } from "@/hooks/useAuthContext";
import type { IEvent } from "@/types/interface";
import { Users } from "lucide-react";

export const EventCard = ({
  event,
  handleJoinEvent,
  handleLeaveEvent,
}: {
  event: IEvent;
  handleJoinEvent: ({ id }: { id: string }) => void;
  handleLeaveEvent: ({ id }: { id: string }) => void;
}) => {
  const { user } = useAuthContext();

  const date = new Date(event.scheduledAt);

  const datePart = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const timePart = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  const isAttending = event.RSVPs.some((rsvp) => rsvp.userId === user?.id);

  return (
    <Card className="bg-gradient-to-br from-[#472d67] via-[#3d2759] to-[#2b193d] text-purple-200 hover:shadow-lg hover:shadow-purple-600/70">
      <CardHeader>
        <CardTitle
          className="text-lg break-words"
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {event.name.toUpperCase()}
        </CardTitle>
        <div className="text-xs text-purple-400">
          {datePart}, {timePart}
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <p
          className="text-xs break-words h-14 lg:h-20"
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {event.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-green-400">
          <Users className="h-4 w-4" />
          {event.RSVPs.length}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {event.RSVPs.map((attendee) => (
            <Badge
              key={attendee.id}
              variant="secondary"
              className="bg-purple-700 text-purple-50 shadow-lg shadow-purple-600/50 border border-purple-600"
            >
              {attendee.user.username}
            </Badge>
          ))}
        </div>
        {isAttending ? (
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleLeaveEvent({ id: event.id })}
          >
            Leave
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => handleJoinEvent({ id: event.id })}
          >
            Join
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
