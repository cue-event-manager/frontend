import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { SPACE_TYPES_QUERY_KEYS } from "../constants/spaceTypeQueries.constant";
import { updateSpaceType } from "@/services/spaceType.service";
import type { UpdateSpaceTypeRequestDto } from "@/domain/spacetype/UpdateSpaceTypeRequestDto";

export function useUpdateSpaceType() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateSpaceTypeRequestDto) => updateSpaceType(payload),
        onSuccess: async () => {
            toast.success(t("admin.spaceTypes.updated"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [SPACE_TYPES_QUERY_KEYS.SPACE_TYPES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [SPACE_TYPES_QUERY_KEYS.SPACE_TYPES.ALL] }),
            ]);
        },
    });
}