import { useQuery } from "@tanstack/react-query";
import type { User } from "@/domain/user/User";
import { USER_QUERY_KEYS } from "../constants/userQueries.constant";
import { getUsers } from "@/services/user.service";
import type { UserPaginationQuery } from "@/domain/user/UserPaginationQuery";
import type { PaginationQuery } from "@/domain/common/PaginationQuery";
import type { Page } from "@/shared/types/DataTable";

export function useUsers(query: PaginationQuery & UserPaginationQuery) {
    return useQuery<Page<User>, Error>({
        queryKey: [USER_QUERY_KEYS.USERS.ROOT, query],
        queryFn: async ({ queryKey }) => {
            const [, params] = queryKey as [string, PaginationQuery & UserPaginationQuery];
            return getUsers(params);
        }
    });
}