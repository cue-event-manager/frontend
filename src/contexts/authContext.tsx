import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { removeAccessToken, removeRefreshToken } from "@/utils/token";
import type { User } from "@/domain/user/User";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import SplashScreen from "@/features/auth/components/SplashScreen";
import { useQueryClient } from "@tanstack/react-query";

interface UserContextValue {
  user: User | null;
  isAuthenticated: boolean;
  refetchUser: () => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user: fetchedUser, isLoading, isError, refetchUser } = useCurrentUser();
  const hasRedirectedRef = useRef(false);

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
      setIsAuthenticated(true);
      hasRedirectedRef.current = false;
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [fetchedUser]);

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    setUser(null);
    setIsAuthenticated(false);

    queryClient.clear();

    navigate(ROUTES.AUTH.LOGIN, { replace: true });
  };

  useEffect(() => {
    if (isError && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      logout();
    }
  }, [isError]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      refetchUser,
      setUser,
      logout,
    }),
    [user, isAuthenticated, refetchUser]
  );

  const content = isLoading ? <SplashScreen /> : children;

  return <UserContext.Provider value={value}>{content}</UserContext.Provider>;
};

export const useAuth = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return ctx;
};