import type { MessageResponseDto } from "@/domain/common/MessageResponseDto";
import { ROUTES } from "@/routes/routes";
import { resetPassword } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SessionStorageUtil } from "@/utils/storage/sessionStorageUtil";
import { SESSION_STORAGE_KEYS } from "@/utils/storage/sessionStorageKeys";

export const useResetPassword = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: resetPassword,
        onSuccess: (data: MessageResponseDto) => {
            toast.success(data.message);
            SessionStorageUtil.removeItem(SESSION_STORAGE_KEYS.RECOVERY_EMAIL);
            navigate(ROUTES.AUTH.LOGIN);
        }
    });
};
