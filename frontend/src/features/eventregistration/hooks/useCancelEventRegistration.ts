import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { EVENT_REGISTRATION_QUERY_KEYS } from "../constants/eventRegistrationQueries.constant";
import { cancelEventRegistration } from "@/services/eventRegistration.service";

export function useCancelEventRegistration() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (registrationId: number) => cancelEventRegistration(registrationId),
        onSuccess: async () => {
            toast.success(t("eventRegistration.cancelSuccess"));
            await queryClient.invalidateQueries({
                queryKey: [EVENT_REGISTRATION_QUERY_KEYS.EVENT_REGISTRATIONS.ROOT]
            });
        },
        onError: () => {
            toast.error(t("eventRegistration.cancelError"));
        },
    });
}
