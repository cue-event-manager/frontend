import type { UpdateRecurrentEventRequestDto } from "@/domain/event/UpdateRecurrentEventRequestDto";
import { updateRecurrentEvent } from "@/services/event.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";

export function useUpdateRecurrentEvent() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateRecurrentEventRequestDto) => updateRecurrentEvent(payload),
        onSuccess: async (data) => {
            toast.success(t("events.recurrentUpdated", { count: data.updatedCount }));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.EVENTS.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.EVENTS.ALL] }),
            ]);
        },
    });
}
