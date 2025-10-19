import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteAcademicProgram } from "@/services/academicProgram.service";
import { ACADEMIC_PROGRAM_QUERY_KEYS } from "../constants/academicProgramQueries.constant";

export function useDeleteAcademicProgram() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteAcademicProgram(id),
        onSuccess: async () => {
            toast.success(t("admin.academicPrograms.deleted"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_PROGRAM_QUERY_KEYS.ACADEMIC_PROGRAMS.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [ACADEMIC_PROGRAM_QUERY_KEYS.ACADEMIC_PROGRAMS.ALL] }),
            ]);
        },
    });
}