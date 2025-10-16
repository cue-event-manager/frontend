import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { createSpace } from "@/services/space.service";
import { SPACE_QUERY_KEYS } from "../constants/spaceQueries.constant";
import type { CreateSpaceRequestDto } from "@/domain/space/CreateSpaceRequestDto";

export function useCreateSpace() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateSpaceRequestDto) => createSpace(payload),
        onSuccess: () => {
            toast.success(t("admin.spaces.created"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === SPACE_QUERY_KEYS.SPACES.ROOT;
                },
            },);
        },
    });
}