import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import type { UpdateCampusRequestDto } from "@/domain/campus/UpdateSpaceResourceRequestDto";
import { updateCampus } from "@/services/campus.service";
import { CAMPUS_QUERY_KEYS } from "../constants/campus.constant";

export function useUpdateCampus() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateCampusRequestDto) => updateCampus(payload),
        onSuccess: () => {
            toast.success(t("admin.campuses.updated"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === CAMPUS_QUERY_KEYS.CAMPUSES.ROOT;
                },
            });
        },
    });
}