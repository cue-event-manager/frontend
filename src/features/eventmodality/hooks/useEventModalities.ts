import { useQuery } from "@tanstack/react-query";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import { EVENT_MODALITIES_QUERY_KEYS } from "../constants/eventModalityQueries.constant";
import type { EventModalityPaginationRequestDto } from "@/domain/eventmodality/EventModalityPaginationRequestDto";
import type { EventModality } from "@/domain/eventmodality/EventModality";
import { getEventModalities } from "@/services/eventModality.service";

export function useEventModalities(query: PaginationQuery & EventModalityPaginationRequestDto) {
    return useQuery<Page<EventModality>, Error>({
        queryKey: [EVENT_MODALITIES_QUERY_KEYS.EVENT_MODALITIES.ROOT, query],
        queryFn: () => getEventModalities(query),
    });
}
