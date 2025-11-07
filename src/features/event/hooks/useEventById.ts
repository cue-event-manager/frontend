import type { Event } from "@/domain/event/Event";
import { getEventById } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";

export function useEventById(id: number) {
    return useQuery<Event, Error>({
        queryKey: [EVENT_QUERY_KEYS.EVENTS.DETAIL, id],
        queryFn: () => getEventById(id),
        enabled: !!id,
    });
}
