import type { User } from "@/domain/user/User";
import { useQuery } from "@tanstack/react-query";
import { AUTH_QUERY_KEYS } from "../constants/authQueries.constant";
import { currentUser } from "@/services/auth.service";
import { getAccessToken, getRefreshToken } from "@/utils/token";

export function useCurrentUser() {
    const hasAccessToken = !!getAccessToken();
    const hasRefreshToken = !!getRefreshToken();
    const shouldFetch = hasAccessToken || hasRefreshToken;

    const query = useQuery<User>({
        queryKey: AUTH_QUERY_KEYS.AUTH.ME,
        enabled: shouldFetch,
        retry: false,
        queryFn: currentUser,
    });

    return {
        user: query.data ?? null,
        refetchUser: query.refetch,
        ...query,
    };
}