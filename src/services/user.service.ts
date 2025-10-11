import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import { BASE_AUTH_SERVICE } from "./constants";
import type { UserPaginationQuery } from "@/domain/user/UserPaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import type { User } from "@/domain/user/User";
import axiosInstance from "@/config/axiosConfig";
import type { CreateUserRequestDto } from "@/domain/user/CreateUserRequestDto";
import type { UpdateUserRequestDto } from "@/domain/user/UpdateUserRequestDto";

const USER_ENDPOINT_PREFFIX = `${BASE_AUTH_SERVICE}/api/users`;

export const createUser = async (createUserRequestDto: CreateUserRequestDto): Promise<User> => {
    const { data } = await axiosInstance.post<User>(
        `${USER_ENDPOINT_PREFFIX}/create`,
        createUserRequestDto);

    return data;
}

export const getUsers = async (
    query: PaginationQuery & UserPaginationQuery
): Promise<Page<User>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<User>>(
        `${USER_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
};

export const updateUser = async (updateUserRequestDto: UpdateUserRequestDto): Promise<User> => {
    const { data } = await axiosInstance.put<User>(
        `${USER_ENDPOINT_PREFFIX}/${updateUserRequestDto.id}/update`,
        updateUserRequestDto);

    return data;
} 
