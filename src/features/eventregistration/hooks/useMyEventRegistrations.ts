import { getMyEventRegistrations } from "@/services/eventRegistration.service";
import { useQuery } from "@tanstack/react-query";
import type { EventRegistration } from "@/domain/eventregistration/EventRegistration";
import { EVENT_REGISTRATION_QUERY_KEYS } from "../constants/eventRegistrationQueries.constant";

export function useMyEventRegistrations() {
    return useQuery<EventRegistration[], Error>({
        queryKey: [EVENT_REGISTRATION_QUERY_KEYS.REGISTRATIONS.MINE],
        queryFn: getMyEventRegistrations,
    });
}
