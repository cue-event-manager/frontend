import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteSpace } from "@/services/space.service";
import { SPACE_QUERY_KEYS } from "../constants/spaceQueries.constant";

export function useDeleteSpace() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteSpace(id),
        onSuccess: () => {
            toast.success(t("admin.spaces.deleted"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === SPACE_QUERY_KEYS.SPACES.ROOT;
                },
            });
        },
    });
}