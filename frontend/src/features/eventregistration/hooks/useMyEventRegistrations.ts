import { useQuery } from "@tanstack/react-query";
import { getMyEventRegistrations } from "@/services/eventRegistration.service";
import type { EventRegistration } from "@/domain/eventregistration/EventRegistration";
import { EVENT_REGISTRATION_QUERY_KEYS } from "../constants/eventRegistrationQueries.constant";

export function useMyEventRegistrations() {
    return useQuery<EventRegistration[], Error>({
        queryKey: [EVENT_REGISTRATION_QUERY_KEYS.EVENT_REGISTRATIONS.MY_REGISTRATIONS],
        queryFn: getMyEventRegistrations,
    });
}
