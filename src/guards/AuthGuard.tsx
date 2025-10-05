import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useAuth } from "@/contexts/authContext";

export default function AuthGuard() {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated || !user) {
        return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
    }

    return <Outlet />;
}
