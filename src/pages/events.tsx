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
import { getEvents } from "@/functions/functions";
import { useAuthContext } from "@/hooks/useAuthContext";
import { BACKEND_URL } from "@/lib/utils";
import type { IEvent } from "@/types/interface";
import { Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Events = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [worldEvents, setWorldEvents] = useState<IEvent[]>([]);

  const fetchEvents = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }
    const response = await getEvents({ id });

    const { events } = await response.json();
    setWorldEvents(events);
  }, [id]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleJoinEvent = async ({ id }: { id: string }) => {
    const response = await fetch(`${BACKEND_URL}/api/event/join/${id}`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      fetchEvents();
    }
  };

  const handleLeaveEvent = async ({ id }: { id: string }) => {
    const response = await fetch(`${BACKEND_URL}/api/event/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      fetchEvents();
    }
  };

  return (
    <div className="grid gap-4 px-4 md:px-16 lg:px-32 xl:px-52">
      <div className="flex items-center justify-between mt-12">
        <div className="flex flex-col gap-2 text-purple-700">
          <h2 className="text-lg font-semibold">UPCOMING EVENTS</h2>
          <p className="text-xs text-purple-600">
            Plan and coordinate your team adventures
          </p>
        </div>
        <AddEvent />
      </div>
      <div className="grid gap-4 lg:grid-cols-2 my-4">
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

          const isAttending = event.RSVPs.some(
            (rsvp) => rsvp.userId === user?.id
          );

          return (
            <Card
              key={event.id}
              className="border-2 bg-gradient-to-br from-[#472d67] via-[#3d2759] to-[#2b193d] text-purple-200 hover:shadow-lg hover:shadow-purple-600/70"
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  {event.name.toUpperCase()}
                </CardTitle>
                <div className="text-xs text-purple-400">
                  {datePart}, {timePart}
                </div>
              </CardHeader>
              <CardContent className="grid gap-2">
                <p>{event.description}</p>
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
                    className="hover:cursor-pointer"
                  >
                    Leave
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => handleJoinEvent({ id: event.id })}
                    className="hover:cursor-pointer"
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
