import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { createSpaceResource } from "@/services/spaceResource.service";
import type { CreateSpaceResourceRequestDto } from "@/domain/spaceresource/CreateSpaceResourceRequestDto";
import { SPACE_RESOURCE_QUERY_KEYS } from "../constants/spaceResourceQueries.constant";

export function useCreateSpaceResource() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateSpaceResourceRequestDto) => createSpaceResource(payload),
        onSuccess: async () => {
            toast.success(t("admin.spaceResources.created"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [SPACE_RESOURCE_QUERY_KEYS.SPACE_RESOURCES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [SPACE_RESOURCE_QUERY_KEYS.SPACE_RESOURCES.ALL] }),
            ]);
        },
    });
}