import type { CreateFacultyRequestDto } from "@/domain/faculty/CreateFacultyRequestDto";
import { createFaculty } from "@/services/faculty.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FACULTY_QUERY_KEYS } from "../constants/facultyQueries.constant";

export function useCreateFaculty() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateFacultyRequestDto) => createFaculty(payload),
        onSuccess: async () => {
            toast.success(t("admin.faculties.created"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [FACULTY_QUERY_KEYS.FACULTIES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [FACULTY_QUERY_KEYS.FACULTIES.ALL] }),
            ]);
        },
    });
}