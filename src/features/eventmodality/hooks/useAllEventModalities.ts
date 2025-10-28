import { useQuery } from "@tanstack/react-query";
import { EVENT_MODALITIES_QUERY_KEYS } from "../constants/eventModalityQueries.constant";
import type { EventModality } from "@/domain/eventmodality/EventModality";
import { getAllEventModalities } from "@/services/eventModality.service";

export function useAllEventModalities() {
    return useQuery<EventModality[], Error>({
        queryKey: [EVENT_MODALITIES_QUERY_KEYS.EVENT_MODALITIES.ALL],
        queryFn: () => getAllEventModalities(),
    });
}
