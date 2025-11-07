import type { UpdateEventRequestDto } from "@/domain/event/UpdateEventRequestDto";
import { updateEvent } from "@/services/event.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";

export function useUpdateEvent() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateEventRequestDto) => updateEvent(payload),
        onSuccess: async () => {
            toast.success(t("admin.events.updated"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.EVENTS.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.EVENTS.ALL] }),
            ]);
        },
    });
}
