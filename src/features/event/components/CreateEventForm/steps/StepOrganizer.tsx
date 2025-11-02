import { useFormContext, Controller } from "react-hook-form";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
    Paper,
    Alert,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import { useTranslation } from "react-i18next";
import { SearchSelect } from "@/components/molecules/SearchSelect";
import type { EventFormData } from "@/shared/validation/eventSchema";
import { useAllFaculties } from "@/features/faculty/hooks/useAllFaculties";
import { useAllAcademicAreas } from "@/features/academicarea/hooks/useAllAcademicAreas";
import { useEffect } from "react";
import { useAllAcademicPrograms } from "@/features/academicprogram/hooks/useAllAcademicPrograms";

export default function StepOrganizer() {
    const { t } = useTranslation();

    const {
        control,
        register,
        watch,
        setValue,
        resetField,
        clearErrors,
        formState: { errors },
    } = useFormContext<EventFormData>();

    const organizerType = watch("organizer.type");
    const selectedFacultyId = watch("organizer.internalFacultyId");

    const faculties = useAllFaculties();
    const programs = useAllAcademicPrograms();
    const academicAreas = useAllAcademicAreas();

    useEffect(() => {
        if (organizerType === "INTERNAL") {
            clearErrors([
                "organizer.externalOrganizationName",
                "organizer.externalOrganizationWebsite",
            ]);
            resetField("organizer.externalOrganizationName", { defaultValue: null });
            resetField("organizer.externalOrganizationWebsite", { defaultValue: null });
        } else if (organizerType === "EXTERNAL") {
            clearErrors([
                "organizer.internalFacultyId",
                "organizer.internalProgramId",
                "organizer.internalAcademicAreaId",
            ]);
            resetField("organizer.internalFacultyId", { defaultValue: null });
            resetField("organizer.internalProgramId", { defaultValue: null });
            resetField("organizer.internalAcademicAreaId", { defaultValue: null });
        }
    }, [organizerType, clearErrors, resetField]);

    useEffect(() => {
        if (organizerType === "INTERNAL") {
            setValue("organizer.internalProgramId", null);
        }
    }, [selectedFacultyId, organizerType, setValue]);

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("events.sections.organizer")}
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    p: 2.5,
                    mb: 3,
                    backgroundColor: "grey.50",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "grey.200",
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}
                >
                    {t("events.fields.organizerType")}
                </Typography>

                <Controller
                    name="organizer.type"
                    control={control}
                    render={({ field }) => (
                        <ToggleButtonGroup
                            value={field.value || "INTERNAL"}
                            exclusive
                            onChange={(_, value) => {
                                if (value !== null) {
                                    field.onChange(value);
                                }
                            }}
                            fullWidth
                            sx={{
                                "& .MuiToggleButton-root": {
                                    py: 1.5,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    borderRadius: 1.5,
                                    "&.Mui-selected": {
                                        backgroundColor: "primary.main",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "primary.dark",
                                        },
                                    },
                                },
                            }}
                        >
                            <ToggleButton value="INTERNAL">
                                <SchoolIcon sx={{ mr: 1 }} />
                                {t("events.organizerType.internal")}
                            </ToggleButton>
                            <ToggleButton value="EXTERNAL">
                                <BusinessIcon sx={{ mr: 1 }} />
                                {t("events.organizerType.external")}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    )}
                />

                {errors.organizer?.type && (
                    <Typography color="error" variant="caption" sx={{ mt: 1, display: "block" }}>
                        {String(errors.organizer.type.message)}
                    </Typography>
                )}
            </Paper>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {t("events.sections.contactInfo")}
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        label={t("events.fields.organizerName")}
                        {...register("organizer.name")}
                        error={!!errors.organizer?.name}
                        helperText={String(errors.organizer?.name?.message ?? " ")}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        type="email"
                        label={t("events.fields.organizerEmail")}
                        {...register("organizer.email")}
                        error={!!errors.organizer?.email}
                        helperText={String(errors.organizer?.email?.message ?? " ")}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        label={t("events.fields.organizerPhone")}
                        {...register("organizer.phone")}
                        error={!!errors.organizer?.phone}
                        helperText={String(errors.organizer?.phone?.message ?? " ")}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {organizerType === "INTERNAL" && (
                <>
                    <Alert
                        severity="info"
                        sx={{
                            mb: 3,
                            borderRadius: 2,
                            fontSize: "0.9rem",
                        }}
                    >
                        {t("events.hints.internalOrganizer", "Seleccione la facultad, programa y área académica que organiza el evento")}
                    </Alert>

                    <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                        {t("events.sections.internalInfo")}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="organizer.internalFacultyId"
                                control={control}
                                render={({ field }) => (
                                    <SearchSelect
                                        name="organizer.internalFacultyId"
                                        label={t("events.fields.faculty")}
                                        control={control}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={
                                            faculties.data?.map((f) => ({
                                                label: f.name,
                                                value: f.id,
                                            })) ?? []
                                        }
                                        loading={faculties.isLoading}
                                        required
                                        margin="none"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="organizer.internalProgramId"
                                control={control}
                                render={({ field }) => (
                                    <SearchSelect
                                        name="organizer.internalProgramId"
                                        label={t("events.fields.program")}
                                        control={control}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={
                                            programs.data?.map((p) => ({
                                                label: p.name,
                                                value: p.id,
                                            })) ?? []
                                        }
                                        loading={programs.isLoading}
                                        required
                                        margin="none"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Controller
                                name="organizer.internalAcademicAreaId"
                                control={control}
                                render={({ field }) => (
                                    <SearchSelect
                                        name="organizer.internalAcademicAreaId"
                                        label={t("events.fields.academicArea")}
                                        control={control}
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={
                                            academicAreas.data?.map((a) => ({
                                                label: a.name,
                                                value: a.id,
                                            })) ?? []
                                        }
                                        loading={academicAreas.isLoading}
                                        required
                                        margin="none"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </>
            )}

            {organizerType === "EXTERNAL" && (
                <>
                    <Alert
                        severity="info"
                        sx={{
                            mb: 3,
                            borderRadius: 2,
                            fontSize: "0.9rem",
                        }}
                    >
                        {t("events.hints.externalOrganizer", "Ingrese los datos de la organización externa")}
                    </Alert>

                    <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                        {t("events.sections.externalInfo")}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label={t("events.fields.organizationName")}
                                {...register("organizer.externalOrganizationName")}
                                error={!!errors.organizer?.externalOrganizationName}
                                helperText={String(
                                    errors.organizer?.externalOrganizationName?.message ?? " "
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="url"
                                label={t("events.fields.organizationWebsite")}
                                placeholder="https://example.com"
                                {...register("organizer.externalOrganizationWebsite")}
                                error={!!errors.organizer?.externalOrganizationWebsite}
                                helperText={String(
                                    errors.organizer?.externalOrganizationWebsite?.message ?? " "
                                )}
                            />
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
}