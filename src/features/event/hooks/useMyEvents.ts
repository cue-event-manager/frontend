import type { EventWithAvailabilityResponseDto } from "@/domain/event/EventWithAvailabilityResponseDto";
import type { EventPaginationRequestDto } from "@/domain/event/EventPaginationRequestDto";
import type { Page } from "@/domain/common/Page";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import { getMyEvents } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";

export function useMyEvents(query: PaginationQuery & EventPaginationRequestDto) {
    return useQuery<Page<EventWithAvailabilityResponseDto>, Error>({
        queryKey: [EVENT_QUERY_KEYS.EVENTS.MY, query],
        queryFn: () => getMyEvents(query),
    });
}
