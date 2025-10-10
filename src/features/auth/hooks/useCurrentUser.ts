import { useQuery } from "@tanstack/react-query";
import { AUTH_QUERY_KEYS } from "../constants/authQueries.constant";
import { currentUser } from "@/services/auth.service";
import { getAccessToken, getRefreshToken } from "@/utils/token";
import type { User } from "@/domain/user/User";

export function useCurrentUser() {
    const hasTokens = !!getAccessToken() || !!getRefreshToken();

    return useQuery<User>({
        queryKey: AUTH_QUERY_KEYS.AUTH.ME,
        queryFn: currentUser,
        enabled: hasTokens,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
