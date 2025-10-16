import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ACADEMIC_AREA_QUERY_KEYS } from "../constants/academicAreaQueries.constant";
import { deleteAcademicArea } from "@/services/academicArea.service";

export function useDeleteAcademicArea() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteAcademicArea(id),
        onSuccess: async () => {
            toast.success(t("admin.academicAreas.deleted"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_AREA_QUERY_KEYS.ACADEMIC_AREAS.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_AREA_QUERY_KEYS.ACADEMIC_AREAS.ALL] }),
            ]);
        },
    });
}