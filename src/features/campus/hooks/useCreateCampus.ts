import { createCampus } from "@/services/campus.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CAMPUS_QUERY_KEYS } from "../constants/campus.constant";
import type { CreateCampusRequestDto } from "@/domain/campus/CreateCampusRequestDto";

export function useCreateCampus() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateCampusRequestDto) => createCampus(payload),
        onSuccess: () => {
            toast.success(t("admin.campuses.created"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === CAMPUS_QUERY_KEYS.CAMPUSES.ROOT;
                },
            });
        },
    });
}