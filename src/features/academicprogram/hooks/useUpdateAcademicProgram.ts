import { updateAcademicProgram } from "@/services/academicProgram.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ACADEMIC_PROGRAM_QUERY_KEYS } from "../constants/academicProgramQueries.constant";
import type { UpdateAcademicProgramRequestDto } from "@/domain/academicprogram/UpdateAcademicProgramRequestDto";

export function useUpdateAcademicProgram() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateAcademicProgramRequestDto) => updateAcademicProgram(payload),
        onSuccess: async () => {
            toast.success(t("admin.academicPrograms.updated"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_PROGRAM_QUERY_KEYS.ACADEMIC_PROGRAMS.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_PROGRAM_QUERY_KEYS.ACADEMIC_PROGRAMS.ALL] }),
            ]);
        },
    });
}