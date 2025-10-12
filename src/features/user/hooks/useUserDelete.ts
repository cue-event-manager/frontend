import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/user.service";
import toast from "react-hot-toast";
import { USER_QUERY_KEYS } from "../constants/userQueries.constant";
import { useTranslation } from "react-i18next";

export function useDeleteUser() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            toast.success(t("admin.users.deleted"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === USER_QUERY_KEYS.USERS.ROOT;
                },
            });
        },
    });
}