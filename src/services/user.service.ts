import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import { BASE_AUTH_SERVICE } from "./constants";
import type { UserPaginationQuery } from "@/domain/user/UserPaginationQuery";
import type { Page } from "@/shared/types/DataTable";
import type { User } from "@/domain/user/User";
import axiosInstance from "@/config/axiosConfig";

const USER_ENDPOINT_PREFFIX = `${BASE_AUTH_SERVICE}/api/users`;


export const getUsers = async (
    query: PaginationQuery & UserPaginationQuery
): Promise<Page<User>> => {
    const params = new URLSearchParams(query as any).toString();
    const { data } = await axiosInstance.get<Page<User>>(
        `${USER_ENDPOINT_PREFFIX}?${params}`
    );
    return data;
};