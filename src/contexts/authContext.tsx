import {
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { removeAccessToken, removeRefreshToken } from "@/utils/token";
import type { User } from "@/domain/user/User";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_QUERY_KEYS } from "@/features/auth/constants/authQueries.constant";

interface UserContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  refetchUser: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const hasLoggedOutRef = useRef(false);
  const { data: user, isLoading, refetch } = useCurrentUser();

  const logout = () => {
    if (hasLoggedOutRef.current) return;
    hasLoggedOutRef.current = true;

    removeAccessToken();
    removeRefreshToken();

    queryClient.setQueryData(AUTH_QUERY_KEYS.AUTH.ME, null);
    queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.AUTH.ME, exact: true });
    navigate(ROUTES.AUTH.LOGIN, { replace: true });
  };

  const value = useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated: !!user,
      isLoadingUser: isLoading,
      refetchUser: refetch,
      logout,
    }),
    [user, isLoading, refetch]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return ctx;
};
