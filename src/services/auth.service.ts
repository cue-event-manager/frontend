import axiosInstance from "@/config/axiosConfig";
import type { LoginRequestDto } from "@/domain/auth/LoginRequestDto";
import type { LoginResponseDto } from "@/domain/auth/LoginResponseDto";
import type { RefreshTokenResponseDto } from "@/domain/auth/RefreshTokenResponseDto";
import { BASE_AUTH_SERVICE } from "./constants";
import type { User } from "@/domain/user/User";
import { getRefreshToken } from "@/utils/token";
import type { UpdateProfileRequestDto } from "@/domain/profile/UpdateProfileRequestDto";
import type { RecoverPasswordRequestDto } from "@/domain/auth/RecoverPasswordRequestDto";
import type { MessageResponseDto } from "@/domain/common/MessageResponseDto";
import type { ResetPasswordRequestDto } from "@/domain/auth/ResetPasswordRequestDto";


const AUTH_ENDPOINT_PREFFIX = `${BASE_AUTH_SERVICE}/api/auth`

export const refreshToken = async (): Promise<RefreshTokenResponseDto> => {
    const { data } = await axiosInstance.post<RefreshTokenResponseDto>(
        `${AUTH_ENDPOINT_PREFFIX}/refresh`,
        { refreshToken: getRefreshToken() });
    return data;
};

export const login = async (request: LoginRequestDto): Promise<LoginResponseDto> => {
    const { data } = await axiosInstance.post<LoginResponseDto>(
        `${AUTH_ENDPOINT_PREFFIX}/login`,
        request
    );
    return data;
}

export const logout = async (): Promise<void> => {
    await axiosInstance.post(
        `${AUTH_ENDPOINT_PREFFIX}/logout`,
        { refreshToken: getRefreshToken() });
};

export const currentUser = async (): Promise<User> => {
    const { data } = await axiosInstance.get<User>(
        `${AUTH_ENDPOINT_PREFFIX}/me`
    )

    return data;
}

export const updateProfile = async (updateProfileRequest: UpdateProfileRequestDto): Promise<User> => {
    const { data } = await axiosInstance.put<User>(
        `${AUTH_ENDPOINT_PREFFIX}/update-profile`,
        updateProfileRequest);

    return data;
};

export const recoverPassword = async (recoverPasswordRequest: RecoverPasswordRequestDto): Promise<MessageResponseDto> => {
    const { data } = await axiosInstance.post<MessageResponseDto>(
        `${AUTH_ENDPOINT_PREFFIX}/recover-password`,
        recoverPasswordRequest
    );

    return data;
}

export const resetPassword = async (resetPasswordRequest: ResetPasswordRequestDto): Promise<MessageResponseDto> => {
    const { data } = await axiosInstance.post<MessageResponseDto>(
        `${AUTH_ENDPOINT_PREFFIX}/reset-password`,
        resetPasswordRequest
    );

    return data;
}
