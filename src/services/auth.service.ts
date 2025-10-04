import axiosInstance from "@/config/axiosConfig";
import type { LoginRequestDto } from "@/domain/auth/LoginRequestDto";
import type { LoginResponseDto } from "@/domain/auth/LoginResponseDto";
import type { RefreshTokenResponseDto } from "@/domain/auth/RefreshTokenResponseDto";
import { BASE_AUTH_SERVICE } from "./constants";

export const refreshToken = async (): Promise<RefreshTokenResponseDto> => {
    const { data } = await axiosInstance.post<RefreshTokenResponseDto>(
        `${BASE_AUTH_SERVICE}/api/auth/refresh-token`);
    return data;
};

export const login = async (request: LoginRequestDto): Promise<LoginResponseDto> => {
    const { data } = await axiosInstance.post<LoginResponseDto>(
        `${BASE_AUTH_SERVICE}/api/auth/login`,
        request
    );
    return data;
}

