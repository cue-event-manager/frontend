import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/services/user.service";
import toast from "react-hot-toast";
import type { CreateUserRequestDto } from "@/domain/user/CreateUserRequestDto";
import { USER_QUERY_KEYS } from "../constants/userQueries.constant";
import { useTranslation } from "react-i18next";

export function useCreateUser() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateUserRequestDto) => createUser(payload),
        onSuccess: () => {
            toast.success(t("admin.users.created"));
            queryClient.invalidateQueries({
                predicate: (q) => {
                    const key = q.queryKey[0];
                    return key === USER_QUERY_KEYS.USERS.ROOT;
                },
            });
        },
    });
}