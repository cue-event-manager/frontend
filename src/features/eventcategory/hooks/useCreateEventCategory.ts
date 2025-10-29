import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { EVENT_CATEGORY_QUERY_KEYS } from "../constants/eventCategoryQueries.constant";
import type { CreateEventCategoryRequestDto } from "@/domain/eventcategory/CreateEventCategoryRequestDto";
import { createEventCategory } from "@/services/eventCategory.service";

export function useCreateEventCategory() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateEventCategoryRequestDto) => createEventCategory(payload),
        onSuccess: async () => {
            toast.success(t("admin.eventCategories.created"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [EVENT_CATEGORY_QUERY_KEYS.EVENT_CATEGORIES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [EVENT_CATEGORY_QUERY_KEYS.EVENT_CATEGORIES.ALL] }),
            ]);
        },
    });
}
