import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import axiosInstance from "@/config/axiosConfig";
import { ROUTES } from "@/routes/routes";
import { removeAccessToken, removeRefreshToken, setAccessToken } from "@/utils/token";
import { refreshToken as refreshTokenService } from "@/services/auth.service";
import { HttpStatusCode } from "axios";

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export const ResponseInterceptor = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const interceptorId = axiosInstance.interceptors.response.use(
            async (response) => response,
            async (error) => {
                const originalRequest = error.config;
                const status = error.response?.status;
                const backendMessage = error.response?.data?.message;

                if (status === HttpStatusCode.Unauthorized) {
                    if (originalRequest._retry || originalRequest.url?.includes('/auth/refresh')) {
                        isRefreshing = false;
                        processQueue(error, null);
                        removeAccessToken();
                        removeRefreshToken();
                        toast.error(t("errors.sessionExpired"));
                        navigate(ROUTES.AUTH.LOGIN);
                        return Promise.reject(error);
                    }

                    originalRequest._retry = true;

                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        })
                            .then((token) => {
                                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                                return axiosInstance(originalRequest);
                            })
                            .catch((err) => Promise.reject(err));
                    }

                    isRefreshing = true;

                    try {
                        const res = await refreshTokenService();
                        setAccessToken(res.accessToken);

                        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;

                        originalRequest.headers["Authorization"] = `Bearer ${res.accessToken}`;

                        processQueue(null, res.accessToken);

                        isRefreshing = false;

                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        isRefreshing = false;
                        removeAccessToken();
                        removeRefreshToken();
                        toast.error(t("errors.sessionExpired"));
                        navigate(ROUTES.AUTH.LOGIN);
                        return Promise.reject(refreshError);
                    }
                }

                switch (status) {
                    case HttpStatusCode.BadRequest:
                        toast.error(backendMessage || t("errors.badRequest"));
                        break;

                    case HttpStatusCode.NotFound:
                        toast.error(backendMessage || t("errors.notFound"));
                        break;

                    case HttpStatusCode.Forbidden:
                        toast.error(backendMessage || t("errors.forbidden"));
                        break;

                    case HttpStatusCode.InternalServerError:
                        toast.error(t("errors.internalServerError"));
                        break;

                    default:
                        if (status >= 500) {
                            toast.error(t("errors.serverError"));
                        } else if (status >= 400) {
                            toast.error(backendMessage || t("errors.unexpected"));
                        }
                        break;
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(interceptorId);
            isRefreshing = false;
            failedQueue = [];
        };
    }, [navigate, t]);

    return null;
};
