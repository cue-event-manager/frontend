import axiosInstance from "@/config/axiosConfig";
import type { LoginRequestDto } from "@/domain/auth/LoginRequestDto";
import type { LoginResponseDto } from "@/domain/auth/LoginResponseDto";
import type { RefreshTokenResponseDto } from "@/domain/auth/RefreshTokenResponseDto";
import { BASE_AUTH_SERVICE } from "./constants";
import type { User } from "@/domain/user/User";


const AUTH_ENDPOINT_PREFFIX = `${BASE_AUTH_SERVICE}/api/auth`

export const refreshToken = async (): Promise<RefreshTokenResponseDto> => {
    const { data } = await axiosInstance.post<RefreshTokenResponseDto>(
        `${AUTH_ENDPOINT_PREFFIX}/refresh-token`);
    return data;
};

export const login = async (request: LoginRequestDto): Promise<LoginResponseDto> => {
    const { data } = await axiosInstance.post<LoginResponseDto>(
        `${AUTH_ENDPOINT_PREFFIX}/login`,
        request
    );
    return data;
}

export const currentUser = async (): Promise<User> => {
    const { data } = await axiosInstance.get<User>(
        `${AUTH_ENDPOINT_PREFFIX}/me`
    )

    return data;
}

