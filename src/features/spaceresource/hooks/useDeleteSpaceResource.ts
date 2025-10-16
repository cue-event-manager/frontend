import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { SPACE_RESOURCE_QUERY_KEYS } from "../constants/spaceResourceQueries.constant";
import { deleteSpaceResource } from "@/services/spaceResource.service";

export function useDeleteSpaceResource() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteSpaceResource(id),
        onSuccess: async () => {
            toast.success(t("admin.spaceResources.deleted"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [SPACE_RESOURCE_QUERY_KEYS.SPACE_RESOURCES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [SPACE_RESOURCE_QUERY_KEYS.SPACE_RESOURCES.ALL] }),
            ]);
        },
    });
}