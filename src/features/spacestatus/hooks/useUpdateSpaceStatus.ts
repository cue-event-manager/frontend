import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateSpaceStatus } from "@/services/spaceStatus.service";
import type { UpdateSpaceStatusRequestDto } from "@/domain/spacestatus/UpdateSpaceStatusRequestDto";
import { SPACE_STATUS_QUERY_KEYS } from "../constants/spaceStatusQueries.constant";

export function useUpdateSpaceStatus() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateSpaceStatusRequestDto) => updateSpaceStatus(payload),
        onSuccess: () => {
            toast.success(t("admin.spaceStatuses.updated"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === SPACE_STATUS_QUERY_KEYS.SPACE_STATUSES.ROOT;
                },
            });
        },
    });
}