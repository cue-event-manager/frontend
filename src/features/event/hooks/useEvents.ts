import type { Event } from "@/domain/event/Event";
import type { EventPaginationRequestDto } from "@/domain/event/EventPaginationRequestDto";
import type { Page } from "@/domain/common/Page";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import { getEvents } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";

export function useEvents(query: PaginationQuery & EventPaginationRequestDto) {
    return useQuery<Page<Event>, Error>({
        queryKey: [EVENT_QUERY_KEYS.EVENTS.ROOT, query],
        queryFn: () => getEvents(query),
    });
}
