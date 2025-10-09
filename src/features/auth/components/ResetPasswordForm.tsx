import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useResetPassword } from "../hooks/useResetPassword";
import type { ResetPasswordRequestDto } from "@/domain/auth/ResetPasswordRequestDto";
import { SessionStorageUtil } from "@/utils/storage/sessionStorageUtil";
import { SESSION_STORAGE_KEYS } from "@/utils/storage/sessionStorageKeys";
import { resetPasswordSchema } from "@/shared/validation/resetPasswordSchema";
import toast from "react-hot-toast";
import { Controller } from "react-hook-form";
import OtpInput from "@/components/molecules/OtpInput";

export default function ResetPasswordForm() {
    const { t } = useTranslation();
    const resetMutation = useResetPassword();

    const email = SessionStorageUtil.getItem<string>(SESSION_STORAGE_KEYS.RECOVERY_EMAIL);


    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<Omit<ResetPasswordRequestDto, "email">>({
        resolver: yupResolver(resetPasswordSchema),
    });


    const onSubmit = (data: Omit<ResetPasswordRequestDto, "email">) => {
        if (!email) {
            toast.error(t("auth.reset.error"));
            return;
        }

        resetMutation.mutate({ ...data, email });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Typography variant="h5" fontWeight={700} mb={2}>
                {t("auth.reset.title")}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
                {t("auth.reset.subtitle")}
            </Typography>

            <Controller
                name="code"
                control={control}
                render={({ field }) => (
                    <OtpInput
                        value={field.value || ""}
                        onChange={field.onChange}
                        error={!!errors.code}
                        helperText={errors.code?.message}
                    />
                )}
            />

            <TextField
                fullWidth
                label={t("auth.reset.newPassword")}
                type="password"
                margin="normal"
                {...register("newPassword")}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message ?? " "}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={resetMutation.isPending}
                sx={{ mt: 2, py: 1.4, borderRadius: 2 }}
            >
                {t("auth.reset.submit")}
            </Button>
        </Box>
    );
}
