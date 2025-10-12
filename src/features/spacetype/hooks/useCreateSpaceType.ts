import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { SPACE_TYPES_QUERY_KEYS } from "../constants/spaceTypeQueries.constant";
import type { CreateSpaceTypeRequestDto } from "@/domain/spacetype/CreateSpaceTypeRequestDto";
import { createSpaceType } from "@/services/spaceType.service";

export function useCreateSpaceType() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateSpaceTypeRequestDto) => createSpaceType(payload),
        onSuccess: () => {
            toast.success(t("admin.spaceTypes.created"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === SPACE_TYPES_QUERY_KEYS.SPACE_TYPES.ROOT;
                },
            });
        },
    });
}