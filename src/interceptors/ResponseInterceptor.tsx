import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import axiosInstance from "@/config/axiosConfig";
import { ROUTES } from "@/routes/routes";
import { removeAccessToken, removeRefreshToken, setAccessToken } from "@/utils/token";
import { refreshToken as refreshTokenService } from "@/services/auth.service";
import { HttpStatusCode } from "axios";

export const ResponseInterceptor = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const interceptorId = axiosInstance.interceptors.response.use(
            async (response) => response,
            async (error) => {
                const status = error.response?.status;
                const backendMessage = error.response?.data?.message;

                switch (status) {
                    case HttpStatusCode.Unauthorized:
                        try {
                            const res = await refreshTokenService();
                            setAccessToken(res.accessToken);
                            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;

                            error.config.headers["Authorization"] = `Bearer ${res.accessToken}`;
                            return axiosInstance(error.config);
                        } catch {
                            removeAccessToken();
                            removeRefreshToken();
                            toast.error(t("errors.sessionExpired"));
                            navigate(ROUTES.AUTH.LOGIN);
                        }
                        break;

                    case HttpStatusCode.BadRequest:
                        toast.error(backendMessage || t("errors.badRequest"));
                        break;

                    case HttpStatusCode.InternalServerError:
                        toast.error(t("errors.internalServerError"));
                        break;

                    default:
                        toast.error(t("errors.unexpected"));
                        break;
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(interceptorId);
        };
    }, [navigate, t]);

    return null;
};
