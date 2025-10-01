import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@shared/validation/loginSchema";
import { useAppForm } from "@shared/hooks/useAppForm";

type LoginFormValues = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useAppForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        console.log("Login data", data);
    };

    return (
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
                helperText={errors.email?.message ?? " "}
            />
            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
                {isSubmitting ? "..." : t("auth.login.submit")}
            </Button>
        </Box>
    );
}
