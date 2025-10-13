import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { createSpaceStatus } from "@/services/spaceStatus.service";
import type { CreateSpaceStatusRequestDto } from "@/domain/spacestatus/CreateSpaceStatusRequestDto";
import { SPACE_STATUS_QUERY_KEYS } from "../constants/spaceStatusQueries.constant";

export function useCreateSpaceStatus() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateSpaceStatusRequestDto) => createSpaceStatus(payload),
        onSuccess: () => {
            toast.success(t("admin.spaceStatuses.created"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === SPACE_STATUS_QUERY_KEYS.SPACE_STATUSES.ROOT;
                },
            });
        },
    });
}