import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateFaculty } from "@/services/faculty.service";
import { FACULTY_QUERY_KEYS } from "../constants/facultyQueries.constant";
import type { UpdateFacultyRequestDto } from "@/domain/faculty/UpdateFacultyRequestDto";

export function useUpdateFaculty() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateFacultyRequestDto) => updateFaculty(payload),
        onSuccess: async () => {
            toast.success(t("admin.faculties.updated"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [FACULTY_QUERY_KEYS.FACULTIES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [FACULTY_QUERY_KEYS.FACULTIES.ALL] }),
            ]);
        },
    });
}