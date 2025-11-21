import { useAuth } from "@/contexts/authContext";
import type { LoginRequestDto } from "@/domain/auth/LoginRequestDto";
import type { LoginResponseDto } from "@/domain/auth/LoginResponseDto";
import { ROUTES } from "@/routes/routes";
import { login } from "@/services/auth.service";
import { setAccessToken, setRefreshToken } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface UseLoginOptions {
    onConsentRequired?: (version: string) => void;
    redirectTo?: string;
}

export const useLogin = ({ onConsentRequired, redirectTo = ROUTES.HOME }: UseLoginOptions = {}) => {
    const navigate = useNavigate();
    const { refetchUser } = useAuth();

    return useMutation<LoginResponseDto, unknown, LoginRequestDto>({
        mutationFn: login,
        onSuccess: async (data) => {
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);

            await refetchUser();

            navigate(redirectTo);
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const code = error.response?.data?.error;
                const message = error.response?.data?.message;

                if (code === "USER_CONSENT_REQUIRED") {
                    const version = message?.split(":")?.[1]?.trim();
                    onConsentRequired?.(version);
                }
            }
        },
    });
};
