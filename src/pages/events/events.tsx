import { AddEvent } from "@/components/add-event";
import { getEvents } from "@/functions/functions";
import type { IEvent } from "@/types/interface";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventCard } from "./eventcard";

export const Events = () => {
  const { id } = useParams();
  const [worldEvents, setWorldEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }
    const response = await getEvents({ id });

    const { events } = await response.json();
    setWorldEvents(events);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="grid gap-4 px-4 md:px-16 lg:px-32 xl:px-52">
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <span>Loading events...</span>
        </div>
      ) : (
        <>
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
            {[...worldEvents]
              .sort(
                (older, newer) =>
                  new Date(older.scheduledAt).getTime() -
                  new Date(newer.scheduledAt).getTime()
              )
              .map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  fetchEvents={fetchEvents}
                />
              ))}
          </div>
          {worldEvents.length === 0 && (
            <div className="rounded-md border p-6 text-center text-sm text-purple-700">
              No events yet. Create one to coordinate your next session.
            </div>
          )}
        </>
      )}
    </div>
  );
};
