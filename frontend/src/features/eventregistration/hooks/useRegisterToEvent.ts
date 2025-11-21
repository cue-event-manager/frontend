import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerToEvent } from "@/services/eventRegistration.service";
import { EVENT_REGISTRATION_QUERY_KEYS } from "../constants/eventRegistrationQueries.constant";
import { EVENT_QUERY_KEYS } from "@/features/event/constants/eventQueries.constant";

export function useRegisterToEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerToEvent,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [EVENT_REGISTRATION_QUERY_KEYS.EVENT_REGISTRATIONS.ROOT],
            });
            await queryClient.invalidateQueries({
                queryKey: [EVENT_REGISTRATION_QUERY_KEYS.EVENT_REGISTRATIONS.MY_REGISTRATIONS],
            });
            await queryClient.invalidateQueries({
                queryKey: [EVENT_REGISTRATION_QUERY_KEYS.EVENT_REGISTRATIONS.AVAILABILITY],
            });
            await queryClient.invalidateQueries({
                queryKey: [EVENT_QUERY_KEYS.EVENTS.ROOT],
            });
        },
    });
}
