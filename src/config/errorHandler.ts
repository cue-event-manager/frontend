import { removeAccessToken, removeRefreshToken, setAccessToken } from "@/utils/token";
import { HttpStatusCode, isAxiosError } from "axios";
import axiosInstance from "./axiosConfig";
import { ROUTES } from "@/routes/routes";
import { refreshToken as refreshTokenService } from "@/services/auth.service";
import { toast } from "react-hot-toast";

const refreshToken = async () => {
    const response = await refreshTokenService();
    setAccessToken(response.accessToken);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.accessToken}`;
    return response.accessToken;
};

export const queryErrorHandler = async (error: unknown) => {
    if (isAxiosError(error)) {
        const status = error.response?.status;
        const backendMessage = error.response?.data?.message;

        if (status === HttpStatusCode.Unauthorized) {
            try {
                await refreshToken();
                return;
            } catch {
                removeRefreshToken();
                removeAccessToken();
                toast.error("Tu sesión ha expirado, por favor inicia sesión nuevamente");
                window.location.href = ROUTES.AUTH.LOGIN;
            }
        }

        if (status === HttpStatusCode.BadRequest) {
            toast.error(backendMessage || "Solicitud inválida");
            return;
        }

        if (status === HttpStatusCode.InternalServerError) {
            toast.error("Ocurrió un error en el servidor. Intenta más tarde.");
            return;
        }
    }

    // fallback para otros errores no previstos
    console.error("React Query error:", error);
    toast.error("Ha ocurrido un error inesperado");
};
