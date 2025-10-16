import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateSpaceResource } from "@/services/spaceResource.service";
import type { UpdateSpaceResourceRequestDto } from "@/domain/spaceresource/UpdateSpaceResourceRequestDto";
import { SPACE_RESOURCE_QUERY_KEYS } from "../constants/spaceResourceQueries.constant";

export function useUpdateSpaceResource() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateSpaceResourceRequestDto) => updateSpaceResource(payload),
        onSuccess: async () => {
            toast.success(t("admin.spaceResources.updated"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [SPACE_RESOURCE_QUERY_KEYS.SPACE_RESOURCES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [SPACE_RESOURCE_QUERY_KEYS.SPACE_RESOURCES.ALL] }),
            ]);
        },
    });
}