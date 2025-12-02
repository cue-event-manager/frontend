import { useQuery } from "@tanstack/react-query";
import type { GetEventUsersRegisteredResponseDto } from "@/domain/eventregistration/GetEventUsersRegisteredResponseDto";
import { getRegisteredUsersByEvent } from "@/services/eventRegistration.service";
import { EVENT_REGISTRATION_QUERY_KEYS } from "../constants/eventRegistrationQueries.constant";

export function useRegisteredUsers(eventId?: number, enabled = true) {
    return useQuery<GetEventUsersRegisteredResponseDto[], Error>({
        queryKey: [EVENT_REGISTRATION_QUERY_KEYS.REGISTERED_USERS.ROOT, eventId],
        queryFn: () => getRegisteredUsersByEvent(eventId!),
        enabled: !!eventId && enabled,
    });
}
