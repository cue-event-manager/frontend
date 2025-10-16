import type { UpdateAcademicAreaRequestDto } from "@/domain/academicarea/UpdateAcademicAreaRequestDto";
import { updateAcademicArea } from "@/services/academicArea.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ACADEMIC_AREA_QUERY_KEYS } from "../constants/academicAreaQueries.constant";

export function useUpdateAcademicArea() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateAcademicAreaRequestDto) => updateAcademicArea(payload),
        onSuccess: async () => {
            toast.success(t("admin.academicAreas.updated"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_AREA_QUERY_KEYS.ACADEMIC_AREAS.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_AREA_QUERY_KEYS.ACADEMIC_AREAS.ALL] }),
            ]);
        },
    });
}