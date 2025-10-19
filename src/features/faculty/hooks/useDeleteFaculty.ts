import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FACULTY_QUERY_KEYS } from "../constants/facultyQueries.constant";
import { deleteFaculty } from "@/services/faculty.service";

export function useDeleteFaculty() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteFaculty(id),
        onSuccess: async () => {
            toast.success(t("admin.faculties.deleted"));
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [FACULTY_QUERY_KEYS.FACULTIES.ROOT] }),
                queryClient.invalidateQueries({ queryKey: [FACULTY_QUERY_KEYS.FACULTIES.ALL] }),
            ]);
        },
    });
}