import type { UpdateUserRequestDto } from "@/domain/user/UpdateUserRequestDto";
import { updateUser } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { USER_QUERY_KEYS } from "../constants/userQueries.constant";

export function useUpdateUser() {
    const { t } = useTranslation();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateUserRequestDto) => updateUser(payload),
        onSuccess: () => {
            toast.success(t("admin.users.updated"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === USER_QUERY_KEYS.USERS.ROOT;
                },
            });
        }
    });
}