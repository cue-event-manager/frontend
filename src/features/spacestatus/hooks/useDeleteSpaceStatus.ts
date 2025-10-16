import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteSpaceStatus } from "@/services/spaceStatus.service";
import { SPACE_STATUS_QUERY_KEYS } from "../constants/spaceStatusQueries.constant";

export function useDeleteSpaceStatus() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteSpaceStatus(id),
        onSuccess: async () => {
            toast.success(t("admin.spaceStatuses.deleted"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [SPACE_STATUS_QUERY_KEYS.SPACE_STATUSES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [SPACE_STATUS_QUERY_KEYS.SPACE_STATUSES.ALL] }),
            ]);
        },
    });
}