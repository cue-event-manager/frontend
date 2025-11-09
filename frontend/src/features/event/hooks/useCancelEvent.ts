import { cancelEvent } from "@/services/event.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";

export function useCancelEvent() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => cancelEvent(id),
        onSuccess: async () => {
            toast.success(t("organizer.events.cancelled"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.EVENTS.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.EVENTS.ALL] }),
            ]);
        },
    });
}
