import { deleteEvent } from "@/services/event.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { EVENT_QUERY_KEYS } from "../constants/eventQueries.constant";

export function useDeleteEvent() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteEvent(id),
        onSuccess: async () => {
            toast.success(t("admin.events.deleted"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.EVENTS.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.EVENTS.ALL] }),
            ]);
        },
    });
}
