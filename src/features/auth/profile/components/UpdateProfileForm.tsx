import {
    Box,
    Grid,
    Typography,
    TextField,
    Divider,
    Button,
    CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppForm } from "@shared/hooks/useAppForm";
import { useAuth } from "@/contexts/authContext";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { updateProfileSchema, type UpdateProfileFormValues } from "@/shared/validation/updateProfileSchema";
import type { Resolver } from "react-hook-form";
import type { UpdateProfileRequestDto } from "@/domain/profile/UpdateProfileRequestDto";

export default function UpdateProfileForm() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const updateMutation = useUpdateProfile();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useAppForm<UpdateProfileFormValues>({
        resolver: yupResolver(updateProfileSchema) as Resolver<UpdateProfileRequestDto>,
        defaultValues: {
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            email: user?.email ?? "",
            phoneNumber: user?.phoneNumber ?? "",
        },
    });

    const onSubmit = (data: UpdateProfileFormValues) => {
        const cleanedData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== "" && value != null)
        ) as UpdateProfileFormValues;

        updateMutation.mutate(cleanedData, {
            onSuccess: () => reset(data),
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant="h4" fontWeight={700} gutterBottom>
                {t("profile.title")}
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={3}>
                {t("profile.subtitle")}
            </Typography>

            <Typography
                variant="h6"
                sx={{ mt: 2, mb: 1, fontWeight: 600, color: "primary.main" }}
            >
                {t("profile.sections.general")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <TextField
                        fullWidth
                        label={t("profile.firstName", { defaultValue: "Nombre" })}
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message ?? " "}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} >
                    <TextField
                        fullWidth
                        label={t("profile.lastName", { defaultValue: "Apellido" })}
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message ?? " "}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h6"
                sx={{ mb: 1, fontWeight: 600, color: "primary.main" }}
            >
                {t("profile.sections.contact")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <TextField
                        fullWidth
                        label={t("profile.email")}
                        type="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message ?? " "}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} >
                    <TextField
                        fullWidth
                        label={t("profile.phoneNumber", { defaultValue: "Teléfono" })}
                        {...register("phoneNumber")}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message ?? " "}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h6"
                sx={{ mb: 1, fontWeight: 600, color: "primary.main" }}
            >
                {t("profile.sections.security")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("profile.currentPassword")}
                        type="password"
                        {...register("currentPassword")}
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword?.message ?? " "}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("profile.newPassword")}
                        type="password"
                        {...register("newPassword")}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message ?? " "}
                    />
                </Grid>
            </Grid>

            <Box textAlign="right" mt={4}>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!isDirty}
                    loading={updateMutation.isPending}
                    sx={{ minWidth: 150, py: 1.4, borderRadius: 2 }}
                >
                    {t("profile.saveChanges")}
                </Button>
            </Box>
        </Box>
    );
}
