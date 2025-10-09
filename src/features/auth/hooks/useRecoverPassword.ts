import type { MessageResponseDto } from "@/domain/common/MessageResponseDto";
import { ROUTES } from "@/routes/routes";
import { recoverPassword } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SessionStorageUtil } from "@/utils/storage/sessionStorageUtil";
import { SESSION_STORAGE_KEYS } from "@/utils/storage/sessionStorageKeys";

export const useRecoverPassword = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: recoverPassword,
        onSuccess: (data: MessageResponseDto, variables) => {
            SessionStorageUtil.setItem(SESSION_STORAGE_KEYS.RECOVERY_EMAIL, variables.email);

            toast.success(data.message);
            navigate(ROUTES.AUTH.RESET_PASSWORD);
        }
    });
};
