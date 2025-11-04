import type { Event } from "@/domain/event/Event";
import { getAllEvents } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";

export function useAllEvents() {
    return useQuery<Event[], Error>({
        queryKey: [EVENT_QUERY_KEYS.EVENTS.ALL],
        queryFn: getAllEvents,
    });
}
