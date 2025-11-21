import { getEventById } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";
import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";

export function useEventById(id?: number) {
    return useQuery<EventWithAvailabilityResponseDto, Error>({
        queryKey: [EVENT_QUERY_KEYS.EVENTS.DETAIL, id],
        queryFn: () => getEventById(id!),
        enabled: !!id,
    });
}
