import { useQuery } from "@tanstack/react-query";
import { checkEventAvailability } from "@/services/eventRegistration.service";
import type { EventAvailabilityResponseDto } from "@/domain/eventregistration/EventAvailabilityResponseDto";
import { EVENT_REGISTRATION_QUERY_KEYS } from "../constants/eventRegistrationQueries.constant";

export function useEventAvailability(eventId: number) {
    return useQuery<EventAvailabilityResponseDto, Error>({
        queryKey: [EVENT_REGISTRATION_QUERY_KEYS.EVENT_REGISTRATIONS.AVAILABILITY, eventId],
        queryFn: () => checkEventAvailability(eventId),
        enabled: !!eventId,
    });
}
