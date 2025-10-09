import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { recoverPasswordSchema } from "@shared/validation/recoverPasswordSchema";
import { useRecoverPassword } from "../hooks/useRecoverPassword";

interface RecoverPasswordFormValues {
    email: string;
}

export default function RecoverPasswordForm() {
    const { t } = useTranslation();
    const recoverMutation = useRecoverPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<RecoverPasswordFormValues>({
        resolver: yupResolver(recoverPasswordSchema),
    });

    const onSubmit = (data: RecoverPasswordFormValues) => {
        recoverMutation.mutate(data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Typography variant="h5" fontWeight={700} mb={2}>
                {t("auth.recover.title")}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
                {t("auth.recover.subtitle")}
            </Typography>

            <TextField
                fullWidth
                label={t("auth.recover.email")}
                type="email"
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message ?? " "}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={recoverMutation.isPending}
                sx={{ mt: 2, py: 1.4, borderRadius: 2 }}
            >
                {t("auth.recover.submit")}
            </Button>
        </Box>
    );
}
