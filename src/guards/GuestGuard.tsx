import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useAuth } from "@/contexts/authContext";

export default function GuestGuard() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
}