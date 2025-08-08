import { AddEvent } from "@/components/add-event";
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
import { BACKEND_URL } from "@/lib/utils";
import type { IEvent } from "@/types/interface";
import { CalendarDays, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Events = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [worldEvents, setWorldEvents] = useState<IEvent[]>([]);

  console.log(user);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`${BACKEND_URL}/api/event/${id}`, {
        method: "GET",
        credentials: "include",
      });

      const { events } = await response.json();
      setWorldEvents(events);
    };

    fetchEvents();
  }, [id]);

  const handleJoinEvent = async ({ id }: { id: string }) => {
    const response = await fetch(`${BACKEND_URL}/api/event/join/${id}`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <div className="grid gap-4 px-4 md:px-16 lg:px-32 xl:px-52">
      <div className="flex items-center justify-between gap-3 mt-12">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          <span className="text-lg">Upcoming Events</span>
        </div>
        <AddEvent />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-4">
        {worldEvents.map((event) => {
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

          const isAttending = event.RSVPs.filter(
            (rsvp) => rsvp.userId === user?.id
          );

          return (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {event.name.toUpperCase()}
                </CardTitle>
                <div className="text-xs text-muted-foreground">
                  {datePart}, {timePart}
                </div>
              </CardHeader>
              <CardContent className="grid gap-2">
                <p>{event.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {event.RSVPs.length} attending
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {event.RSVPs.map((attendee) => (
                    <Badge
                      key={attendee.id}
                      variant="secondary"
                      className="border-black"
                    >
                      {attendee.user.username}
                    </Badge>
                  ))}
                </div>
                {isAttending ? (
                  <Button type="button" variant="destructive">
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
        })}
      </div>
      {worldEvents.length === 0 && (
        <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
          No events yet. Create one to coordinate your next session.
        </div>
      )}
    </div>
  );
};
