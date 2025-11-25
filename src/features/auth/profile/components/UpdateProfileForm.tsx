import {
    Box,
    Grid,
    Typography,
    TextField,
    Divider,
    Button,
    Paper,
    Stack,
    alpha,
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

    const sectionHeading = (label: string) => (
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2, mt: 2 }}>
            <Box
                sx={{
                    width: 10,
                    height: 32,
                    borderRadius: 3,
                    background: (theme) =>
                        `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(
                            theme.palette.secondary.main,
                            0.5
                        )})`,
                }}
            />
            <Typography variant="h6" fontWeight={700}>
                {label}
            </Typography>
        </Stack>
    );

    return (
        <Paper
            component="form"
            sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                background: (theme) =>
                    `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(
                        theme.palette.primary.main,
                        0.02
                    )})`,
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                boxShadow: (theme) => `0 20px 50px ${alpha(theme.palette.common.black, 0.08)}`,
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack spacing={1}>
                <Typography variant="h4" fontWeight={800} letterSpacing={-0.5}>
                    {t("profile.title")}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    {t("profile.subtitle")}
                </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {sectionHeading(t("profile.sections.general"))}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("profile.firstName", { defaultValue: "Nombre" })}
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message ?? " "}
                        InputProps={{ sx: { borderRadius: 2.5, } }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("profile.lastName", { defaultValue: "Apellido" })}
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message ?? " "}
                        InputProps={{ sx: { borderRadius: 2.5 } }}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {sectionHeading(t("profile.sections.contact"))}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("profile.email")}
                        type="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message ?? " "}
                        InputProps={{ sx: { borderRadius: 2.5, } }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("profile.phoneNumber", { defaultValue: "Teléfono" })}
                        {...register("phoneNumber")}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message ?? " "}
                        InputProps={{ sx: { borderRadius: 2.5, } }}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {sectionHeading(t("profile.sections.security"))}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label={t("profile.currentPassword")}
                        type="password"
                        {...register("currentPassword")}
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword?.message ?? " "}
                        InputProps={{ sx: { borderRadius: 2.5, } }}
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
                        InputProps={{ sx: { borderRadius: 2.5, } }}
                    />
                </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!isDirty || updateMutation.isPending}
                    startIcon={updateMutation.isPending ? <CircularProgress size={18} color="inherit" /> : null}
                >
                    {t("profile.saveChanges")}
                </Button>
            </Box>
        </Paper>
    );
}
