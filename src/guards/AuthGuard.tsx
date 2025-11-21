import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useAuth } from "@/contexts/authContext";

export default function AuthGuard() {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated || !user) {
        return (
            <Navigate
                to={ROUTES.AUTH.LOGIN}
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
}
