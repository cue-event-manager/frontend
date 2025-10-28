import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { EVENT_MODALITIES_QUERY_KEYS } from "../constants/eventModalityQueries.constant";
import type { UpdateEventModalityRequestDto } from "@/domain/eventmodality/UpdateEventModalityRequestDto";
import { updateEventModality } from "@/services/eventModality.service";

export function useUpdateEventModality() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateEventModalityRequestDto) => updateEventModality(payload),
        onSuccess: async () => {
            toast.success(t("admin.eventModalities.updated"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [EVENT_MODALITIES_QUERY_KEYS.EVENT_MODALITIES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [EVENT_MODALITIES_QUERY_KEYS.EVENT_MODALITIES.ALL] }),
            ]);
        },
    });
}
