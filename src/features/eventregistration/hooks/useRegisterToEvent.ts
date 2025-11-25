import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import type { RegisterEventRequestDto } from "@/domain/eventregistration/ RegisterEventRequestDto";
import { registerToEvent } from "@/services/eventRegistration.service";
import { EVENT_QUERY_KEYS } from "@/features/event/constants/eventQueries.constant";
import { EVENT_REGISTRATION_QUERY_KEYS } from "../constants/eventRegistrationQueries.constant";

export function useRegisterToEvent() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: RegisterEventRequestDto) => registerToEvent(payload),
        onSuccess: async () => {
            toast.success(t("events.messages.registered"));
            await Promise.all([
                queryClient.invalidateQueries({
                    predicate: ({ queryKey }) => {
                        const [key] = queryKey;
                        return typeof key === "string" && key.startsWith(EVENT_QUERY_KEYS.EVENTS.ROOT);
                    },
                }),
                queryClient.invalidateQueries({
                    predicate: ({ queryKey }) => {
                        const [key] = queryKey;
                        return typeof key === "string" && key.startsWith(EVENT_REGISTRATION_QUERY_KEYS.REGISTRATIONS.ROOT);
                    },
                }),
                queryClient.invalidateQueries({
                    queryKey: [EVENT_REGISTRATION_QUERY_KEYS.AVAILABILITY.ROOT],
                }),
            ]);
        },
    });
}
