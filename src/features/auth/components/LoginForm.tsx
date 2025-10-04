import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@shared/validation/loginSchema";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

type LoginFormValues = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { t } = useTranslation();
    const [termsVersion, setTermsVersion] = useState<string | null>(null);

    const loginMutation = useLogin({
        onConsentRequired: (version) => {
            setTermsVersion(version);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log(data);
        loginMutation.mutate(data);
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    fullWidth
                    label={t("auth.login.email")}
                    type="email"
                    margin="normal"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message ?? " "}
                />
                <TextField
                    fullWidth
                    label={t("auth.login.password")}
                    type="password"
                    margin="normal"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message ?? " "}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loginMutation.isPending}
                    sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                >
                    {loginMutation.isPending ? "..." : t("auth.login.submit")}
                </Button>
            </Box>

            {termsVersion && (
                <p>Debes aceptar los terminos y condiciones</p>
            )}
        </>
    );
}
