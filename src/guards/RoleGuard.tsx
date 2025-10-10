import { useAuth } from "@/contexts/authContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import type { RoleConstant } from "@/domain/role/RoleConstant";
import SplashScreen from "@/features/auth/components/SplashScreen";

interface RoleGuardProps {
    allowedRoles: RoleConstant[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated, isLoadingUser } = useAuth();
    const location = useLocation();

    if(isLoadingUser) return <SplashScreen />

    if (!isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.AUTH.LOGIN}
                replace
                state={{ from: location }}
            />
        );
    }

    const userRole = user?.role.name;
    console.log(userRole)

    if (!userRole || !allowedRoles.includes(userRole)) {
        return (
            <Navigate
                to={ROUTES.HOME}
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />
}
