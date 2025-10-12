import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateSpaceResource } from "@/services/spaceResource.service";
import type { UpdateSpaceResourceRequestDto } from "@/domain/spaceresource/UpdateSpaceResourceRequestDto";
import { SPACE_TYPES_QUERY_KEYS } from "@/features/spacetype/constants/spaceTypeQueries.constant";

export function useUpdateSpaceResource() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateSpaceResourceRequestDto) => updateSpaceResource(payload),
        onSuccess: () => {
            toast.success(t("admin.spaceResources.updated"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === SPACE_TYPES_QUERY_KEYS.SPACE_TYPES.ROOT;
                },
            });
        },
    });
}