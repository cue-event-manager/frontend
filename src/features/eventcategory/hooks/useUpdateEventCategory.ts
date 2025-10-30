import type { UpdateEventCategoryRequestDto } from "@/domain/eventcategory/UpdateEventCategoryRequestDto";
import { updateEventCategory } from "@/services/eventCategory.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { EVENT_CATEGORY_QUERY_KEYS } from "../constants/eventCategoryQueries.constant";

export function useUpdateEventCategory() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateEventCategoryRequestDto) => updateEventCategory(payload),
        onSuccess: async () => {
            toast.success(t("admin.eventCategories.updated"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [EVENT_CATEGORY_QUERY_KEYS.EVENT_CATEGORIES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [EVENT_CATEGORY_QUERY_KEYS.EVENT_CATEGORIES.ALL] }),
            ]);
        },
    });
}
