import type { LoginRequestDto } from "@/domain/auth/LoginRequestDto";
import type { LoginResponseDto } from "@/domain/auth/LoginResponseDto";
import { login } from "@/services/auth.service";
import { setAccessToken, setRefreshToken } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface UseLoginOptions {
    onConsentRequired?: (version: string) => void;
}

export const useLogin = ({ onConsentRequired }: UseLoginOptions = {}) => {
    return useMutation<LoginResponseDto, unknown, LoginRequestDto>({
        mutationFn: login,
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
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