import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { createAcademicProgram } from "@/services/academicProgram.service";
import { ACADEMIC_PROGRAM_QUERY_KEYS } from "../constants/academicProgramQueries.constant";
import type { CreateAcademicProgramRequestDto } from "@/domain/academicprogram/CreateAcademicProgramRequestDto";

export function useCreateAcademicProgram() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateAcademicProgramRequestDto) => createAcademicProgram(payload),
        onSuccess: async () => {
            toast.success(t("admin.academicPrograms.created"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_PROGRAM_QUERY_KEYS.ACADEMIC_PROGRAMS.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_PROGRAM_QUERY_KEYS.ACADEMIC_PROGRAMS.ALL] }),
            ]);
        },
    });
}